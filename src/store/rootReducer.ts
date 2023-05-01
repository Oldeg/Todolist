import {combineReducers} from 'redux';
import {tasks, todoList} from 'features/todolistsList';
import {app} from 'app';
import {auth} from 'features/auth';

export const rootReducer = combineReducers({
    todoLists: todoList.slice.reducer,
    tasks: tasks.slice.reducer,
    app: app.slice.reducer,
    auth: auth.slice.reducer
})