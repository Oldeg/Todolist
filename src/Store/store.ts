import {combineReducers, compose, createStore} from "redux";
import {tasksReducer} from "../Reducers/tasksReducer";
import {todoListReducer} from "../Reducers/todoListReducer";

declare global {
    interface  Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof  compose;
    }
}

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers())

export type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store