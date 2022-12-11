import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {TasksReducerActionsType, tasksReducer} from "../Reducers/tasksReducer";
import {todoListReducer, TodolistsReducerActionsType} from "../Reducers/todoListReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppActionsType = TodolistsReducerActionsType | TasksReducerActionsType;
export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store