import PropTypes from "prop-types"
import React from "react"
import Emitter from "./emitter"
import { inPriorityOrder } from "./sort"

class Cancel  {
    constructor(message) {
        this.name = "Cancel"
        this.message = message
        this.stack = new Error().stack
    }
}


const Framework = (window.Framework = window.Framework || {})

/**
 * Event handler
 */
export let events = new Emitter({
    storeHandlers: (handlers) => handlers.sort(inPriorityOrder)
})

/**
 * Change the event source of the bus, useful
 * for testing
 * @param {Object} newSource - a source of events
 */
export function setEventSource(newSource) {
    events = newSource
}

/**
 * Immediately stop a chain of event handlers and
 * exit
 */
export function stopPropagationAndExit() {
    throw new Cancel()
}

/**
 * Applies an event handler safely ensuring that the
 * event is removed when the calling component
 * unmounts
 *
 * @param {String} pattern - the event pattern to match
 * @param {Function} handler - the event handler
 * @param {Number} [priority] - the priority for this handler, lower is better, default is 0
 */
export function useEvent(pattern, handler, priority) {
    React.useEffect(() => {
        return handle(pattern, handler, priority)
    })
}

/**
 * Adds an event handler to the event bus
 * and returns a function to
 * remove the handler.
 * Wildcards may be used with '*', '**' and '.' to
 * separate parts of the event name.
 *
 * @param {String} pattern - the event pattern to match
 * @param {Function} handler - the handler function for the event
 * @param {Number} [priority] - the priority for this handler, lower is better, default is 0
 * @return {Function} a function to remove the event handler
 */
export function handle(pattern, handler, priority) {
    handler.priority = priority
    events.on(pattern, handler)

    return function () {
        events.off(pattern, handler)
    }
}

/**
 * Add an event handler that will trigger only once
 * @param {String} pattern - the event pattern to match
 * @param {Function} handler - the handler function for the event
 * @param {Number} [priority] - the priority for this handler, lower is better, default is 0
 * @param {Number} [timeout] - a timeout for automatically removing the handler
 * @returns {Function} a function to remove the handler
 */
export function once(pattern, handler, priority, timeout = 0) {
    handler.priority = priority
    events.once(pattern, handler)
    if (timeout) {
        setTimeout(remove, timeout)
    }
    return remove
    function remove() {
        events.off(pattern, handler)
    }
}

/**
 * Raises an event on the event bus during the next free time
 * @param {String} event - the event to raise
 * @param  {...any} params - the parameters for the event
 * @return {Array<any>} - the parameters passed to the function which
 * is useful so that you can return values without initiailizing them
 * @example
 * const [list] = raise('addToThisList', []) // list will be the list passed to the event
 */
export function raiseLater(event, ...params) {
    setTimeout(() => raise(event, ...params))
}

/**
 * Raises an event on the event bus
 * @param {String} event - the event to raise
 * @param  {...any} params - the parameters for the event
 * @return {Array<any>} - the parameters passed to the function which
 * is useful so that you can return values without initiailizing them
 * @example
 * const [list] = raise('addToThisList', []) // list will be the list passed to the event
 */
export function raise(event, ...params) {
    try {
        events.emit(event, ...params)
    } catch (e) {
        if (e instanceof Cancel) {
            return params
        }
        throw e
    }
    return params
}

/**
 * Raises an asynchronous event on the event-bus
 * you may wait for the Promise
 * @param {String} event - the event to be raised
 * @param  {...any} params - the parameters passed to the event
 * @return {Array<any>} the parameters passed to the function
 */
export async function raiseAsync(event, ...params) {
    try {
        await events.emitAsync(event, ...params)
    } catch (e) {
        if (e instanceof Cancel) {
            return params
        }
        throw e
    }
    return params
}

/**
 * Helper function to allow safe addition of event handlers
 * in a generator function.  The provided generator is given
 * a function to add event handlers to the event bus - the
 * handlers will automatically be removed when the generator
 * exits
 * @param {(Function)} fn - a generator function to call.  It will be passed
 * a function to attach handlers that will be removed when the generator
 * function exits
 */
export function* using(fn) {
    const handlers = []
    try {
        yield* fn(addHandler)
    } finally {
        handlers.forEach(({ event, handler }) => {
            events.off(event, handler)
        })
    }

    function addHandler(event, handler) {
        handlers.push({ event, handler })
        events.on(event, handler)
    }
}

/**
 * Inserts an inversion of control socket that uses the event
 * bus to find "plugs" to render.  The type indicates the
 * type of plug to find, a filter property allows you to filter
 * the resulting list.
 * @component
 * @example
 * <Socket type="yourType" any="other" propsYou={{like: 'here'}}/>
 */
export function Socket({ filter = returnValue, type, children, ...props }) {
    let [items] = raise(
        `ui-plug.${type}`,
        [children && { Component: Children, priority: 100 }],
        props
    )
    items = items.filter(Boolean)
    items.sort(inPriorityOrder)
    raise(`ui-render-plugs.${type}`, items)
    return (
        <>
            {filter(items).map(({ Component }, index) => (
                <Component key={index} {...props} />
            ))}
        </>
    )

    function Children() {
        return children
    }
}
Socket.propTypes = {
    filter: PropTypes.func,
    type: PropTypes.string.isRequired
}

/**
 * Helper function to pass to socket filter, chooses the single highest
 * priority item to render
 * @param {Array} items
 */
export function bestOnly(items) {
    return items[0]
}

/**
 * Helper function to pass to socket filter, selects plugs with a priority
 * lower than a default if there are more than one plugs matching. Used
 * to override defaults - the default will be displayed if there is nothing
 * with a greater priorty
 * @param {Number} value - the priority to display items < than
 */
export function lessThan(value) {
    return function (items) {
        return items.length < 2
            ? items
            : items.filter((i) => i.priority < value)
    }
}

function returnValue(value) {
    return value
}

/**
 * Get the next value
 * @callback PredicateCallback
 * @param {Object} props - The properties passed to the socket
 * @param {Array} list - The currently added items
 * @return {Number|Boolean} return false to not render, otherwise return a priority
 */

/**
 *
 * @param {String} type - the type of the plug
 * @param {PredicateCallback} [predicate] - an optional function to return a priority or "false"
 * if the component should not render give the properties passed
 * @param {Function} Component
 * @param {Number} [priority=100] The priority for the component
 */
export function plug(type, predicate, Component, priority = 0) {
    if (typeof Component === "number") {
        priority = Component
        Component = predicate
        predicate = () => priority
    } else if (Component === undefined) {
        Component = predicate
        predicate = () => priority
    }
    handle(`ui-plug.${type}`, function (list, props) {
        const priority = predicate(props, list)
        if (priority) {
            list.push({ Component, priority })
        }
    })
}

/**
 * Ensures that a passed in item is an array
 * by wrapping it in an array if it isn't
 * already one.  The array is filtered to ensure
 * no empty values
 * so passing undefined or null will end up with an
 * empty array
 * @param item
 * @returns {Array} the wrapped array
 */
export function ensureArray(item) {
    return Array.isArray(item) ? item : [item].filter((f) => f !== undefined)
}
