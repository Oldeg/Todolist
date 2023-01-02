import {setError, setStatus} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../API/todolists-api'

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
    dispatch(setError({error}))
    dispatch(setStatus({status:"failed"}))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages) {
        dispatch(setError({error:data.messages[0]}))
    } else {
        dispatch(setError({error:'Some error'}))
    }
    dispatch(setStatus({status:'failed'}))
}