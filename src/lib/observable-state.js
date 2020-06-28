import PropTypes from "prop-types"
import React, { useContext, useRef, useState } from "react"
import { get, set } from "./get-set"
import {
    getPath,
    getPatterns,
    returnValue,
    standardExtract,
    targetEvents,
    targetIds,
    useEvent
} from "./observable-state-helpers"

let stateId = 0
let nextId = 0
let refreshId = 0

const IndexContext = React.createContext(0)

export function useIndex() {
    return useContext(IndexContext)
}

function Dummy({ children }) {
    return <>{children}</>
}

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

function emit(target, path, property, value) {
    targetEvents.emit(
        `${[...path, ...getPath(property)].filter(Boolean).join(".")}`,
        value
    )
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

const useTargetContext = Symbol("useTargetContext")

/**
 * A class representing a unique state
 * @hideconstructor
 */
class State {
    [useTargetContext]() {
        return useContext(this.context)
    }

    /**
     * Provides a way of creating binding values
     * for a component
     * @param {string} property - the property of the current state to bind
     * @param {any} [defaultValue] - the default value for the property
     * @param {TransformValue} [transformIn] - a function to transform inbound values
     * @param {TransformValue} [transformOut] - a function to transform outbound values
     * @param {Extractor} [extract] - a function that transforms event values to real values - default
     * version will extract from event.target.value if available, otherwise the value itself
     * @param {string} [attribute="value"] - the attribute to bind to
     * @param {string} [event="onChange"] - the event to be bound for changes
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
            extract = standardExtract,
            attribute = "value",
            event = "onChange",
            target
        } = {}
    ) {
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)
        const value = useRef(transformIn(get(target, property, defaultValue)))

        useEvent(
            getPatterns(target, [...path, ...getPath(property), "**"]),
            update
        )
        const [, refresh] = useState(-1)
        return { [attribute]: value.current, [event]: updateValue }

        function update() {
            value.current = transformIn(get(target, property, defaultValue))
            refresh(refreshId++)
        }

        function updateValue(...params) {
            const newValue = transformOut(extract(...params))
            set(target, property, newValue)
            emit(target, path, property, newValue)
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
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)
        const value = get(target, property, defaultValue)
        const [id, refresh] = useState(-1)
        const currentRefresh = useRef()
        currentRefresh.current = refresh
        useEvent(getPatterns(target, [...path, ...getPath(property)]), update)
        updateValue.set = updateMany
        return [value, updateValue, id]

        function update() {
            currentRefresh.current(refreshId++)
        }

        function updateValue(newValue) {
            if (typeof newValue === "function") {
                newValue = newValue(get(target, property, defaultValue))
            }
            set(target, property, newValue)
            emit(target, path, property, newValue)
        }

        function updateMany(newValue) {
            recurseSet(newValue, value, [...path, ...getPath(property)])
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
     */
    useSetter(property = "", target) {
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)
        updateValue.set = updateMany
        return updateValue

        function updateValue(newValue) {
            if (typeof newValue === "function") {
                newValue = newValue(get(target, property))
            }
            set(target, property, newValue)
            emit(target, path, property, newValue)
        }

        function updateMany(newValue) {
            recurseSet(newValue, get(target, property, {}), [
                ...path,
                ...getPath(property)
            ])
        }
    }

    /**
     * Causes the caller to refresh if any of the paths change
     * @param {Array.<string>|string} paths - the paths to refresh on
     * @returns {number} the current unique id of the refresh
     */
    useRefresh(...paths) {
        const { target, path } = this[useTargetContext]()
        const [id, refresh] = useState(-1)
        const currentRefresh = useRef()
        currentRefresh.current = refresh

        const patterns = []
        for (let p of paths.flat(Infinity)) {
            patterns.push(...getPatterns(target, [...path, ...getPath(p)]))
        }
        useEvent(Array.from(new Set(patterns)), update)
        return id
        function update() {
            currentRefresh.current(refreshId++)
        }
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
 * @property {Extractor} [extract] - a function that transforms event values to real values - default
 * version will extract from event.target.value if available, otherwise the value itself
 * @property {string} [attribute="value"] - the attribute to bind to
 * @property {string} [event="onChange"] - the event to be bound for changes
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
        target
    })
    return <Component {...extraProps} {...props} {...other} />
}

Bound.propTypes = {
    attribute: PropTypes.string,
    component: PropTypes.object,
    defaultValue: PropTypes.any,
    event: PropTypes.string,
    extract: PropTypes.func,
    property: PropTypes.string,
    target: PropTypes.object,
    transformIn: PropTypes.func,
    transformOut: PropTypes.func
}

Bound.defaultProps = {
    component: <input />
}

function recurseSet(newValue, target, path = []) {
    for (let [key, updatedValue] of Object.entries(newValue)) {
        if (typeof updatedValue === "object" && !Array.isArray(updatedValue)) {
            recurseSet(updatedValue, get(target, key, {}), [...path, key])
        } else {
            set(target, key, updatedValue)
            emit(target, path, `${key}`, updatedValue)
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
    const [finalTarget, setFinalTarget] = React.useState(target)
    const currentTarget = useRef()
    currentTarget.current = setFinalTarget

    useEvent(`${targetIds.get(finalTarget)}`, update)
    let updatedPath = [...path, ...getPath(property)]
    useEvent(
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
        currentTarget.current(newValue)
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
