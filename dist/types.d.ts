/**
 * @param value - the value to be transformed
 */
declare type TransformValue = (value: any) => any;

/**
 * @param event - the parameter of the event handler
 */
declare type Extractor = (event: any) => any;

/**
 * Creates a state with a given name, the state is created
 * unbound
 * @example
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
 * @param name - a name for the state
 */
declare function createState(name: string): State;

declare interface Setter { (any): void, set: (any)=>void }

declare class State {
    /**
     * Provides a way of creating binding values
     * for a component
     * @example
     * const {props} = state.useBinding()
     * return <input {...props}/>
     * @param property - the property of the current state to bind
     * @param [defaultValue] - the default value for the property
     * @param [transformIn] - a function to transform inbound values
     * @param [transformOut] - a function to transform outbound values
     * @param [extract] - a function that transforms event values to real values - default
     * version will extract from event.target.value if available, otherwise the value itself
     * @param [attribute = "value"] - the attribute to bind to
     * @param [event = "onChange"] - the event to be bound for changes
     * @param [target] - an override for the target
     * @returns an object containing the specified value and change function
     */
    useBinding(property: string, defaultValue?: any, transformIn?: TransformValue, transformOut?: TransformValue, extract?: Extractor, attribute?: string, event?: string, target?: any): any;

    /**
     * Provides access to information in the state that will be updated
     * any time a state change would affect it
     * @example
     * const [name, setName] = state.useState("person.firstName")
     * return <div onClick={clearFirstName}>{name}</div>
     * function clearFirstName() {
     *     setName("")
     * }
     * @param property - the property path of the state required
     * @param [defaultValue] - a default value for the state
     * @param [target] - an override for the standard state
     * @returns an array containing the state value and an update function
     */
    useState(property: string, defaultValue?: any, target?: any): any[];

    /**
     * Returns a bound component, the properties of the bound
     * component are extended on use
     * @example
     * const Input = state.bind({component: <input style={{fontSize: '120%'}} />})
     *
     * function Example() {
     *     return <div>
     *         <Input property="firstName"/>
     *         <Input property="lastName"/>
     *     </div>
     * }
     * @param bindingProps - the properties of the binding
     * @returns a bound component
     */
    bind(bindingProps: BoundProps): (...params: any[]) => any;

    /**
     * Causes the caller to refresh if any of the paths change
     * @param {Array.<string>|string} paths - the paths to refresh on
     * @returns {number} the current unique id of the refresh
     */
    useRefresh(...paths: string[]): number;

    /**
     * Returns the current target of the the context
     * @example
     * const current = state.useCurrentTarget()
     * const copy = JSON.parse(JSON.stringify(current))
     * @returns the target
     */
    useCurrentTarget(): any;

    /**
     * Returns the current path of the context
     * @returns the current path to the bound target
     */
    useCurrentPath(): string[];

    /**
     * Returns a component bound to the state model
     * @example
     * function SubComponent() {
     *     return <div>
     *         <Bound component={<TextField variant="outlined"/>} property="name"/>
     *     </div>
     * }
     * @returns a component to be rendered
     */
    Bound(props: BoundProps): (...params: any[]) => any;

    /**
     * A binding target, linking the state to an object
     * @example
     * const state = createState("global")
     * let someState = {id: 1234, name: "Mike"}
     *
     * function App() {
     *     return <state.Bind target={someState}>
     *         <InnerComponents/>
     *     </state.Bind>
     * }
     * @param props - properties
     * @returns the JS component
     */
    Bind(props: BindProps): (...params: any[]) => any;

    /**
     * Returns a setter for properties
     * @param {string} property - the property to set
     * @param {any} [target] - an override for the current value
     * @returns {Setter} - a value to set other values
     */
    useSetter(property: string, target: any): Setter;
}

/**
 * @property [component = <input/>] - the component to be bound as an executed JSX expression
 * @property [property] - the property to which the component should be bound
 * @property [defaultValue] - a default value for the property
 * @property [transformIn] - a function to transform inbound values
 * @property [transformOut] - a function to transform outbound values
 * @property [extract] - a function that transforms event values to real values - default
 * version will extract from event.target.value if available, otherwise the value itself
 * @property [attribute = "value"] - the attribute to bind to
 * @property [event = "onChange"] - the event to be bound for changes
 * @property [target] - an override for the target
 */
declare interface BoundProps {
    component: any,
    property: string,
    defaultValue: any,
    transformIn: TransformValue,
    transformOut: TransformValue,
    extract: Extractor,
    attribute: string,
    event: string,
    target: any
}

/**
 * Used to notify of events
 * @param target - the target that has been changed
 */
declare type ChangeEvent = (target: any) => void;

/**
 * @property [target] - the target of the binding
 * @property [property] - the property of the current binding to use
 * @property [onChange] - called when any child of the binding changes
 * @property [children] - the children of this binding
 */
declare interface BindProps {
    target: any,
    property: string,
    onChange: ChangeEvent,
    children: any
}

