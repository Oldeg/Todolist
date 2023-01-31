import {setStatus} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {clearTodosDataAC} from "../todoListReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FieldsErrorsType} from '../../API/todolists-api';

export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> } }
>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            thunkAPI.dispatch(setStatus({status: 'succeeded'}))
            return

        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }

    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(thunkAPI.dispatch, err)
        }
        return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})

    }

})
export const logOutTC = createAsyncThunk('auth/logout', async (undefined, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            thunkAPI.dispatch(setStatus({status: 'succeeded'}))
            thunkAPI.dispatch(clearTodosDataAC())
            return

        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({})
        }

    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(thunkAPI.dispatch, err)
        }
        return thunkAPI.rejectWithValue({})

    }

})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers(builder) {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logOutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}

export const {setIsLoggedInAC} = slice.actions
export const authReducer = slice.reducer;














