import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../Reducers/tasksReducer";
import {todoListReducer} from "../Reducers/todoListReducer";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store