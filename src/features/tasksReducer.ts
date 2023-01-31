import {addTodolistTC, clearTodosDataAC, fetchTodolistsTC, removeTodolistTC} from "./todoListReducer";

import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../API/task-api";

import {AppRootState} from "../app/store";
import {setError, setStatus} from "../app/app-reducer";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}

export const getTasksTC = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await taskAPI.getTasks(todolistId)

        if (res.data.error === null) {
            thunkAPI.dispatch(setStatus({status: 'succeeded'}))
            return {todolistId: todolistId, tasks: res.data.items}

        } else {
            thunkAPI.dispatch(setError({error: res.data.error}))
            thunkAPI.dispatch(setStatus({status: 'failed'}))
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            const err = e.response ? e.response.data.message : e.message
            handleServerNetworkError(thunkAPI.dispatch, err)
        }

    }
})

export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', async (params: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatus({status: 'loading'}))
    try {
        const res = await taskAPI.deleteTask(params.todolistId, params.taskId)

        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            thunkAPI.dispatch(setStatus({status: 'succeeded'}))
            return {id: params.taskId, todolistID: params.todolistId}

        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            const err = e.response ? e.response.data.message : e.message
            handleServerNetworkError(thunkAPI.dispatch, err)
        }

    }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (params: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatus({status: 'loading'}))
    try {
        const res = await taskAPI.createTask(params.todolistId, params.title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setStatus({status: 'succeeded'}))
            return res.data.data.item

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(dispatch, err)
            return rejectWithValue(null)

        }
        return rejectWithValue(null)

    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (params: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    dispatch(setStatus({status: 'loading'}))
    const state = getState() as AppRootState
    const task = state.tasks[params.todolistId].find(t => t.id === params.taskId)
    if (!task) {
        console.warn('Task not found')
        return rejectWithValue(null)
    }
    const apiModel: UpdateTaskModelType = {
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...params.domainModel
    }
    const res = await taskAPI.updateTask(params.todolistId, apiModel, params.taskId)
    try {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setStatus({status: 'succeeded'}))
            return params

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(dispatch, err)
            return rejectWithValue(null)

        }
        return rejectWithValue(null)
    }


})


const initialState: TasksStateType = {}
const slice = createSlice({
    name: 'tasksReducer',
    initialState: initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload]
        })
        builder.addCase(clearTodosDataAC, () => {
            return {}
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            if (action.payload) state[action.payload.todolistId] = action.payload.tasks


        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state[action.payload.todolistID].findIndex(task => {
                    if (action.payload) {
                        return task.id === action.payload.id
                    }
                })
                if (index > -1) {
                    state[action.payload.todolistID].splice(index, 1)
                }
            }


        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.domainModel}
            }
        })

    }
})
export const tasksReducer = slice.reducer


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
type UpdateTaskType = {
    todolistId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
}



