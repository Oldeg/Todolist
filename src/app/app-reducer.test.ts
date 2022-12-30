import {appReducer, InitialAppReducerStateType, setError, setStatus} from "./app-reducer";

let startState: InitialAppReducerStateType
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        initialized: false
    }
})
test('correct error message should be set', () => {

    const endState = appReducer(startState, setError('Some error'))

    expect(endState.error).toBe('Some error');
});
test('correct status should be set', () => {

    const endState = appReducer(startState, setStatus('idle'))

    expect(endState.status).toBe('idle');
});