import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI, LoginParamsType} from 'api/auth-api';
import {todoList} from 'features/todolistsList';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {AxiosError} from 'axios';
import {FieldsErrorsType} from 'api/todolists-api';
import {auth} from 'features/auth';
import {appActions} from 'app';

export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> } }
>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === auth.RESULT_CODE.SUCCESS) {
            thunkAPI.dispatch(appActions.setStatus({status: 'succeeded'}))

        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }

    } catch (error) {
        const e = error as AxiosError<{ message: string }>
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [e.message]})
    }


})
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    thunkAPI.dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === auth.RESULT_CODE.SUCCESS) {
            thunkAPI.dispatch(appActions.setStatus({status: 'succeeded'}))
            thunkAPI.dispatch(todoList.slice.actions.clearTodosData())
            return

        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({})
        }

    } catch (e) {
        handleServerNetworkError(thunkAPI.dispatch, e)
        return thunkAPI.rejectWithValue({})
    }

})