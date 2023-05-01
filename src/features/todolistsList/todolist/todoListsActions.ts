import {createAsyncThunk} from '@reduxjs/toolkit';
import {todolistAPI, TodoListType} from 'api/todolists-api';
import {tasks, todoListsActions, tasksActions} from 'features/todolistsList';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {appActions} from 'app';
import {AppRootState, AppThunk} from 'store/store';
import {AppDispatch} from 'hooks/useTypedDispatch';


export const fetchTodoLists = createAsyncThunk<TodoListType[], void, {
    dispatch: AppDispatch,
    state: AppRootState,
    rejectWithValue: null
}>('todolist/fetchTodolists', async (_, {dispatch, getState, rejectWithValue}) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodoLists()
        dispatch(appActions.setStatus({status: 'succeeded'}))
        && res.data.forEach(tl => !getState().tasks[tl.id] && dispatch(tasksActions.getTasks(tl.id))
        )
        return res.data


    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }

})
export const removeTodolist = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    dispatch(todoListsActions.changeTodolistEntityStatus({entityStatus: 'loading', todolistID: todolistId}))
    try {
        const res = await todolistAPI.deleteTodoList(todolistId)
        if (res.data.resultCode === tasks.RESULT_CODE.SUCCESS) {
            dispatch(appActions.setStatus({status: 'succeeded'}))
            return todolistId
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        dispatch(todoListsActions.changeTodolistEntityStatus({entityStatus: 'idle', todolistID: todolistId}))
        return rejectWithValue(null)
    }

})
export const addTodolist = createAsyncThunk('todolist/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodoLists(title)

        if (res.data.resultCode === tasks.RESULT_CODE.SUCCESS) {
            dispatch(appActions.setStatus({status: 'succeeded'}))
            return res.data.data.item

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }


})
export const changeTodolist = createAsyncThunk('todolist/changeTodolist', async (params: {
    id: string,
    title: string
}, {dispatch, rejectWithValue}) => {

    dispatch(appActions.setStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.updateTodoList(params.id, params.title)

        if (res.data.resultCode === tasks.RESULT_CODE.SUCCESS) {
            dispatch(appActions.setStatus({status: 'succeeded'}))
            return {id: params.id, title: params.title}

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }


})