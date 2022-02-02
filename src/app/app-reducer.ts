import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = "idle" | "success" | "loading" | "failed"
export type AppActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

const initialState = {
    status: "idle" as StatusType,
    error: null as string | null,
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    }
})

export const appReducer = slice.reducer
export const setAppStatusAC = slice.actions.setAppStatusAC
export const setAppErrorAC = slice.actions.setAppErrorAC

export type InitialAppStateType = typeof initialState


// export const appReducer = (state: InitialAppStateType = initialState, action: AppActionType): InitialAppStateType => {
//
//     switch (action.type) {
//         case "APP/SET-APP-STATUS":
//             return {...state, status: action.status}
//         case "APP/SET-APP-ERROR":
//             return {...state, error: action.error}
//         default:
//             return state
//     }
//
//
// }
//
// export const setAppStatusAC = (status: StatusType) => ({
//     type: "APP/SET-APP-STATUS",
//     status
// }) as const
//
// export const setAppErrorAC = (error: string|null) => ({
//     type: "APP/SET-APP-ERROR",
//     error
// }) as const
