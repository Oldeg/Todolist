import {setStatus} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {clearTodosDataAC} from "../todoListReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}
export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions
//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatus({status:'loading'}))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC({value:true}))
            dispatch(setStatus({status:'succeeded'}))
        } else {

            handleServerAppError(dispatch, res.data)
        }

    }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus({status:'loading'}))
    authAPI.logOut().then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC({value:false}))
            dispatch(setStatus({status:'succeeded'}))
            dispatch(clearTodosDataAC())
        } else {

            handleServerAppError(dispatch, res.data)
        }

    }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}











