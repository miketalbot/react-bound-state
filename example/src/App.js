import React from 'react'
import { globalState, styleState } from './states'
import { Container, createMuiTheme, CssBaseline, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { FiGithub, GiRopeCoil } from 'react-icons/all'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import GitHubButton from 'react-github-btn'
import primary from '@material-ui/core/colors/deepPurple'
import { ThemeProvider } from '@material-ui/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import { Todos } from './todo'
import { defaultExample } from './dummy-data'
import { debounce, titleize } from './utils'
import { Description, Profile } from './profile'

const theme = createMuiTheme({
    palette: {
        primary
    }
})

const example = JSON.parse(
    localStorage.getItem("store") || JSON.stringify(defaultExample)
)

const styles = {
    color: "blue",
    style: {
        fontSize: 22,
        color: "white",
        fontWeight: 200,
        textAlign: "center",
        textShadow: "",
        boxShadow: ""
    }
}

const original = JSON.parse(JSON.stringify(styles))

export const { Bind, useState } = globalState

export const Input = globalState.bind({
    component: <TextField variant={"outlined"} fullWidth />
})

export const Combo = styleState.bind({
    extract(_, value) {
        return value
    },
    component: (
        <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => (
                <TextField {...params} label="Combo box" variant="outlined" />
            )}
        />
    )
})

export const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: "250%",
        marginRight: theme.spacing(2)
    },
    topBar: {
        cursor: "pointer"
    },
    githubIcon: {
        color: "white"
    },
    name: {
        fontSize: "120%"
    },
    location: {
        fontWeight: "bold"
    }
}))

const save = debounce((data) => {
    localStorage.setItem("store", JSON.stringify(data))
})

const App = () => {
    const classes = useStyles()
    return (
        <ThemeProvider theme={theme}>
            <styleState.Bind target={styles}>
                <Bind onChange={save} target={example}>
                    <CssBaseline />
                    <AppBar position={"sticky"} className={classes.topBar}>
                        <Toolbar>
                            <GiRopeCoil className={classes.icon} />
                            <Typography variant="h6" color="inherit" noWrap>
                                REACT-BOUND-STATE
                            </Typography>
                            <Box flexGrow={1} />
                            <GitHubButton
                                href="https://github.com/miketalbot/react-bound-state"
                                data-color-scheme="no-preference: light; light: light; dark: dark;"
                                data-icon="octicon-star"
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star miketalbot/js-coroutines on GitHub"
                            >
                                Star
                            </GitHubButton>

                            <IconButton
                                href={
                                    "https://github.com/miketalbot/react-bound-state"
                                }
                            >
                                <FiGithub className={classes.githubIcon} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box mt={6}>
                        <Container>
                            <Example />
                        </Container>
                    </Box>
                </Bind>
            </styleState.Bind>
        </ThemeProvider>
    )
}

function Example() {
    const resetStyles = styleState.useSetter()
    const resetContents = globalState.useSetter()
    const { set } = styleState.useSetter("style")
    const setColor = styleState.useSetter("style.color")
    const setWeight = styleState.useSetter("style.fontWeight")
    console.log("draw Example")
    return (
        <Grid container spacing={2}>
            <Grid item md={5}>
                <Box mt={2}>
                    <Input property={"profile.name"} label={"Name"} />
                </Box>
                <Box mt={2}>
                    <Input property={"profile.location"} label={"Location"} />
                </Box>
                <Box mt={2}>
                    <Input
                        updateOnBlur
                        multiline
                        property={"description"}
                        label={"Description"}
                    />
                </Box>
                <Box mt={2}>
                    <Combo
                        getOptionLabel={(v) => titleize(v)}
                        property={"color"}
                        defaultValue={"red"}
                        options={[
                            "red",
                            "darkred",
                            "blue",
                            "green",
                            "darkgreen"
                        ]}
                    />
                </Box>
                <Box mt={2} display={"flex"}>
                    <Box mr={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={change}
                        >
                            Profile color
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={changeWeight}
                        >
                            Font Weight
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button variant="contained" onClick={changeMultiple}>
                            Change Multiple
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button color={"secondary"} onClick={reset}>
                            Reset
                        </Button>
                    </Box>
                </Box>



            </Grid>
            <Grid item md={4}>
                <Todos/>
            </Grid>
            <Grid item md={3}>
                <Bind property={"profile"}>
                    <Profile />
                </Bind>

                <Description />
            </Grid>
        </Grid>
    )

    function reset() {
        resetStyles(JSON.parse(JSON.stringify(original)))
        resetContents.set(JSON.parse(JSON.stringify(defaultExample)))
    }

    function change() {
        setColor(
            `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(
                Math.random() * 255
            )})`
        )
    }

    function changeWeight() {
        setWeight((prev) => (prev + 200) % 800)
    }

    function changeMultiple() {
        set({
            color: "white",
            textShadow: "0 0 4px white",
            boxShadow: "0 0 12px #00000060"
        })
    }
}

export default App
