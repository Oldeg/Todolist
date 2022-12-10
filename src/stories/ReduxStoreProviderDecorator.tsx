import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "../Store/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer, TasksStateType} from "../Reducers/tasksReducer";
import {TodolistDomainType, todoListReducer} from "../Reducers/todoListReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/task-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})
type initialGlobalStateType = {
    todoLists: TodolistDomainType[]
    tasks: TasksStateType
}
const initialGlobalState: initialGlobalStateType = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
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
    }
}
export const storyBook = legacy_createStore(rootReducer, initialGlobalState as AppRootState)
export const ReduxStoreProviderDecorator = (story: () => ReactNode) => {
    return <Provider store={storyBook}> {story()} </Provider>

};

