# react-bound-state

> Binding library for React

[![NPM](https://img.shields.io/npm/v/react-bound-state.svg)](https://www.npmjs.com/package/react-bound-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

## License

MIT © [miketalbot](https://github.com/miketalbot)
