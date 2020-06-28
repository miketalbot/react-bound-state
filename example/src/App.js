import React from "react"
import { globalState } from "./states"
import { Container, TextField } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"

const example = {
    part1: {
        style: {
            background: "#fafafa",
            color: "green"
        },
        contents: [
            { name: "Mike", subElement: { test: "this" } },
            { name: "John" }
        ]
    },
    part2: {
        background: "white",
        color: "blue",
        phone: "12345678"
    }
}

const { Bind } = globalState

const Input = globalState.bind({
    component: <TextField variant={"outlined"} />
})

const App = () => {
    return (
        <Bind target={example}>
            <Container>
                <Example />
            </Container>
        </Bind>
    )
}

function Example() {
    const [, setContents] = globalState.useState("part1.contents[0]")
    const style = globalState.useBinding("part1.style", {attribute: "style"})
    return (
        <Grid container spacing={2}>
            <Bind property={`part1.contents`}>
                <Grid item>
                    <Box {...style} p={1}>
                        <Input
                            label="Name"
                            property={"name"}
                            defaultValue={""}
                        />
                        <Bind property={"subElement"}>
                            <Input
                                label="Test"
                                property={"test"}
                                defaultValue={""}
                            />
                        </Bind>
                    </Box>
                </Grid>
            </Bind>
            <Input label="phone" property={"part2.phone"} defaultValue={""} />
            <button onClick={update}>Update</button>
        </Grid>
    )

    function update() {
        style.onChange({ ...style, background: "orange" })
        setContents({ name: "Updated" })
    }
}

export default App
