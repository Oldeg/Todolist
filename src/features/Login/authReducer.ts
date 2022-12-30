import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.payload.value}
        }

        default:
            return state
    }


};

//actions
export const setIsLoggedInAC = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    payload: {
        value
    }
}) as const


//thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatus('succeeded'))
        } else {

            handleServerAppError(dispatch, res.data)
        }

    }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    authAPI.logOut().then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatus('succeeded'))
        } else {

            handleServerAppError(dispatch, res.data)
        }

    }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}


//types
export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}

type InitialStateType = {
    isLoggedIn: boolean
}
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>




