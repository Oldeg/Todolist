import {todolistAPI, TodoListType} from "../API/todolists-api";
import {RequestStatusType, setStatus} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {getTasksTC, RESULT_CODE} from "./tasksReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodolistsTC = createAsyncThunk('todolist/fetchTodolists', async (undefined, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodoLists()
        dispatch(setStatus({status: 'succeeded'}))
        res.data.forEach(tl => dispatch(getTasksTC(tl.id)))
        return res.data

    } catch (error) {
        handleServerNetworkError(dispatch, error as string)
        return rejectWithValue(null)
    }

})
export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({entityStatus: 'loading', todolistID: todolistId}))
    try {
        const res = await todolistAPI.deleteTodoList(todolistId)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setStatus({status: 'succeeded'}))
            return todolistId
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as string)
        dispatch(changeTodolistEntityStatusAC({entityStatus: 'idle', todolistID: todolistId}))
        return rejectWithValue(null)
    }

})
export const addTodolistTC = createAsyncThunk('todolist/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodoLists(title)

        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setStatus({status: 'succeeded'}))
            return res.data.data.item

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as string)
        return rejectWithValue(null)
    }


})
export const changeTodolistTC = createAsyncThunk('todolist/changeTodolist', async (params: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.updateTodoList(params.id, params.title)

        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setStatus({status: 'succeeded'}))
            return {id: params.id, title: params.title}

        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as string)
        return rejectWithValue(null)
    }


})


export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeFilterAC(state, action: PayloadAction<{ value: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearTodosDataAC() {
            return []
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: "all", entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })

    }
})
export const todoListReducer = slice.reducer
export const {
    changeFilterAC, changeTodolistEntityStatusAC,
    clearTodosDataAC
} = slice.actions


//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}