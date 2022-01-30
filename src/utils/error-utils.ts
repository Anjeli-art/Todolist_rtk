import {setAppErrorAC} from "../app/app-reducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (e:any,dispatch:Dispatch)=> {
    if (e.name === "SyntaxError") {
       return dispatch(setAppErrorAC(e.message))
    }
    if (e.message === 'Network Error') {
        return dispatch(setAppErrorAC("no connection!"))
    } else {
        return dispatch(setAppErrorAC("something error"))
    }
}
