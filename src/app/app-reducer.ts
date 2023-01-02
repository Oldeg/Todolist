import {authAPI} from "../API/auth-api";
import {RESULT_CODE, setIsLoggedInAC} from "../features/Login/authReducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false
}
export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setError(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.initialized = action.payload.value
        }
    }
})
export const appReducer = slice.reducer
export const {setStatus,setError,setAppInitialized} = slice.actions


//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {

        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC({value: true}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    }).finally(() => {
        dispatch(setAppInitialized({value: true}))
    })
}
//types
