import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authApi, LoginParamsType} from "../../API/todolistAPI";
import {handleServerNetworkError} from "../../utils/error-utils";
import {clearTodolistDateAC} from "../TodolistsList/todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLoginAC(state, action: PayloadAction<{isLoggedIn:boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setInitializedAC(state, action: PayloadAction<{isInitialized:boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const authReducer = slice.reducer

export type InitialAutchType = typeof initialState
export type ActionTypeAuth = ReturnType<typeof setLoginAC> | ReturnType<typeof setInitializedAC>


// export const authReducer = (state: InitialAutchType = initialState, action: ActionTypeAuth): InitialAutchType => {
//
//     switch (action.type) {
//         case 'AUTH/SET-LOGIN':
//             return {...state, isLoggedIn: action.isLoggedIn} //immerjs
//         case 'AUTH/SET-INITIALIZED':
//             return {...state, isInitialized: action.isInitialized}
//         default :
//             return state
//
//
//     }
// }


// export const setLoginAC = (isLoggedIn: boolean) => ({
//     type: 'AUTH/SET-LOGIN',
//     isLoggedIn
// }) as const
//
// export const setInitializedAC = (isInitialized: boolean) => ({
//     type: 'AUTH/SET-INITIALIZED',
//     isInitialized
// }) as const


export const setLoginAC=slice.actions.setLoginAC
export const setInitializedAC=slice.actions.setInitializedAC

export const setLoginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status:"loading"}))
    try {
        await authApi.createLogin(data)
        dispatch(setLoginAC({isLoggedIn:true}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status:"success"}))
    }
}

export const deleteLoginTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status:"loading"}))
    try {
        await authApi.deleteLogin()
        dispatch(setLoginAC({isLoggedIn:false}))
        dispatch(clearTodolistDateAC({}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status:"success"}))
    }
}

export const setAuthTC = (): AppThunk => async dispatch => {
    try {
        await authApi.authMe()
        dispatch(setLoginAC({isLoggedIn:true}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setInitializedAC({isInitialized:true}))
    }
}
