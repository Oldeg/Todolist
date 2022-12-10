import {v1} from "uuid";
import {TodoListType} from "../API/todolists-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}
const initialState: Array<TodolistDomainType> = [

]

export const todoListReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CHANGE_FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'REMOVE_TODOLIST' :
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD_TODOLIST': {

            return [{id: action.payload.todolistID, title: action.payload.title, filter: 'all', addedDate: '', order:0}, ...state]
        }
        default:
            return state
    }
};
type ActionType = changeFilterACType | changeTodolistTitleACType | removeTodolistACType | addTodolistACType;
type changeFilterACType = ReturnType<typeof changeFilterAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            value,
            todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id,
            title
        }
    } as const
}
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        }

    } as const
}
export const addTodolistAC = (title: string) => {

    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            todolistID: v1()
        }
    } as const
}
