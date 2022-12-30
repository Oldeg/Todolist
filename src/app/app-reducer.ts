import {AppThunk} from "./store";
import {authAPI} from "../API/auth-api";
import {RESULT_CODE, setIsLoggedInAC} from "../features/Login/authReducer";
import {AxiosError} from "axios/index";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false
}

export const appReducer = (state: InitialAppReducerStateType = initialState, action: AppReducerActionsType): InitialAppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR-STATUS':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED': {
            return {...state, initialized: action.payload.value}
        }
        default:
            return state
    }
}
//actions
export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setError = (error: null | string) => ({type: 'APP/SET-ERROR-STATUS', payload: {error}} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', payload: {value}} as const)

//thunks
export const initializeAppTC = (): AppThunk => dispatch => {
    authAPI.me().then(res => {

        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
        } else{
            handleServerAppError(dispatch, res.data)
        }
    }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    }).finally(() => {
        dispatch(setAppInitialized(true))
    })
}
//types
export type InitialAppReducerStateType = typeof initialState
export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type AppReducerActionsType = SetStatusType | SetErrorType | ReturnType<typeof setAppInitialized>