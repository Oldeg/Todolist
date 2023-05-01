import {AppRootState} from 'store/store';
export const selectTasks = (state: AppRootState) => state.tasks
export const selectTodoLists = (state: AppRootState) => state.todoLists

