# react-bound-state

> Binding library for React

[![NPM](https://img.shields.io/npm/v/react-bound-state.svg)](https://www.npmjs.com/package/react-bound-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

#TL;DR

-   Managing state in React has all sorts of solutions from `useContext` and `useState` to Redux. However, all of these methods lack a truly declarative style.
-   I wanted a cleaner way to write code that manages global and document level scoped state. I also wanted a way to write code to update state where it makes the most sense to me - next to the thing it affects. Writing code in this way enables better modularisation and separation of concerns.
-   I like data binding, I like having components bound to parts of the model that can automatically react to changes, it reduces boilerplate code and reduces re-renders.
-   I've built a brand new library, documentation, and a demonstration that you can use to explore the solution that I arrived at given the objectives above. The library makes extensive use of Hooks. react-bound-state is MIT licensed.
-   The react-bound-state library is based on the live version in the commercial software I build for a day job but it has been refined, simplified, and improved.
-   I go on to describe how to use the technique and how it works internally below.
-   The library [GitHub](https://github.com/miketalbot/react-bound-state) page provides access to the API documentation.

## Install

```bash
npm install --save react-bound-state
```

## Usage

```jsx
import React from "react"
import { createState } from "react-bound-state"
import { Grid, CssBaseline, Container, Box, TextField } from "@material-ui/core"

const state = createState("global")
const { Bind, bind } = state
const Input = bind({ component: <TextField variant="outlined" /> })
const stateObject = { title: "global" }

function App() {
    return (
        <Bind target={stateObject}>
            <CssBaseline />
            <Container>
                <Inner />
            </Container>
        </Bind>
    )
}

function Inner() {
    return (
        <Box p={1}>
            <Grid container spacing={2}>
                <Grid item>
                    <Input property="title" label="title" />
                </Grid>
                <Grid item>
                    <Input
                        property="somethingElse"
                        label="other"
                        defaultValue=""
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
```

## Documentation

[API Docs](https://miketalbot.github.io/react-bound-state/)

[Demo](https://miketalbot.github.io/react-bound-state/example)


##Demo

[CodeSandbox demo is available here.](https://6wqmq.csb.app/)

The demonstration logs when core components are redrawn, as you will see, redraws are kept to a bare minimum.

##Why?

I build apps that predominantly manage documents, and I want to write declarative code that follows [SOLID](https://en.wikipedia.org/wiki/SOLID) principles. Adhering to SOLID principles ensures that the solutions I make can be easily maintained, developed, and extended.

My projects frequently use React and are modern enough to be almost 100% hook based.

In many web apps and systems, a single document or state will contain information that needs to be handled by many specialized components; this lends itself to creating multiple modules that participate in the editing and rendering processes. Furthermore, the same information frequently needs to be rendered by different components in alternate ways.

I don't like to centralize the state management, because that makes the code very coupled and limits the ability for multiple developers to work on the same code base and reuse previously created elements.

Hooks are great, but they present challenges at both the individual component level and across a broader hierarchy.

-   `useState` needs to be isolated to a component which can cause multiple re-renders
-   `useReducer` can also cause large parts of the interface to require updating
-   `useContext` is a blunt tool that elegantly facilitates static contextual information, but does not cope well with informing sub-elements of an interface to redraw when their state changes.

```jsx
function Details({ onEdited, name, description }) {
    const [currentName, setName] = React.useState(name)
    const [currentDescription, setDescription] = React.useState(description)
    return (
        <div onBlur={() => onEdited(currentName, currentDescription)}>
            <input
                value={currentName}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                rows={10}
                value={currentDescription}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    )
}
```

_^ This is complex and intricate; I'd rather avoid it_

The above code renders the whole component each time with a `currentName` or `currentDescription` change. While this is insignificant here, it's part of a broader problem. In addition to that, the state must be passed into this component as a whole.

I like the principles of data binding offered by Angular, Svelte, and the like, so I've built something that solves all of these problems.

## react-bound-state

The new library works by using Inversion of Control implemented using a super-fast wildcard event emitter and lets us:

-   Create multiple global state contexts
-   Bind contexts to objects
-   Have any number of components be updated when relevant state changes, but only those components
-   Create components that are bound directly to the data model
-   Composes in a very straightforward and obvious way

Using the library, we can rewrite `Details` from above like this:

```jsx
function Details() {
    return (
        <div>
            <Input property="name" />
            <Input multiline property="description" />
        </div>
    )
}
```

### Working with state in react-bound-state

The first step is to create state contexts that you will then bind to objects. You will typically make a global state context for each of the things that might be in scope at the same time. In the example, we have a global state for the current document and the current settings.

```jsx
import { createState } from "react-bound-state"

export const globalState = createState("global")
export const styleState = createState("style")
```

### Binding Components

Once we've created state, we can access the methods of the state to do some useful things. For instance, we can use `bind` to create data-bound versions of standard components that we can use when building out our interface.

```jsx
import { TextField } from "@material-ui/core"

export const Input = globalState.bind({
    component: <TextField variant={"outlined"} fullWidth />
})
```

The code above creates an <Input/> component that uses an outlined, full-width TextField that will be bound to the current target of `globalState`.

The default version of `bind` expects an `onChange` event that supports `event.target.value` or `value` directly and an input that wants `value`. We can override all of these. For instance, to create a Combo Box for the demo we use Material UI Autocomplete - this passes the current value of the component as a second parameter to `onChange` so we might declare the Combo like this:

```jsx
export const Combo = styleState.bind({
    extract(_, value) {
        return value
    },
    component: (
        <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => (
                <TextField {...params} variant="outlined" />
            )}
        />
    )
})
```

Here we use the `extract` method that allows us to extract the current value from the `onChange` event.

We have total control over the `attribute` that is used, the `event` that is fired on a change, plus we can also use `transformIn` and `transformOut` to convert data from the model to the editing component.

The real benefit is we can apply any properties to the component or the underlying component on the definition or use.

```jsx
<Input
    property="some.model.property"
    transformIn={(v) => v.toUpperCase()}
    transformOut={(v) => v.toLowerCase()}
/>
```

We can also bind components inline rather than defining them up front, using the `<Bound/>` component exposed from the state:

```jsx
<globalState.Bound
    component={<Checkbox color="primary" />}
    attribute="checked"
    property="done"
/>
```

### Binding the state to an object

Before we can do anything much with the components or the other properties of the state, we must bind it to a model.

```jsx
const App = () => {
    return (
        <styleState.Bind target={styles}>
            <globalState.Bind onChange={save} target {example}>
                <Box mt={6}>
                    <Container>
                        <Example/>
                    </Container>
                </Box>
            </globalState.Bind>
        </styleState.Bind>
    )
}
```

Here we've bound `globalState` to a document and `styleState` to a set of style settings. Once bound, we can start to use the other features of the library to access values, or we can use the bound components to edit values.

You can see the `onChange()` handler which is called any time any property of the model changes. In the demo case, it is wired to a denounced function that stores the current state in localStorage.

###Accessing properties of the state

Once bound, we can use the functions of the `state` and _property syntax_ to retrieve values, set values, and be refreshed when the value changes, no matter what made the change.

To perform this, we use the following functions:

-   `useState` provides access to a property of the model and causes the component to redraw should it change, it also works the same way as React.useState and provides a setter function.

-   `useBinding` provides an object that can be spread onto a component to provide data binding (same as the <Bound> components and `bind()` derivation function)

-   `useSetter` provides a method to set values for a property but does not re-render when it changes

-   `useRefresh` allows the component to refresh based on defined properties (this includes wildcards)

All of these methods end up using _property syntax_:

```js
// Access and set a name property
const [name, setName] = globalState.useState("some.sub.object.name")
```

Property syntax works the same way as lodash/underscore/sugarjs get/set methods. We can replace array accessors [] with . if we like.

###Binding using property syntax

To facilitate a much easier interface constructor, the `<Bind/>` component also allows us to use `property` rather than `target` to focus on a subsection of the model.

```jsx
<Grid item md={3}>
    <Bind property={"profile"}>
        <Profile />
    </Bind>

    <Description />
</Grid>
```

Once this sub binding is made, all of the inner functions use property syntax from the new target.

When we bind to a part of the model that is an array, the children of the `<Bind/>` will be rendered for every member of the collection.

```jsx
export function Todos() {
    const setTodos = globalState.useSetter("todos")
    return (
        <Box>
            <Box ml={2}>
                <Typography variant={"h6"} component={"h1"} gutterBottom>
                    Todo List
                </Typography>
            </Box>
            <Box width={1} clone>
                <List>
                    <Bind property={"todos"}>
                        <Todo />
                    </Bind>
                </List>
            </Box>
            <Box mt={2}>
                <Button color={"primary"} onClick={add}>
                    + Add Todo
                </Button>
            </Box>
        </Box>
    )

    function add() {
        const newTodo = prompt("What must you do?", "")
        if (newTodo) {
            setTodos((prev) => [
                ...prev,
                { title: newTodo, description: "", done: false }
            ])
        }
    }
}
```

Here we bind the list of todos. Also, note how we use `useSetter` because the `<Bind/>` component knows to re-render all of the Todos when the array changes. There is no need to re-render this component. Similar to React.useState, we can either pass a value to the set function or a function that will receive the previous state; this significantly reduces re-renders.

A child rendered by an array can tell its index using the `useIndex()` function exported directly from 'react-bound-state.'

Sometimes in an inner component, we might want to reaccess the outer context. For instance, in the demo, a `<Todo/>` wants to delete itself from the array of `todos.`

When we have `<Bind/>` inside of `<Bind/>` as in this example, we can prepend ^ characters to property syntax to move us up to the parent.

```jsx
function Todo() {
    const [title, setTitle] = globalState.useState("title")
    const [done] = globalState.useState("done", false)
    const [todos, setTodos] = globalState.useState("^todos")
    const [me] = globalState.useState()
    return (
        <ListItem>
            <Card className="full-width" variant={"outlined"}>
                <CardHeader
                    title={title}
                    action={
                        <globalState.Bound
                            property={"done"}
                            component={<Checkbox color={"primary"} />}
                            attribute={"checked"}
                            extract={(e) => e.target.checked}
                        />
                    }
                />
                <CardContent>
                    <Input label="Notes" multiline property={"description"} />
                </CardContent>
                <CardActions>
                    <Button color={"secondary"} onClick={remove}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </SortableItem>
    )
   function remove() {
        setTodos(todos.filter((t) => t !== me))
    }
```

Here we can see that the `<Todo/>` accesses its state to render the card but also accesses the todos from the parent state and uses them to delete entries when the user requests it.

###Refreshing

The elements of the UI redraw if we have used a bound component or a useState(), and the property or any of its direct ancestors change.

e.g. `some.sub.module.name` will redraw if `some` or `some.sub` or `some.sub.module` or `some.sub.module.name` change. It won't redraw if `some.sub.another` changes of course.

Sometimes, especially if we are retrieving an object (say a style), we may want to redraw if a sub-property of the thing we have retrieved changes. This is what `useRefresh()` is for and, in that case, we can also use wildcard `*` and `**` characters in the property syntax:

```jsx
const [style] = styleState.useState("some.style")
styleState.useRefresh("some.style.**")
return (
    <div style={{ ...style }}>
        <Content />
    </div>
)
```

The code above redraws the component if any sub-property of the style changes.

### Setting data

`useSetter()` and `useState()` both return functions that allow you to set the value of a part of the model. You may either mutate or use immutable data as you wish. The set functions returned by both also have a `.set()` sub-function that will set multiple properties at once from an object. These are merged into the current state.

```js
const updateStyle = styleState.useSetter("style")
// Merge properties into the style using .set()
updateStyle.set({ background: "red", color: "white" })

// Replace the whole style object
updateStyle({ color: "blue" })
```

#How it works

The whole system is predicated off React hooks combined with a super-fast wildcard based, custom event emitter. The system uses Inversion of Control to announce updates to the model and then it loosely couples listeners that react and cause the relevant parts of the UI to redraw.

The current value of a `<Bind/>` component is stored in a React Context, and useState is used as a refresh mechanism when we discover a change. We use the useEffect hook to wire up the relevant event handlers and ensure that they are correctly disposed of.

```jsx
useState(property = "", defaultValue, target) {
        let { target: existingTarget, path, stack } = this[useTargetContext]()
        target = target || existingTarget
        ;[property, target, path] = getTargetFrom(property, target, path, stack)
        const value = get(target, property, defaultValue)
        const [id, refresh] = useState(-1)
        const currentRefresh = useRef()
        React.useEffect(() => {
            return () => {
                currentRefresh.current = ()=>{}
            }
        }, [])

        currentRefresh.current = refresh
        useEvent(getPatterns(target, [...path, ...getPath(property)]), update)
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
    }
```

Here you can see the `useState` hook from the system. It uses `getTargetFrom()` to handle upward movements through the state stack. `get()` is an implementation that can retrieve a value from an object without throwing an error if parts are missing.

`get()` is paired with `set()` which does the same for setting a property (these are very like lodash/underscore).

The `useEvent()` hook uses React.useEffect to wire up the set of handlers suggested by `getPatterns()`

The code in `useState` is pretty much the crux of the whole thing. When we change a value, we update the model and emit an event. Any component that cares about the property (or is derived from it, or is listening for it with `useRefresh()`) will redraw retrieving the latest updated value.

```jsx
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
    React.useEffect(() => {
        return () => {
            currentTarget.current = noop
        }
    }, [])
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
```

Bind, on the other hand, handles using an object, which it stores in the context, in addition to providing the facility for notifying its owner when things have changed.

#Conclusion

I've presented a compelling way of binding data to "contextual" and global scope. It composes in a very natural way and has the additional benefit of providing data binding for React components. As the demonstration project proves, redrawing is minimised.

## License

MIT © [miketalbot](https://github.com/miketalbot)
