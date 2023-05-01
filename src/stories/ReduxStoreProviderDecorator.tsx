import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {AppRootState, RootReducerType} from "store/store";
import {combineReducers} from "redux";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "api/task-api";
import {app} from "app";
import thunkMiddleware from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import {HashRouter} from 'react-router-dom';
import {tasks, todoList} from 'features/todolistsList';
import {auth} from 'features/auth';


const rootReducer: RootReducerType = combineReducers({
    tasks: tasks.slice.reducer,
    todoLists: todoList.slice.reducer,
    app: app.slice.reducer,
    auth: auth.slice.reducer
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