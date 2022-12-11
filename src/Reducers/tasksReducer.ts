import {addTodolistACType, removeTodolistACType, setTodolistACType} from "./todoListReducer";

import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../API/task-api";

import {AppRootState, AppThunk} from "../Store/store";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(task => task.id !== action.payload.id)
            }
        }
        case 'ADD_TASK': {

            return {
                ...state,
                [action.payload.task.todoListId]: [...state[action.payload.task.todoListId], action.payload.task]
            }
        }
        case 'UPDATE_TASK': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                        ...t, ...action.payload.model
                    } : t)
            }
        }
        case 'ADD_TODOLIST': {

            return {...state, [action.payload.todolist.id]: []}
        }
        case 'REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return {...stateCopy}
        }
        case "SET_TODOLISTS": {
            let stateCopy = {...state}
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        case 'SET_TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistID] = action.payload.tasks
            return stateCopy
        }
        default:
            return state
    }


};
export type TasksReducerActionsType =
    removeTaskACType
    | addTaskACType
    | updateTaskACType
    | addTodolistACType
    | removeTodolistACType
    | setTodolistACType
    | setTasksACType;
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>
export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistID
        }
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD_TASK',
        payload: {
            task
        }
    } as const
}
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistID: string) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            id,
            model,
            todolistID
        }
    } as const
}

export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET_TASKS',
        payload: {
            todolistID,
            tasks
        }
    } as const
}

export const getTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    const res = await taskAPI.deleteTask(todolistId, taskId)
    if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todolistId))
    }
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    const res = await taskAPI.createTask(todolistId, title)
    if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item))
    }
}
export type UpdateDomainTaskModelType = {
    title?: string
    status?: TaskStatuses
    description?: string
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch, getState: () => AppRootState) => {
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
            .then(() => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })

    }
}

