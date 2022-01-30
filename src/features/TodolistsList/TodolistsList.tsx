import React, {useCallback, useEffect} from "react";
import {
    addTodoTС, changeFilterTodoAC,
    changeTodoTС,
    filterType,
    removeTodoTС,
    setTodoTС,
    TodolistsTypeEntity
} from "./todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../app/store";
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = React.memo(({demo = false}) => {

    const login = useSelector<AppRootType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !login) {
            return
        }
        dispatch(setTodoTС())
    }, [dispatch])

    const todolists = useSelector<AppRootType, Array<TodolistsTypeEntity>>(state => state.todolists)

    const removeTodo = useCallback((todolistid: string) => {
        dispatch(removeTodoTС(todolistid))

    }, [dispatch])
    const titleTodoStatus = useCallback((todolistid: string, Newvalue: string) => {
        dispatch(changeTodoTС(todolistid, Newvalue))
    }, [dispatch])

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoTС(title))
    }, [dispatch])

    const TodoChanged = useCallback((value: filterType, todolistid: string) => {
        dispatch(changeFilterTodoAC(value, todolistid))
    }, [dispatch])
    if (!login) {
        return <Navigate to={"login"}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callback={addTodo}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(el => {
                    return <Grid item key={el.id}>
                        <Todolist todo={el}
                                  TodoChanged={TodoChanged}
                                  removeTodo={removeTodo}
                                  titleTodoStatus={titleTodoStatus}
                                  demo={demo}
                        />
                    </Grid>
                })}</Grid>
        </>
    );
});
