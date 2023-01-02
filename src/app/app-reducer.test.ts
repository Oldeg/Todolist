import {appReducer, RequestStatusType, setError, setStatus} from "./app-reducer";

let startState: {
    error:null,
    status: RequestStatusType,
    initialized: boolean
}
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        initialized: false
    }
})
test('correct error message should be set', () => {

    const endState = appReducer(startState, setError({error:'Some error'}))

    expect(endState.error).toBe('Some error');
});
test('correct status should be set', () => {

    const endState = appReducer(startState, setStatus({status:'idle'}))

    expect(endState.status).toBe('idle');
});