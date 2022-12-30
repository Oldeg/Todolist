import {AppReducerActionsType, setError, setStatus} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../API/todolists-api'

export const handleServerNetworkError = (dispatch: Dispatch<AppReducerActionsType>, error: string) => {
    dispatch(setError(error))
    dispatch(setStatus("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppReducerActionsType>, data: ResponseType<T>) => {
    if (data.messages) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error'))
    }
    dispatch(setStatus('failed'))
}