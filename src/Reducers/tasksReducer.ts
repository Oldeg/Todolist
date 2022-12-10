import {addTodolistACType, removeTodolistACType} from "./todoListReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../API/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(task => task.id !== action.payload.id)
            }
        }
        case 'ADD_TASK': {

            return {
                ...state, [action.payload.todolistID]:
                    [{
                        id: v1(), title: action.payload.title, status: TaskStatuses.New, order: 0,
                        addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                        todoListId: action.payload.todolistID
                    }, ...state[action.payload.todolistID]]
            }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                        ...t,
                        status: action.payload.status
                    } : t)
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                        ...t,
                        title: action.payload.newTitle
                    } : t)
            }
        }
        case 'ADD_TODOLIST': {

            return {...state, [action.payload.todolistID]: []}
        }
        case 'REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return {...stateCopy}
        }
        default:
            return state
    }


};
type ActionType =
    removeTaskACType
    | addTaskACType
    | changeStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType;
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistID
        }
    } as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistID
        }
    } as const
}
export const changeStatusAC = (id: string, status: TaskStatuses, todolistID: string) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            id,
            status,
            todolistID
        }
    } as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            id,
            newTitle,
            todolistID
        }
    } as const
}

