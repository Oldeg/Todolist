import {todolistAPI, TodoListType} from "../API/todolists-api";
import {AppThunk} from "../app/store";
import {RequestStatusType, setStatus, SetStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {RESULT_CODE} from "./tasksReducer";


const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state = initialState, action: TodolistsReducerActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)

        case 'CHANGE_TODOLIST_TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)

        case 'REMOVE_TODOLIST' :
            return state.filter(tl => tl.id !== action.payload.id)

        case 'ADD_TODOLIST':
            return [{...action.payload.todolist, filter: "all", entityStatus: 'idle'}, ...state,]

        case 'SET_TODOLISTS':
            return action.payload.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: 'idle'}
            })
        case 'SET-ENTITY-STATUS':
            return state.map(tl => tl.id === action.payload.todolistID ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)

        default:
            return state
    }
};

//actions
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => ({
    type: 'CHANGE_FILTER',
    payload: {
        value,
        todolistId
    }
}) as const

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {
        id,
        title
    }
}) as const

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE_TODOLIST',
    payload: {
        id
    }

}) as const

export const addTodolistAC = (todolist: TodoListType) => ({
    type: 'ADD_TODOLIST',
    payload: {
        todolist
    }
}) as const

export const setTodolistAC = (todolists: Array<TodoListType>) => ({
    type: 'SET_TODOLISTS',
    payload: {
        todolists
    }
}) as const

export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, todolistID: string) => ({
    type: 'SET-ENTITY-STATUS',
    payload: {entityStatus, todolistID}
} as const)


//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.getTodoLists()
        .then((res) => {

            dispatch(setTodolistAC(res.data))
            dispatch(setStatus('succeeded'))
        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    dispatch(changeTodolistEntityStatusAC('loading', todolistId))
    todolistAPI.deleteTodoList(todolistId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
        dispatch(changeTodolistEntityStatusAC('idle', todolistId))

    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.createTodoLists(title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const changeTodolistTC = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    todolistAPI.updateTodoList(id, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(changeTodolistTitleAC(id, title))
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
export type TodolistsReducerActionsType =
    ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | removeTodolistACType
    | addTodolistACType
    | setTodolistACType
    | SetStatusType
    | ChangeTodolistEntityStatusACType
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>
export type FilterValuesType = "all" | "active" | "completed";
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}