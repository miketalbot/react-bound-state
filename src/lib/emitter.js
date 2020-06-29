class EventEntry {
    constructor() {
        this.children = new Map()
        this.handlers = []
        this.allBelow = []
    }

    getChild(key) {
        let result
        if (this.children.has(key)) return this.children.get(key)
        this.children.set(key, (result = new EventEntry()))
        return result
    }

    get all() {
        return (this._all = this._all || new EventEntry())
    }
}

const handlers = []

/**
 * @callback HandlePreparer
 *
 * @param {Array<Function>} handlers - the handlers being used
 * @return an updated array or the original array sorted
 */

/**
 * @interface ConstructorParams
 * @property {string} [delimiter=.] - a character which delimits parts of an event pattern
 * @property {string} [wildcard=*] - a wildcard indicator used to handle any parts of a pattern
 * @property {HandlePreparer} [prepareHandlers=v=>v] - a function to modify the handlers just before raising,
 * this is the combined set of all of the handlers that will be raised.
 * @property {HandlePreparer} [storeHandlers=v=>v] - a function to modify or sort the handlers before storing,

 */

/**
 * Event emitter with wild card support and delimited entries.
 */
export class Events {
    /**
     * Constructs an event emitter
     * @param {ConstructorParams} [props] - parameters to configure the emitter
     */
    constructor({
        delimiter = ".",
        wildcard = "*",
        prepareHandlers = (v) => v,
        storeHandlers = (v) => v
    } = {}) {
        this.delimiter = delimiter
        this.wildcard = wildcard
        this.doubleWild = `${wildcard}${wildcard}`
        this.events = new EventEntry()
        this.prepareHandlers = prepareHandlers
        this.storeHandlers = storeHandlers
    }

    /**
     * Adds an event listener with wildcards etc
     * @instance
     * @memberOf Events
     * @param {string} name - the event pattern to handle
     * @param {Function} handler - the handler for the pattern
     */
    on(name, handler) {
        const parts = name.split(this.delimiter)
        let scan = this.events
        for (let i = 0, l = parts.length; i < l; i++) {
            const part = parts[i]
            switch (part) {
                case this.wildcard:
                    scan = scan.all
                    break
                case this.doubleWild:
                    scan.allBelow.push(handler)
                    scan.allBelow = this.storeHandlers(scan.allBelow)
                    return
                default:
                    scan = scan.getChild(part)
                    break
            }
        }
        scan.handlers.push(handler)
        scan.handlers = this.storeHandlers(scan.handlers)
    }

    /**
     * Add an event listener that will fire only once
     * @param {string} name - the event pattern to listen for
     * @param {Function} handler - the function to invoke
     */
    once(name, handler) {
        const self = this
        self.on(name, process)

        function process(...params) {
            self.off(name, process)
            handler(...params)
        }
    }

    /**
     * Removes a listener from a pattern
     * @param {string} name - the pattern of the handler to remove
     * @param {Function} [handler] - the handler to remove, or all handlers
     */
    off(name, handler) {
        const parts = name.split(this.delimiter)
        let scan = this.events
        for (let i = 0, l = parts.length; i < l; i++) {
            const part = parts[i]
            switch (part) {
                case this.wildcard:
                    scan = scan.all
                    break
                case this.doubleWild: {
                    if (handler === undefined) {
                        scan.allBelow = []
                        return
                    }
                    const idx = scan.allBelow.indexOf(handler)
                    if (idx === -1) return
                    scan.allBelow.splice(idx, 1)
                    return
                }
                default:
                    scan = scan.getChild(part)
                    break
            }
        }

        if (handler !== undefined) {
            const idx = scan.handlers.indexOf(handler)
            if (idx === -1) return
            scan.handlers.splice(idx, 1)
        } else {
            scan.handlers = []
        }
    }

    _emit(scan, parts, index, handlers) {
        if (index >= parts.length) {
            handlers.push(...scan.handlers)
            return
        }
        handlers.push(...scan.allBelow)
        this._emit(scan.all, parts, index + 1, handlers)
        this._emit(scan.getChild(parts[index]), parts, index + 1, handlers)
    }

    _callHandlers(handlerList, params) {
        for (const handler of handlerList) {
            handler.apply(this, params)
        }
    }

    async _callHandlersAsync(handlerList, params) {
        for (const handler of handlerList) {
            await handler.apply(this, params)
        }
    }

    async _callHandlersAsyncAtOnce(handlerList, params) {
        const promises = []
        for (const handler of handlerList) {
            promises.push(Promise.resolve(handler.apply(this, params)))
        }
        await Promise.all(promises)
    }

    /**
     * Emits an event synchronously
     * @param {string} event - the event to emit
     * @param {...params} params - the parameters to call the event with
     * @returns {Array<any>} - an array of the parameters the event was called with
     */
    emit(event, ...params) {
        const handlers = []
        this.event = event
        const parts = event.split(this.delimiter)
        this._emit(this.events, parts, 0, handlers)
        const toExecute = this.prepareHandlers(handlers)
        this._callHandlers(toExecute, params)
        return params
    }

    /**
     * Emits events asynchronously, in order, sequentially
     * @param {string} event - the event to emit
     * @param {...params} params - the parameters to call the event with
     * @returns {Array<any>} - an array of the parameters the event was called with
     */
    async emitAsync(event, ...params) {
        const handlers = []
        this.event = event
        const parts = event.split(this.delimiter)
        this._emit(this.events, parts, 0, handlers)
        const toExecute = this.prepareHandlers(handlers)
        await this._callHandlersAsync(toExecute, params)
        return params
    }

    /**
     * Emits events asynchronously, in parallel
     * @param {string} event - the event to emit
     * @param {...params} params - the parameters to call the event with
     * @returns {Array<any>} - an array of the parameters the event was called with
     */
    async emitAtOnce(event, ...params) {
        const handlers = []
        this.event = event
        const parts = event.split(this.delimiter)
        this._emit(this.events, parts, 0, handlers)
        const toExecute = this.prepareHandlers(handlers)
        await this._callHandlersAsyncAtOnce(toExecute, params)
        return params
    }
}

Events.prototype.addEventListener = Events.prototype.on
Events.prototype.removeEventListener = Events.prototype.off
Events.prototype.addListener = Events.prototype.on
Events.prototype.removeListener = Events.prototype.off

export default Events
