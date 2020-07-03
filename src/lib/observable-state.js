import PropTypes from "prop-types"
import React, { useContext, useEffect, useRef, useState } from "react"
import { get, set } from "./get-set"
import {
    getPath,
    getPatterns,
    returnValue,
    standardExtract,
    targetIds
} from "./observable-state-helpers"
import Events from "./emitter"
import { ensureArray } from "./event-bus"
import { debounce } from "../../example/src/utils"

let stateId = 0
let nextId = 0
let refreshId = 0

const IndexContext = React.createContext(0)
const useProperty = Symbol("useProperty")
const useEvent = Symbol("useEvent")
const emit = Symbol("emit")

export function useIndex() {
    return useContext(IndexContext)
}

function Dummy({ children }) {
    return <>{children}</>
}

function withDefault(v, d) {
    return v !== undefined ? v : d
}

function noop() {}
noop.refresh = noop

/**
 * @callback TransformValue
 * @param {any} value - the value to be transformed
 * @returns {any} the transformed value
 */

/**
 * @callback Extractor
 * @param {any} event - the parameter of the event handler
 * @returns {any} the extracted value
 */

/**
 * Creates a state with a given name, the state is created
 * unbound
 * @param {string} name - a name for the state
 * @returns {State}
 * @example
 *
 * const state = createState("global")
 * const {Bind, bind} = state
 * const Input = bind({component: <TextField variant="outlined"/>})
 * const stateObject = {title: "global"}
 *
 * function App() {
 *     return <Bind target={stateObject}>
 *         <Inner/>
 *     </Bind>
 * }
 *
 * function Inner() {
 *     return <div>
 *         <Input property="title" label="title"/>
 *         <Input property="somethingElse" label="other" defaultValue=""/>
 *     </div>
 * }
 */
export function createState(name) {
    return new State(name)
}

function getTargetFrom(property, target, path, stack) {
    for (let i = 0; i < property.length && i < stack.length - 1; i++) {
        if (property[i] === "^") {
            let step = stack[stack.length - 2 - i]
            target = step.target
            path = step.path
        } else {
            break
        }
    }
    return [property.replace(/^\^*/g, ""), target, path]
}

function useRefresh() {
    const [id, refresh] = useState(-1)
    const currentRefresh = useRef()
    React.useEffect(() => {
        return () => {
            currentRefresh.current = noop
        }
    }, [])

    currentRefresh.current = refresh
    _refresh.id = id
    return _refresh

    function _refresh() {
        currentRefresh.current(refreshId++)
    }
}

function useClearableState(initial) {
    const [value, setValue] = React.useState(initial)
    const setter = useRef()
    setter.current = setValue
    React.useEffect(() => {
        return () => {
            setter.current = noop
        }
    }, [])
    return [value, _setValue]

    function _setValue(v) {
        setter.current(v)
    }
}

const useTargetContext = Symbol("useTargetContext")

/**
 * A class representing a unique state
 * @hideconstructor
 */
class State {
    [useTargetContext]() {
        return useContext(this.context)
    }

    [useProperty](property, handler, target) {
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)
        if (handler) {
            this[useEvent](
                getPatterns(target, [...path, ...getPath(property)]),
                handler
            )
        }
        return { value: get(target, property), target, path, property }
    }

    /**
     * Provides a handler that is called when a property value has been
     * updated
     * @param {string} property - the property that is updated
     * @param {function} handler - the handler for the property change, it will be
     * called with the updated value
     * @param {object} [target] - an optional target override
     * @example
     * import debounce from 'lodash/debounce'
     *
     * function Component() {
     *     const saveProfile = React.useMemo(()=>debounce(_saveProfile, 300), [])
     *     globalState.useChange("profile.**", saveProfile)
     *
     *     function saveProfile(profile) {
     *         localStorage.setItem("profile", JSON.stringify(profile))
     *     }
     * }
     */
    useChange(property, handler, target) {
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)

        this[useEvent](
            getPatterns(target, [...path, ...getPath(property)]),
            () => {
                const value = get(target, property)
                handler(value)
            }
        )
    }

    /**
     * Creates a calculation that depends on other property values
     * and is automatically updated when they change
     * @param {string} property - the property to be created
     * @param {string[]} dependencies - an array of dependencies for the property,
     * the update function will be passed the values of these
     * @param {function} fn - a function that will be called with the dependency
     * values and returns the updated calculation
     * @param {any} [target] - an override for the current target (rarely used)
     * @example
     * function Component() {
     *     globalState.useCalculation("profile.fullName", ["profile.firstName", "profile.lastName"],
     *         (firstName, lastName) => `${firstName} ${lastName}`
     *     )
     * }
     *
     * function Label({value, ...props}) {
     *     return <div {...props}>{value}</label>
     * }
     *
     * const BoundLabel = globalState.bind({component: <Label className={"label"}/> })
     *
     * function FullNameLabelExample() {
     *     return <Label property="profile.fullName" />
     * }
     */
    useCalculation(property, dependencies, fn, target) {
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)
        const update = React.useMemo(() => _update.bind(this), [])
        for (let dependency of dependencies) {
            this[useEvent](
                getPatterns(target, [...path, ...getPath(dependency)]),
                update
            )
        }
        update()
        function _update() {
            const values = dependencies.map((d) => {
                return get(target, d)
            })
            const newValue = fn.apply(this, values)
            if(newValue.then) {
                newValue.then((newValue)=>{
                    set(target, property, newValue)
                    this[emit](target, path, property, newValue)
                })
            } else {
                set(target, property, newValue)
                this[emit](target, path, property, newValue)
            }

        }
    }

    /**
     * Provides a way of creating binding values
     * for a component
     * @param {string} property - the property of the current state to bind
     * @param {any} [defaultValue] - the default value for the property
     * @param {TransformValue} [transformIn] - a function to transform inbound values
     * @param {TransformValue} [transformOut] - a function to transform outbound values
     * @param {any} [updateOnBlur] - set if the component should only update when it blurs
     * @param {Extractor} [extract] - a function that transforms event values to real values - default
     * version will extract from event.target.value if available, otherwise the value itself
     * @param {Function} onChange
     * @param {string} [attribute="value"] - the attribute to bind to
     * @param {string} [event="onChange"] - the event to be bound for changes
     * @param {string} [blurEvent="onBlur"] - the event for blurring
     * @param {object} [target] - an override for the target
     * @returns {object} an object containing the specified value and change function
     * @example
     *
     * const {props} = state.useBinding()
     * return <input {...props}/>
     */
    useBinding(
        property,
        {
            defaultValue,
            transformIn = returnValue,
            transformOut = returnValue,
            updateOnBlur,
            extract = standardExtract,
            onChange = noop,
            attribute = "value",
            event = "onChange",
            blurEvent = "onBlur",
            target
        } = {}
    ) {
        const changed = useRef(false)
        let rawValue, path
        ;({ value: rawValue, target, property, path } = this[useProperty](
            property,
            update,
            target
        ))

        const value = useRef(transformIn(withDefault(rawValue, defaultValue)))
        const [localValue, setLocalValue] = useClearableState(value.current)
        const [updateValue, blur] = React.useMemo(() => {
            return [_updateValue.bind(this), _blur.bind(this)]
        }, [])

        const refresh = useRefresh()
        return {
            [attribute]: localValue,
            [event]: updateValue,
            [blurEvent]: blur
        }

        function update() {
            let newValue = transformIn(get(target, property, defaultValue))
            if (newValue !== value.current) {
                value.current = newValue
                setLocalValue(value.current)
            }
            refresh()
        }

        function _updateValue(...params) {
            let currentValue = extract(...params)
            const newValue = transformOut(currentValue)

            if (updateOnBlur) {
                value.current = newValue
                changed.current = true
                setLocalValue(currentValue)
            } else {
                set(target, property, newValue)
                onChange(newValue)
                this[emit](target, path, property, newValue)
            }
        }

        function _blur() {
            if (changed.current) {
                changed.current = false
                set(target, property, value.current)
                onChange(value.current)
                this[emit](target, path, property, value.current)
            }
        }
    }

    constructor(name) {
        this.name = name
        this.id = stateId++
        this.context = React.createContext({
            target: null,
            path: [],
            stack: []
        })
        this.events = new Events()

        this[useEvent] = (pattern, handler, context) => {
            if (context) {
                handler = handler.bind(context)
            }
            useEffect(() => {
                ensureArray(pattern).forEach((pattern) =>
                    this.events.on(pattern, handler)
                )
                return () => {
                    ensureArray(pattern).forEach((pattern) =>
                        this.events.off(pattern, handler)
                    )
                }
            }, [pattern])
        }

        this[emit] = (target, path, property, value) => {
            this.events.emit(
                `${[...path, ...getPath(property)].filter(Boolean).join(".")}`,
                value
            )
        }

        this.Bind = this.Bind.bind(this)
        this.Bound = this.Bound.bind(this)
        this.bind = this.bind.bind(this)
        this.useState = this.useState.bind(this)
        this.useCurrentPath = this.useCurrentPath.bind(this)
        this.useCurrentTarget = this.useCurrentTarget.bind(this)
    }

    Bind = Bind
    Bound = Bound

    /**
     * Provides access to information in the state that will be updated
     * any time a state change would affect it
     * @param {string} property - the property path of the state required
     * @param {any} [defaultValue] - a default value for the state
     * @param {object} [target] - an override for the standard state
     * @returns {Array} an array containing the state value and an update function
     * @example
     *
     * const [name, setName] = state.useState("person.firstName")
     * return <div onClick={clearFirstName}>{name}</div>
     * function clearFirstName() {
     *     setName("")
     * }
     */
    useState(property = "", defaultValue, target) {
        const updateValue = React.useMemo(() => {
            const updateMany = _updateMany.bind(this)
            const updateValue = _updateValue.bind(this)
            updateValue.set = updateMany
            return updateValue
        }, [])
        let value, path
        ({ value, path, property, target } = this[useProperty](property, update, target))

        const refresh = useRefresh()
        return [withDefault(value, defaultValue), updateValue, refresh.id]

        function update() {
            refresh()
        }

        function _updateValue(newValue) {
            if (typeof newValue === "function") {
                newValue = newValue(get(target, property, defaultValue))
            }
            set(target, property, newValue)
            this[emit](target, path, property, newValue)
        }

        function _updateMany(newValue) {
            recurseSet.call(this, newValue, value, [
                ...path,
                ...getPath(property)
            ])
        }
    }

    /**
     * @function Setter
     * @param {any} value - the value to set
     *
     */

    /**
     * Returns a setter for properties
     * @param {string} property - the property to set
     * @param {any} [target] - an override for the current value
     * @returns {Setter} - a value to set other values
     * @example
     *
     * function Component() {
     *     const setValue = someState.useSetter("some.object.property")
     *     return <Button onClick={clear}>Clear</Button>
     *     function clear() {
     *         setValue({})
     *     }
     * }
     *
     */
    useSetter(property = "", target) {
        let path
        ;({ property, target, path } = this[useProperty](
            property,
            null,
            target
        ))
        return React.useMemo(() => {
            const updateMany = _updateMany.bind(this)
            const updateValue = _updateValue.bind(this)
            updateValue.set = updateMany
            return updateValue
        }, [])

        function _updateValue(newValue) {
            if (typeof newValue === "function") {
                newValue = newValue(get(target, property))
            }
            set(target, property, newValue)
            this[emit](target, path, property, newValue)
        }

        function _updateMany(newValue) {
            recurseSet.call(this, newValue, get(target, property, {}), [
                ...path,
                ...getPath(property)
            ])
        }
    }

    /**
     * Causes the caller to refresh if any of the paths change
     * @param {Array.<string>|string} paths - the paths to refresh on
     * @returns {number} the current unique id of the refresh
     * @example
     * function Component() {
     *     const [style] = globalState.useState("style")
     *     // Update if any sub property of style changes
     *     globalState.useRefresh("style.**")
     *     return <div style={{...style}}>Some Content</div>
     * }
     */
    useRefresh(...paths) {
        const { target, path } = this[useTargetContext]()
        const patterns = []
        for (let p of paths.flat(Infinity)) {
            patterns.push(...getPatterns(target, [...path, ...getPath(p)]))
        }
        const refresh = useRefresh()
        this[useEvent](Array.from(new Set(patterns)), refresh)
        return refresh.id
    }

    /**
     * Returns a bound component, the properties of the bound
     * component are extended on use
     * @see Bound
     * @param {BoundProps} bindingProps - the properties of the binding
     * @returns {Function} a bound component
     * @example
     *
     * const Input = state.bind({component: <input style={{fontSize: '120%'}} />})
     *
     * function Example() {
     *     return <div>
     *         <Input property="firstName"/>
     *         <Input property="lastName"/>
     *     </div>
     * }
     */
    bind(bindingProps) {
        const self = this
        return function ({ state = self, ...props }) {
            return <state.Bound {...bindingProps} {...props} />
        }
    }

    /**
     * Returns the current target of the the context
     * @returns {object} the target
     * @example
     *
     * const current = state.useCurrentTarget()
     * const copy = JSON.parse(JSON.stringify(current))
     */
    useCurrentTarget() {
        const { target } = this[useTargetContext]()
        return target
    }

    /**
     * Returns the current path of the context
     * @returns {Array<string>} the current path to the bound target
     */
    useCurrentPath() {
        const { path } = this[useTargetContext]()
        return path
    }
}

/**
 * @interface BoundProps
 * @property {object} [component=<input/>] - the component to be bound as an executed JSX expression
 * @property {string} [property] - the property to which the component should be bound
 * @property {any} [defaultValue] - a default value for the property
 * @property {TransformValue} [transformIn] - a function to transform inbound values
 * @property {TransformValue} [transformOut] - a function to transform outbound values
 * @property {any} [updateOnBlur] - set if the component should only update when it blurs
 * @property {Extractor} [extract] - a function that transforms event values to real values - default
 * version will extract from event.target.value if available, otherwise the value itself
 * @property {string} [attribute="value"] - the attribute to bind to
 * @property {string} [event="onChange"] - the event to be bound for changes
 * @property {string} [blurEvent="onBlur"] - the event for blurring
 * @property {object} [target] - an override for the target
 */

/**
 * Returns a component bound to the state model
 * @function Bound
 * @memberOf State
 * @param {BoundProps} props
 * @returns {Function} a component to be rendered
 * @instance
 * @example
 *
 * function SubComponent() {
 *     return <div>
 *         <Bound component={<TextField variant="outlined"/>} property="name"/>
 *     </div>
 * }
 *
 */
function Bound({
    component = <input />,
    property,
    defaultValue,
    transformIn,
    transformOut,
    extract,
    attribute,
    updateOnBlur,
    blurEvent,
    event,
    target,
    ...other
}) {
    const Component = (component && component.type) || Dummy
    const props = (component && component.props) || {}
    const extraProps = this.useBinding(property, {
        defaultValue,
        transformIn,
        transformOut,
        extract,
        attribute,
        event,
        target,
        blurEvent,
        updateOnBlur
    })
    return <Component {...extraProps} {...props} {...other} />
}

Bound.propTypes = {
    attribute: PropTypes.string,
    blurEvent: PropTypes.any,
    component: PropTypes.object,
    defaultValue: PropTypes.any,
    event: PropTypes.string,
    extract: PropTypes.func,
    property: PropTypes.string,
    target: PropTypes.object,
    transformIn: PropTypes.func,
    transformOut: PropTypes.func,
    updateOnBlur: PropTypes.any
}

Bound.defaultProps = {
    component: <input />
}

function recurseSet(newValue, target, path = []) {
    for (let [key, updatedValue] of Object.entries(newValue)) {
        if (typeof updatedValue === "object" && !Array.isArray(updatedValue)) {
            recurseSet.call(this, updatedValue, get(target, key, {}), [
                ...path,
                key
            ])
        } else {
            set(target, key, updatedValue)
            this[emit](target, path, `${key}`, updatedValue)
        }
    }
}

/**
 * Used to notify of events
 * @callback ChangeEvent
 * @param {object} target - the target that has been changed
 */

/**
 * @interface BindProps
 * @property {object} [target] - the target of the binding
 * @property {string} [property] - the property of the current binding to use
 * @property {ChangeEvent} [onChange] - called when any child of the binding changes
 * @property {Function|Array} [children] - the children of this binding
 */

/**
 * A binding target, linking the state to an object
 * @method Bind
 * @memberOf State
 * @instance
 * @param {BindProps} props - properties
 * @returns {Function} the JS component
 * @example
 *
 * const state = createState("global")
 * let someState = {id: 1234, name: "Mike"}
 *
 * function App() {
 *     return <state.Bind target={someState}>
 *         <InnerComponents/>
 *     </state.Bind>
 * }
 *
 */
function Bind({ target, property = "", onChange = () => {}, children }) {
    const self = this
    const innerId = React.useRef(refreshId++)
    let { target: existingTarget, path, stack } = this[useTargetContext]()
    if (target && !targetIds.has(target)) {
        targetIds.set(target, nextId++)
        path = [`${targetIds.get(target)}`]
    } else if (target) {
        path = [`${targetIds.get(target)}`]
    } else {
        target = existingTarget
    }
    const [finalTarget, setFinalTarget] = useClearableState(target)

    this[useEvent](`${targetIds.get(finalTarget)}`, update)
    let updatedPath = [...path, ...getPath(property)]
    this[useEvent](
        getPatterns(finalTarget, updatedPath).map((p) => `${p}.**`),
        () => onChange(finalTarget)
    )
    const [subTarget, , , id] = this.useState(property, {}, finalTarget)
    if (Array.isArray(subTarget)) {
        return <ArrayContents key={id} />
    } else {
        if (typeof subTarget !== "object")
            throw new Error("You must bind to an object or an array")
        return (
            <this.context.Provider
                key={`${id}:${innerId.current}`}
                value={{
                    target: subTarget,
                    path: updatedPath,
                    stack: [...stack, { target: subTarget, path: updatedPath }]
                }}
            >
                {children}
            </this.context.Provider>
        )
    }

    function update(newValue) {
        targetIds.set(newValue, targetIds.get(target))
        innerId.current = refreshId++
        setFinalTarget(newValue)
    }

    function ArrayContents() {
        let output = []
        for (let i = 0; i < subTarget.length; i++) {
            output.push(<Item key={i} index={i} />)
        }
        return output
    }

    function Item({ index }) {
        return (
            <IndexContext.Provider value={index}>
                <self.Bind property={`${property}.${index}`}>
                    {children}
                </self.Bind>
            </IndexContext.Provider>
        )
    }
}

Bind.propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
    property: PropTypes.string.isRequired,
    target: PropTypes.object
}

Bind.defaultProps = {
    onChange: () => {},
    property: ""
}
