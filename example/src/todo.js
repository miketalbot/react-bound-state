import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { CardContent, ListItem } from "@material-ui/core"
import { globalState, styleState } from './states'
import { useIndex } from "react-bound-state"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import React from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Checkbox from "@material-ui/core/Checkbox"
import CardActions from "@material-ui/core/CardActions"
import List from "@material-ui/core/List"
import { Bind, Input, useState } from "./App"
import { MdDragHandle } from "react-icons/all"

const SortableList = SortableContainer(List)
const SortableItem = SortableElement(ListItem)

function arrayMoveInPlace(array, previousIndex, newIndex) {
    if (newIndex >= array.length) {
        let k = newIndex - array.length

        while (k-- + 1) {
            array.push(undefined)
        }
    }

    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0])
    return array
}

export function Todos() {
    console.log("draw Todos")
    const setTodos = globalState.useSetter("todos")
    return (
        <Box>
            <Box ml={2}>
                <Typography variant={"h6"} component={"h1"} gutterBottom>
                    Todo List
                </Typography>
            </Box>
            <Box width={1} clone>
                <SortableList
                    distance={4}
                    onSortEnd={update}
                    component="div"
                    helperClass={"dragger"}
                >
                    <Bind property={"todos"}>
                        <Todo />
                    </Bind>
                </SortableList>
            </Box>
            <Box mt={2}>
                <Button color={"primary"} onClick={add}>
                    + Add Todo
                </Button>
            </Box>
        </Box>
    )

    function update({ oldIndex, newIndex }) {
        setTodos((prev) => arrayMoveInPlace(prev, oldIndex, newIndex))
    }

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

function Todo() {
    const [title, setTitle] = useState("title")
    const [done] = useState("done", false)
    const [todos, setTodos] = useState("^todos")
    const [me] = useState()
    const index = useIndex()
    const [fontWeight] = styleState.useState("style.fontWeight")
    return (
        <SortableItem index={index} component={"div"}>
            <Card className="full-width" variant={"outlined"}>
                <CardHeader
                    avatar={<MdDragHandle />}
                    title={
                        <span
                            style={{
                                fontWeight,
                                textDecoration: done ? "line-through" : ""
                            }}
                        >
                            {title}
                        </span>
                    }
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
                    <Button color={"primary"} onClick={rename}>
                        Rename
                    </Button>
                    <Button color={"secondary"} onClick={remove}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </SortableItem>
    )

    function rename() {
        const newName = prompt("Enter description", title)
        if (newName) {
            setTitle(newName)
        }
    }

    function remove() {
        setTodos(todos.filter((t) => t !== me))
    }
}
