
import {authReducer, InitialAutchType, setInitializedAC, setLoginAC} from "./auth-reducer";

test("status login should be correct", () => {

    const startState: InitialAutchType = {
        isLoggedIn: false,
        isInitialized: false
    }
    const action = setLoginAC(true)
    const endState = authReducer(startState, action)

    expect(startState!==endState).toBeTruthy()
    expect(endState.isLoggedIn).toBe(true)
    expect(endState.isInitialized).toBe(false)
})

test("status initialized should be correct", () => {

    const startState: InitialAutchType = {
        isLoggedIn: false,
        isInitialized: false
    }
    const action = setInitializedAC(true)
    const endState = authReducer(startState, action)

    expect(startState!==endState).toBeTruthy()
    expect(endState.isLoggedIn).toBe(false)
    expect(endState.isInitialized).toBe(true)
})
