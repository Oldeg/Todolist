import {createAsyncThunk} from '@reduxjs/toolkit';
import {taskAPI, TaskType, UpdateTaskModelType} from 'api/task-api';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {AppRootState} from 'store/store';
import {tasks} from 'features/todolistsList';
import {appActions} from 'app';
import {AppDispatch} from 'hooks/useTypedDispatch';
import App from 'app/App';
import {FieldsErrorsType} from 'api/todolists-api';
import {AxiosError} from 'axios';

export const getTasks = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await taskAPI.getTasks(todolistId)

        if (res.data.error === null) {
            thunkAPI.dispatch(appActions.setStatus({status: 'succeeded'}))
            return {todolistId: todolistId, tasks: res.data.items}

        } else {
            thunkAPI.dispatch(appActions.setError({error: res.data.error}))
            thunkAPI.dispatch(appActions.setStatus({status: 'failed'}))
        }
    } catch (e) {
        handleServerNetworkError(thunkAPI.dispatch, e)
    }
})
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (params: {
    todolistId: string,
    taskId: string
}, thunkAPI) => {
    thunkAPI.dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await taskAPI.deleteTask(params.todolistId, params.taskId)

        if (res.data.resultCode === tasks.RESULT_CODE.SUCCESS) {
            thunkAPI.dispatch(appActions.setStatus({status: 'succeeded'}))
            return {id: params.taskId, todolistID: params.todolistId}

        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(thunkAPI.dispatch, e)
    }
})
export const addTask = createAsyncThunk<TaskType, { title: string, todolistId: string }, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> }
}>('tasks/addTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setStatus({status: 'loading'}))
        try {
            const res = await taskAPI.createTask(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setStatus({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(thunkAPI.dispatch, res.data)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldErrors})
            }

        } catch (error) {
            const e = error as AxiosError<{ message: string }>
            handleServerNetworkError(thunkAPI.dispatch, error)
            return thunkAPI.rejectWithValue({errors: [e.message]})
        }
    })
export const updateTask = createAsyncThunk('tasks/updateTask', async (params: {
    todolistId: string,
    taskId: string,
    domainModel: tasks.UpdateDomainTaskModelType
}, {
                                                                          dispatch,
                                                                          rejectWithValue,
                                                                          getState
                                                                      }) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    const state = getState() as AppRootState
    const task = state.tasks[params.todolistId].find(t => t.id === params.taskId)
    if (!task) {
        console.warn('task not found')
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
        if (res.data.resultCode === tasks.RESULT_CODE.SUCCESS) {
            dispatch(appActions.setStatus({status: 'succeeded'}))
            return params

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }


})