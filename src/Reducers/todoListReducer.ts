import {todolistAPI, TodoListType} from "../API/todolists-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}
const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state = initialState, action: TodolistsReducerActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CHANGE_FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.id)
        }

        case 'ADD_TODOLIST': {
                const todolist:TodolistDomainType = {...action.payload.todolist, filter: "all"}

            return [...state, todolist]
        }
        case 'SET_TODOLISTS': {
            return action.payload.todolists.map(tl => {
                    return {
                        ...tl, filter: "all"
                    }
                }
            )
        }
        default:
            return state
    }
};
export type TodolistsReducerActionsType =
    changeFilterACType
    | changeTodolistTitleACType
    | removeTodolistACType
    | addTodolistACType
    | setTodolistACType;
type changeFilterACType = ReturnType<typeof changeFilterAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>
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
export const addTodolistAC = (todolist: TodoListType) => {

    return {
        type: 'ADD_TODOLIST',
        payload: {
            todolist
        }
    } as const
}
export const setTodolistAC = (todolists: Array<TodoListType>) => {

    return {
        type: 'SET_TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodoList(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodoLists(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.items))
            })
    }
}
export const changeTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodoList(id,title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id,title))
            })
    }
}