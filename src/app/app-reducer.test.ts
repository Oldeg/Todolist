import {app, appActions} from "app";

let startState: {
    error:null,
    status: app.RequestStatusType,
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

    const endState = app.slice.reducer(startState, appActions.setError({error:'Some error'}))

    expect(endState.error).toBe('Some error');
});
test('correct status should be set', () => {

    const endState = app.slice.reducer(startState, appActions.setStatus({status:'idle'}))

    expect(endState.status).toBe('idle');
});