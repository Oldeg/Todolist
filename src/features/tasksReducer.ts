import {addTodolistAC, clearTodosDataAC, removeTodolistAC, setTodolistAC} from "./todoListReducer";

import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../API/task-api";

import {AppRootState} from "../app/store";
import {setError, setStatus} from "../app/app-reducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}

const initialState: TasksStateType = {}
const slice = createSlice({
    name: 'tasksReducer',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ id: string, todolistID: string }>) {
            const index = state[action.payload.todolistID].findIndex(task => task.id === action.payload.id)
            if (index > -1) {
                state[action.payload.todolistID].splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModelType, todolistID: string }>) {
            const index = state[action.payload.todolistID].findIndex(task => task.id === action.payload.id)
            if(index > -1){
                state[action.payload.todolistID][index] = {...state[action.payload.todolistID][index],...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistID] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC,(state, action) => {state[action.payload.todolist.id] = []})
        builder.addCase(removeTodolistAC,(state, action) => {delete state[action.payload.id]})
        builder.addCase(clearTodosDataAC,() => {return {}})
        builder.addCase(setTodolistAC,(state, action) => {action.payload.todolists.forEach(tl => state[tl.id] = [])})

    }
})
export const tasksReducer = slice.reducer
export const {setTasksAC, removeTaskAC, updateTaskAC, addTaskAC} = slice.actions


//thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            if (res.data.error === null) {
                dispatch(setTasksAC({todolistID: todolistId, tasks: res.data.items}))
                dispatch(setStatus({status: 'succeeded'}))
            } else {
                dispatch(setError({error: res.data.error}))
                dispatch(setStatus({status: 'failed'}))
            }

        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))

    try {
        const res = await taskAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(removeTaskAC({id: taskId, todolistID: todolistId}))
            dispatch(setStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(dispatch, error)
        }
    }
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    try {
        const res = await taskAPI.createTask(todolistId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {

            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }

    } catch (e) {

        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(dispatch, error)
        }
    }


}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(setStatus({status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task not found')
            return
        }
        const apiModel: UpdateTaskModelType = {
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
        }
        taskAPI.updateTask(todolistId, apiModel, taskId)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                    dispatch(updateTaskAC({id: taskId, model: domainModel, todolistID: todolistId}))
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


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    status?: TaskStatuses
    description?: string
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}



