import React, {useCallback, useEffect} from "react";
import {Box, Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {addTasksTC, setTasksTC} from "../tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../app/store";
import {Task} from "./Task/Task";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {TasksStatuses, TasksType} from "../../../API/todolistAPI";
import {filterType, TodolistsTypeEntity} from "../todolist-reducer";


export type TodolistType = {
    todo: TodolistsTypeEntity
    TodoChanged: (value: filterType, todolistid: string) => void
    removeTodo: (todolistid: string) => void
    titleTodoStatus: (todolistid: string, Newvalue: string) => void
    demo?: boolean
}


export const Todolist: React.FC<TodolistType> = React.memo(({todo, TodoChanged, removeTodo, titleTodoStatus, demo}) => {

    // useEffect(() => {
    //     if (demo) {
    //         return
    //     }
    //     dispatch(setTasksTC(todo.id))
    // }, [])

    const tasks = useSelector<AppRootType, Array<TasksType>>(state => state.tasks[todo.id])
    const dispatch = useDispatch()

    const onButtonFilterClick1 = useCallback(() => {
        TodoChanged("all", todo.id)
    }, [TodoChanged, todo.id])
    const onButtonFilterClick2 = useCallback(() => {
        TodoChanged("active", todo.id)
    }, [TodoChanged, todo.id])
    const onButtonFilterClick3 = useCallback(() => {
        TodoChanged("completed", todo.id)
    }, [TodoChanged, todo.id])

    const handlerTodoList = () => removeTodo(todo.id)

    const onChangeTitleTodo = useCallback((Newvalue: string) => {
        titleTodoStatus(todo.id, Newvalue)
    }, [titleTodoStatus, todo.id])

    let taskfortodolist = tasks

    if (todo.filter === "completed") {
        taskfortodolist = taskfortodolist.filter(el => el.status === TasksStatuses.Completed)
    }
    if (todo.filter === "active") {
        taskfortodolist = taskfortodolist.filter(el => el.status === TasksStatuses.New)
    }

    return (
        <Box boxShadow={10}
             style={{padding: "15px", border: "3px #ffca28 solid", borderRadius: "10px", backgroundColor: "white"}}>
            <h3>
                <EditableSpan title={todo.title} onChange={onChangeTitleTodo} disabled={todo.entityStatus === "loading"}/>
                <IconButton aria-label="delete" color="default" onClick={handlerTodoList}
                            disabled={todo.entityStatus === "loading"}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm disabled={todo.entityStatus === "loading"}
                         callback={useCallback((title) => {
                             dispatch(addTasksTC(title, todo.id))
                         }, [dispatch, todo.id])}/>
            <ul>
                {taskfortodolist.map(el => {
                        return <Task task={el} todoId={todo.id} key={el.id}/>
                    }
                )}
            </ul>
            <div>
                <Button variant={todo.filter === "all" ? "contained" : "text"} style={{padding: "2px",}}
                        onClick={onButtonFilterClick1}>all
                </Button>
                <Button variant={todo.filter === "active" ? "contained" : "text"} style={{padding: "2px"}}
                        onClick={onButtonFilterClick2}>active
                </Button>
                <Button variant={todo.filter === "completed" ? "contained" : "text"} style={{padding: "2px"}}
                        onClick={onButtonFilterClick3}>complited
                </Button>
            </div>
        </Box>

    )

})



