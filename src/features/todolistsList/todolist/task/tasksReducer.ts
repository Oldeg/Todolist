import {TaskPriorities, TaskStatuses, TaskType} from "api/task-api";
import {createSlice} from "@reduxjs/toolkit";
import {tasksActions,todoListsActions} from 'features/todolistsList'


export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}


const initialState: TasksStateType = {}
export const slice = createSlice({
    name: 'tasksReducer',
    initialState: initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(todoListsActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(todoListsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload]
        })
        builder.addCase(todoListsActions.clearTodosData, () => {
            return {}
        })
        builder.addCase(todoListsActions.fetchTodoLists.fulfilled, (state, action) => {
            action.payload.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(tasksActions.getTasks.fulfilled, (state, action) => {
            if (action.payload) state[action.payload.todolistId] = action.payload.tasks


        })
        builder.addCase(tasksActions.deleteTask.fulfilled, (state, action) => {
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
        builder.addCase(tasksActions.addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(tasksActions.updateTask.fulfilled, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.domainModel}
            }
        })

    }
})


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



