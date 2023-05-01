import {TodoListType} from "api/todolists-api";
import {RequestStatusType} from "app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodolist,
    changeTodolist,
    fetchTodoLists,
    removeTodolist
} from './todoListsActions';


export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ value: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.value
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearTodosData() {
            return []
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: "all", entityStatus: 'idle'})
        })
        builder.addCase(changeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })

    }
})


//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}