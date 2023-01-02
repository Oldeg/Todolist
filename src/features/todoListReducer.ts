import {todolistAPI, TodoListType} from "../API/todolists-api";
import {AppThunk} from "../app/store";
import {RequestStatusType, setStatus} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {getTasksTC, RESULT_CODE} from "./tasksReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []
export const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        changeFilterAC(state, action: PayloadAction<{ value: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index > -1){
                state[index].filter = action.payload.value
            }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index > -1){
                state[index].title = action.payload.title
            }
        },
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index > -1){
                state.splice(index,1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        },
        setTodolistAC(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            if(index > -1){
                state[index].entityStatus = action.payload.entityStatus
        }},
        clearTodosDataAC() {
            return []
        }

    }
})
export const todoListReducer = slice.reducer
export const {
    changeFilterAC, changeTodolistTitleAC, changeTodolistEntityStatusAC, setTodolistAC,
    removeTodolistAC, addTodolistAC, clearTodosDataAC
} = slice.actions


//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    todolistAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodolistAC({todolists: res.data}))
            dispatch(setStatus({status: 'succeeded'}))
            return res.data
        })
        .then((todos) => {
            todos.forEach(tl => dispatch(getTasksTC(tl.id)))
        })
        .catch((error: AxiosError<{ message: string }>) => {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(dispatch, err)
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({entityStatus:'loading', todolistID:todolistId}))
    todolistAPI.deleteTodoList(todolistId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(removeTodolistAC({id:todolistId}))
                dispatch(setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
        dispatch(changeTodolistEntityStatusAC({entityStatus:'idle', todolistID:todolistId}))

    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    todolistAPI.createTodoLists(title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(addTodolistAC({todolist:res.data.data.item}))
                dispatch(setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const changeTodolistTC = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    todolistAPI.updateTodoList(id, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(changeTodolistTitleAC({id, title}))
                dispatch(setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}

//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}