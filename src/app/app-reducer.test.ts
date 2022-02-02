import {appReducer, InitialAppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null
    }
})

test("status will be changed", () => {

    const action = setAppStatusAC({status: "success"})

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("success")
    expect(endState.error).toBe(null)
    expect(startState !== endState).toBeTruthy()


})
test("error will be set", () => {

    const action = setAppErrorAC({error: "some error"})

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("idle")
    expect(endState.error).toBe("some error")
    expect(startState !== endState).toBeTruthy()


})


