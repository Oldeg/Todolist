import {AnyAction, combineReducers, compose} from "redux";
import {tasksReducer} from "../features/tasksReducer";
import {todoListReducer} from "../features/todoListReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;*/

/*export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))*/
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)

})
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, any>
// @ts-ignore
window.store = store

