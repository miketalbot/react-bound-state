import React from "react"
import { globalState, styleState } from "./states"
import {
    Container,
    TextField,
    CssBaseline,
    CardContent,
    createMuiTheme
} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { GiRopeCoil, FiGithub } from "react-icons/all"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import GitHubButton from "react-github-btn"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import primary from "@material-ui/core/colors/deepPurple"
import { ThemeProvider } from "@material-ui/styles"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"

const theme = createMuiTheme({
    palette: {
        primary
    }
})

const defaultExample = {
    profile: {
        name: "Mike Talbot",
        location: "Bristol"
    },
    description:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
}

const example = JSON.parse(localStorage.getItem('store') || JSON.stringify(defaultExample))

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


const { Bind, useState } = globalState

const Input = globalState.bind({
    component: <TextField variant={"outlined"} fullWidth />
})

function titleize(v) {
    const words = v.split(" ")
    return words
        .map(
            (word) =>
                word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
}

const Combo = styleState.bind({
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

function debounce(fn, delay = 300) {
    let id = 0
    return function(...params) {
        clearTimeout(id)
        id = setTimeout(()=>fn(...params), delay)
    }
}

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

const save = debounce((data)=>{
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
    const resetter = styleState.useSetter()
    const {set} = styleState.useSetter("style")
    const setColor = styleState.useSetter("style.color")
    const setWeight = styleState.useSetter("style.fontWeight")
    console.log("draw Example")
    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Box mt={2}>
                    <Input property={"profile.name"} label={"Name"} />
                </Box>
                <Box mt={2}>
                    <Input property={"profile.location"} label={"Location"} />
                </Box>
                <Box mt={2}>
                    <Input
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
                            Style
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button
                            variant="contained"
                            onClick={changeMultiple}
                        >
                            Change
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button
                            color={"secondary"}
                            onClick={reset}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item md={4}>
                <Bind property={"profile"}>
                    <Profile />
                </Bind>

                <Description />
            </Grid>
        </Grid>
    )

    function reset() {
        resetter(JSON.parse(JSON.stringify(original)))
    }

    function change() {
        setColor(
            `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(
                Math.random() * 255
            )})`
        )
    }

    function changeWeight() {
        setWeight(prev=>(prev + 200) % 800)
    }

    function changeMultiple() {
        set({
            color: 'white',
            textShadow: '0 0 4px white',
            boxShadow: '0 0 12px #00000060'
        })
    }
}

function Description() {
    const [description] = useState("description")
    const [color] = styleState.useState("color")
    console.log("draw Description")
    return (
        <Box>
            <Box p={2} color={color}>
                {description}
            </Box>
            <Combo
                property={"color"}
                defaultValue={"red"}
                options={["red", "darkred", "blue", "green", "darkgreen"]}
            />
        </Box>
    )
}

function Profile() {
    const classes = useStyles()
    const [name] = useState("name")
    const [location] = useState("location")
    console.log("draw Profile")
    return (
        <Card>
            <CardHeader title={"Profile"} action={<Bubble />} />
            <CardContent>
                <Box mt={1} className={classes.name}>
                    {name}
                </Box>
                <Box mt={1} className={classes.location}>
                    {location}
                </Box>
            </CardContent>
        </Card>
    )
}

function Bubble() {
    const [color] = styleState.useState("color")
    const props = styleState.useBinding("style", { attribute: "style" })
    console.log("draw Bubble")
    return (
        <Box
            style={{ ...props.style }}
            m={1}
            borderRadius={"100%"}
            bgcolor={color}
            width={32}
            height={32}
        >
            Pr
        </Box>
    )
}

export default App
