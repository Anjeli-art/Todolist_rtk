export type StatusType = "idle" | "success" | "loading" | "failed"
export type AppActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

const initialstate = {
    status: "idle" as StatusType,
    error: null as string|null,
}

export type InitialAppStateType = typeof initialstate

export const appReducer = (state: InitialAppStateType = initialstate, action: AppActionType): InitialAppStateType => {

    switch (action.type) {
        case "APP/SET-APP-STATUS":
            return {...state, status: action.status}
        case "APP/SET-APP-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }


}

export const setAppStatusAC = (status: StatusType) => ({
    type: "APP/SET-APP-STATUS",
    status
}) as const

export const setAppErrorAC = (error: string|null) => ({
    type: "APP/SET-APP-ERROR",
    error
}) as const