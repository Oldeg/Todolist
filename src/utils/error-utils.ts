import {AppActionsType, setError, setStatus} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../API/todolists-api'

export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, error: string) => {
    dispatch(setError(error))
    dispatch(setStatus("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    if (data.messages) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error'))
    }
    dispatch(setStatus('failed'))
}