import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {AppRootState, RootReducerType} from "../app/store";
import {combineReducers} from "redux";
import {tasksReducer} from "../features/tasksReducer";
import {todoListReducer} from "../features/todoListReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/task-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from '../features/Login/authReducer'
import {configureStore} from '@reduxjs/toolkit';
import {HashRouter} from 'react-router-dom';


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: v1(), title: 'Meet', status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            }
        ]
    },
    app: {
        status: 'succeeded',
        error: null,
        initialized: true
    },
    auth: {
        isLoggedIn: true
    }
}
export const storyBook = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
    preloadedState: initialGlobalState
})
export const ReduxStoreProviderDecorator = (story: () => ReactNode) => {
    return <Provider store={storyBook}> {story()} </Provider>

};

export const BrowserRouterDecorator = (story: () => ReactNode) => {
    return <HashRouter>
        {story()}
    </HashRouter>
}