import {combineReducers} from "redux";
import {ActionTypeTodolists, todolistsReducer} from "../features/TodolistsList/todolist-reducer";
import {ActionTypeTasks, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";
import {ActionTypeAuth, authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export type AppRootType = ReturnType<typeof rootReducer>

//export const store = createStore(rootReducer,applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootActionType = ActionTypeTasks | ActionTypeTodolists | AppActionType|ActionTypeAuth

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AppRootActionType>
// @ts-ignore
window.store = store
