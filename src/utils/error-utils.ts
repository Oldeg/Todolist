import {Dispatch} from "redux";
import {ResponseType} from 'api/todolists-api'
import {AxiosError} from 'axios';
import {appActions} from 'app';

export const handleServerNetworkError = (dispatch: Dispatch, error: any) => {
    console.log(error)
    const err = error as AxiosError
    dispatch(appActions.setError({error: err.message}))
    dispatch(appActions.setStatus({status: "failed"}))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages) {
        dispatch(appActions.setError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'Some error'}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}