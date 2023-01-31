import {authAPI} from "../API/auth-api";
import {RESULT_CODE, setIsLoggedInAC} from "../features/Login/authReducer";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false
}
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (undefined, {dispatch, rejectWithValue}) => {
        dispatch(setStatus({status: 'loading'}))
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(setStatus({status: 'succeeded'}))
                dispatch(setIsLoggedInAC({isLoggedIn: true}))

            } else {
                handleServerAppError(dispatch, res.data)

            }

        } catch (e) {
            if (axios.isAxiosError<{ message: string }>(e)) {
                const err = e.response ? e.response.data.message : e.message
                handleServerNetworkError(dispatch, err)
            }

        }


    }
)

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setError(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.initialized = true
        })
    }


})
export const appReducer = slice.reducer
export const {setStatus, setError} = slice.actions





