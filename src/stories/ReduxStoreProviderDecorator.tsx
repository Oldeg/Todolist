import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "../app/store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/tasksReducer";
import {todoListReducer} from "../features/todoListReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/task-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleWare from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus:'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0,  entityStatus:'idle'}
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
        status: 'idle',
        error: null
    }
}
export const storyBook = legacy_createStore(rootReducer,initialGlobalState, applyMiddleware(thunkMiddleWare))
export const ReduxStoreProviderDecorator = (story: () => ReactNode) => {
    return <Provider store={storyBook}> {story()} </Provider>

};

