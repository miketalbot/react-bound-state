import { createState } from "../src"
import { should } from 'chai'
should()

describe("ExampleComponent", () => {
    it("should be able to create a state", function () {
        const state = createState("global")
        state.should.not.be.null
        state.Bound.should.be.a("function")
    })
})
Ω
