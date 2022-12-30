import {addTodolistACType, removeTodolistACType, setTodolistACType} from "./todoListReducer";

import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../API/task-api";

import {AppRootState, AppThunk} from "../app/store";
import {setError, SetErrorType, setStatus} from "../app/app-reducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}
export const tasksReducer = (state = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(task => task.id !== action.payload.id)
            }

        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [...state[action.payload.task.todoListId], action.payload.task]
            }

        case 'UPDATE_TASK':
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                        ...t, ...action.payload.model
                    } : t)
            }

        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolist.id]: []}

        case 'REMOVE_TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return {...stateCopy}

        case "SET_TODOLISTS": {
            let stateCopy = {...state}
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'SET_TASKS':
            return {...state, [action.payload.todolistID]: action.payload.tasks}

        default:
            return state
    }


};

//actions
export const removeTaskAC = (id: string, todolistID: string) => ({

    type: 'REMOVE_TASK',
    payload: {id, todolistID}
}) as const

export const addTaskAC = (task: TaskType) => ({
    type: 'ADD_TASK', payload: {task}
}) as const

export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistID: string) => ({
    type: 'UPDATE_TASK',
    payload: {id, model, todolistID}
}) as const

export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => ({
    type: 'SET_TASKS',
    payload: {todolistID, tasks}
}) as const

//thunks
export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatus('loading'))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            if (res.data.error === null) {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setStatus('succeeded'))
            } else {
                dispatch(setError(res.data.error))
                dispatch(setStatus('failed'))
            }

        }).catch((error: AxiosError<{ message: string }>) => {
        const err = error.response ? error.response.data.message : error.message
        handleServerNetworkError(dispatch, err)
    })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    dispatch(setStatus('loading'))

    try {
        const res = await taskAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatus('succeeded'))
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
export const addTaskTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    dispatch(setStatus('loading'))
    try {
        const res = await taskAPI.createTask(todolistId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {

            dispatch(addTaskAC(res.data.data.item))
            dispatch(setStatus('succeeded'))
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
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootState) => {
        dispatch(setStatus('loading'))
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
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
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


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}
export type UpdateDomainTaskModelType = {
    title?: string
    status?: TaskStatuses
    description?: string
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksReducerActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | addTodolistACType
    | removeTodolistACType
    | setTodolistACType
    | ReturnType<typeof setTasksAC>
    | SetErrorType


