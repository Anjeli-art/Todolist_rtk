import {todolistApi, TodolistsType} from "../../API/todolistAPI";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {setTasksTC} from "./tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TypeForTasksAction =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof clearTodolistDateAC>

export type ActionTypeTodolists =
    | ReturnType<typeof changeTitleTodoAC>
    | ReturnType<typeof changeFilterTodoAC>
    | TypeForTasksAction
    | ReturnType<typeof changeEntityStatusTodoAC>

const initialState: Array<TodolistsTypeEntity> = []

// export const setTodoTС=createAsyncThunk("todo/setTodoTC",async ({},thunkAPI)=>{
//     thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
//     try {
//         const res = await todolistApi.getTodolists()
//         thunkAPI.dispatch(setTodosAC({todosArray: res.data}))
//         res.data.forEach((todo) => {
//             thunkAPI.dispatch(setTasksTC(todo.id))
//         })
//     } catch (e: any) {
//         handleServerNetworkError(e, thunkAPI.dispatch)
//     } finally {
//         thunkAPI.dispatch(setAppStatusAC({status: "success"}))
//     }
// })
export const setTodoTС = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistApi.getTodolists()
        dispatch(setTodosAC({todosArray: res.data}))
        res.data.forEach((todo) => {
            dispatch(setTasksTC(todo.id))
        })
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }
}


const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistsType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTitleTodoAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeFilterTodoAC(state, action: PayloadAction<{ filter: filterType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeEntityStatusTodoAC(state, action: PayloadAction<{ entityStatus: EntityStatusType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        setTodosAC(state, action: PayloadAction<{ todosArray: Array<TodolistsType> }>) {
            return action.payload.todosArray.map(todo => {
               return {...todo, filter: "all", entityStatus: "idle"}
             })
        },
        clearTodolistDateAC(state, action: PayloadAction<{}>) {
            return []
        }
    }
})
export type filterType = "all" | "active" | "completed"
export type EntityStatusType = "idle" | "sucsses" | "loading" | "failed"
export type TodolistsTypeEntity = TodolistsType & { filter: filterType, entityStatus: EntityStatusType }

export const removeTodolistAC = slice.actions.removeTodolistAC
export const addTodolistAC = slice.actions.addTodolistAC
export const changeTitleTodoAC = slice.actions.changeTitleTodoAC
export const changeFilterTodoAC = slice.actions.changeFilterTodoAC
export const changeEntityStatusTodoAC = slice.actions.changeEntityStatusTodoAC
export const setTodosAC = slice.actions.setTodosAC
export const clearTodolistDateAC = slice.actions.clearTodolistDateAC
export const todolistsReducer = slice.reducer


// export const todolistsReducer = (state: Array<TodolistsTypeEntity> = initialState, action: ActionTypeTodolists): Array<TodolistsTypeEntity> => {
//
//     switch (action.type) {
//         case 'TODO/REMOVE-TODOLIST':
//             return state.filter(todo => todo.id !== action.id)
//
//         case 'TODO/ADD-TODOLIST':
//             return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
//
//         case 'TODO/CHANGE-TODOLIST-TITLE':
//             return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
//
//         case'TODO/CHANGE-TODOLIST-FILTER':
//             return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
//
//         case'TODO/CHANGE-TODOLIST-ENTITY-STATUS':
//             return state.map(todo => todo.id === action.id ? {...todo, entityStatus: action.entityStatus} : todo)
//
//         case"TODO/SET-TODO":
//             return action.todos.map(todo => {
//                 return {...todo, filter: "all", entityStatus: "idle"}
//             })
//         case "TODO/CLEAR-TODO-DATA":
//             return []
//         default:
//             return state
//     }
// };

// export const removeTodolistAC = (id: string) => ({
//     type: 'TODO/REMOVE-TODOLIST',
//     id
// }) as const
//
// export const addTodolistAC = (todolist: TodolistsType) => ({
//     type: 'TODO/ADD-TODOLIST',
//     todolist
// }) as const
//
// export const changeTitleTodoAC = (id: string, newTodolistTitle: string) => ({
//     type: 'TODO/CHANGE-TODOLIST-TITLE',
//     id,
//     title: newTodolistTitle
// }) as const

// export const changeFilterTodoAC = (filter: filterType, id: string) => ({
//     type: 'TODO/CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// }) as const

// export const changeEntityStatusTodoAC = (entityStatus: EntityStatusType, id: string) => ({
//     type: 'TODO/CHANGE-TODOLIST-ENTITY-STATUS',
//     id,
//     entityStatus
// }) as const


// export const setTodosAC = (todosArray: Array<TodolistsType>) => ({
//     type: "TODO/SET-TODO",
//     todos: todosArray
// }) as const
//
//
// export const clearTodolistDateAC = () => ({
//     type: "TODO/CLEAR-TODO-DATA",
// }) as const

export enum ServerResponseResultCode {
    success = 0,
    error = 1,
    captcha = 10
}



export const removeTodoTС = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeEntityStatusTodoAC({entityStatus: "loading", id: todolistId}))
    try {
        await todolistApi.deleteTodolist(todolistId)
        dispatch(removeTodolistAC({id: todolistId}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }
}

export const addTodoTС = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistApi.createTodolist(title)
        dispatch(addTodolistAC({todolist: res.data.data.item}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }
}

export const changeTodoTС = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        await todolistApi.updateTodolistTitle({todolistId, title})
        dispatch(changeTitleTodoAC({id: todolistId, title: title}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }
}
