import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authApi, LoginParamsType} from "../../API/todolistAPI";
import {handleServerNetworkError} from "../../utils/error-utils";
import {clearTodolistDateAC} from "../TodolistsList/todolist-reducer";

const initialstate = {
    isLoggedIn: false,
    isInitialized: false
}

export type InitialAutchType = typeof initialstate
export type ActionTypeAuth = ReturnType<typeof setLoginAC> | ReturnType<typeof setInitializedAC>

export const authReducer = (state: InitialAutchType = initialstate, action: ActionTypeAuth): InitialAutchType => {

    switch (action.type) {
        case 'AUTH/SET-LOGIN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'AUTH/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default :
            return state


    }
}


export const setLoginAC = (isLoggedIn: boolean) => ({
    type: 'AUTH/SET-LOGIN',
    isLoggedIn
}) as const

export const setInitializedAC = (isInitialized: boolean) => ({
    type: 'AUTH/SET-INITIALIZED',
    isInitialized
}) as const

export const setLoginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        await authApi.createLogin(data)
        dispatch(setLoginAC(true))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("success"))
    }
}

export const deleteLoginTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        await authApi.deleteLogin()
        dispatch(setLoginAC(false))
        dispatch(clearTodolistDateAC())
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("success"))
    }
}

export const setAuthTC = (): AppThunk => async dispatch => {
    try {
        await authApi.authMe()
        dispatch(setLoginAC(true))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setInitializedAC(true))
    }
}
