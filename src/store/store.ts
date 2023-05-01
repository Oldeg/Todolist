import {compose} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {rootReducer} from 'store/rootReducer';


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunkMiddleware]

})


export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<RootReducerType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, any>
// @ts-ignore
window.store = store

if (process.env.NODE_ENV !== 'development' && module.hot) {
    module.hot.accept('store/rootReducer', () => store.replaceReducer)
}