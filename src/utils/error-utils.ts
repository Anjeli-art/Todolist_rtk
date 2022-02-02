import {setAppErrorAC} from "../app/app-reducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (e:any,dispatch:Dispatch)=> {
    if (e.name === "SyntaxError") {
       return dispatch(setAppErrorAC({error:e.message}))
    }
    if (e.message === 'Network Error') {
        return dispatch(setAppErrorAC({error:"no connection!"}))
    } else {
        return dispatch(setAppErrorAC({error:"something error"}))
    }
}
