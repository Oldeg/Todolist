import {TasksStateType} from "../App";
import {addTodolistACType, removeTodolistACType, todolistId1, todolistId2} from "./todoListReducer";
import {v1} from "uuid";
const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
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
                    [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistID]]
            }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                        ...t,
                        isDone: action.payload.isDone
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
export const changeStatusAC = (id: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            id,
            isDone,
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

