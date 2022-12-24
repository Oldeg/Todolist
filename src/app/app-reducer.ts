export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialAppReducerStateType = initialState, action: AppActionsType): InitialAppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR-STATUS':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}
//actions
export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setError = (error: null | string) => ({type: 'APP/SET-ERROR-STATUS', payload: {error}} as const)

//types
export type InitialAppReducerStateType = typeof initialState
export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type AppActionsType = SetStatusType | SetErrorType