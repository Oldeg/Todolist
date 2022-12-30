import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {tasksReducer, TasksReducerActionsType} from "../features/tasksReducer";
import {todoListReducer, TodolistsReducerActionsType} from "../features/todoListReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/authReducer";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth:authReducer
})

/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;*/

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppActionsType = TodolistsReducerActionsType | TasksReducerActionsType | AuthActionsType | AppReducerActionsType;
export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store