import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "../Store/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../Reducers/tasksReducer";
import { todoListReducer} from "../Reducers/todoListReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

const initialGlobalState = {
    todoLists: [
        {id:'todolistId1', title:'What to learn', filter: 'all'},
        {id:'todolistId2', title:'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Meet', isDone: true}
        ]
    }
}
export const storyBook = legacy_createStore(rootReducer, initialGlobalState as AppRootState)
export const ReduxStoreProviderDecorator = (story:() => ReactNode) => {
    return <Provider store={storyBook}> {story()} </Provider>

};

