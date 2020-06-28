import { Events } from "../src/lib/emitter"
import { should } from "chai"
should()

describe("event-emitter", function () {
    it("should handle a base level event", function () {
        const events = new Events()
        let counter = 0
        events.on("hello", () => counter++)
        events.emit("hello")
        counter.should.equal(1)
    })
    it("should handle a two part event", function () {
        const events = new Events()
        let counter = 0
        events.on("hello.mum", () => counter++)
        events.emit("hello.mum")
        counter.should.equal(1)
    })
    it("should handle a three part event with a wildcard", function () {
        const events = new Events()
        let counter = 0
        events.on("hello.*.how", () => counter++)
        events.on("hello.mum.how", () => counter++)
        events.emit("hello.mum.how")
        counter.should.equal(2)
    })
    it("should handle removing an event with a wildcard", function () {
        const events = new Events()
        let counter = 0
        const increment = () => counter++
        events.on("hello.*.how", increment)
        events.off("hello.*.how", null)
        events.emit("hello.mum.how")
        events.off("hello.*.how", increment)
        events.emit("hello.mum.how")
        counter.should.equal(1)
    })
    it("should handle a double wildcard at the end", function () {
        const events = new Events()
        let counter = 0
        events.on("hello.**", () => counter++)
        events.emit("hello.mum.how")
        events.emit("hello.mum.test")
        events.emit("hello.banana.test")
        events.emit("hello")
        counter.should.equal(3)
    })
    it("should be able to turn off an event", function () {
        const events = new Events()
        let counter = 0
        events.on("hello", increment)
        events.emit("hello")
        events.off("hello", increment)
        events.emit("hello")
        events.emit("hello")
        counter.should.equal(1)
        function increment() {
            counter++
        }
    })
    it("should handle a once event", function () {
        const events = new Events()
        let counter = 0
        events.once("hello.**", () => counter++)
        events.emit("hello.mum.how")
        events.emit("hello.mum.test")
        events.emit("hello.banana.test")
        events.emit("hello")
        counter.should.equal(1)
    })
    it("should handle async events", async function () {
        const events = new Events()
        let counter = 0
        events.on("hello", async () => {
            await new Promise((resolve) => setTimeout(resolve, 200))
            counter++
        })
        await events.emitAsync("hello")
        counter.should.equal(1)
    })
    it("should handle async events at once", async function () {
        const events = new Events()
        let counter = 0

        events.on("hello", async () => {
            await new Promise((resolve) => setTimeout(resolve, 200))
            counter++
        })
        events.on("hello", async () => {
            await new Promise((resolve) => setTimeout(resolve, 200))
            counter++
        })
        let time = Date.now()
        await events.emitAsync("hello")
        let duration = Date.now() - time
        duration.should.be.greaterThan(340)
        time = Date.now()
        await events.emitAtOnce("hello")
        duration = Date.now() - time
        duration.should.be.lessThan(300)
    })
})
