import {TasksStateType} from "../App";
import {v1} from "uuid";
import {newTodolistID} from "./todoListReducer";


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let todolistTasks = state[action.payload.todolistID];
            state[action.payload.todolistID] = todolistTasks.filter(t => t.id !== action.payload.id);
            return {...state}
        }
        case 'ADD_TASK': {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = state[action.payload.todolistID];
            state[action.payload.todolistID] = [task, ...todolistTasks];
            return {...state}
        }
        case 'CHANGE_STATUS': {
            let todolistTasks = state[action.payload.todolistID];
            let task = todolistTasks.find(t => t.id === action.payload.id)
            if(task) {task.isDone = action.payload.isDone}
            return {...state}
        }
        case 'CHANGE_TASK_TITLE': {
            let todolistTasks = state[action.payload.todolistID];
            let task = todolistTasks.find(t => t.id === action.payload.id)
            if(task){task.title = action.payload.newTitle} 
            return {...state}
        }
        case 'DELETE_TASKS': {
            delete state[action.payload.id]
            return {...state}
        }
        case 'ADD_NEW_TASKS_FOR_TODOLIST': {
            return {[newTodolistID]: [], ...state }
        }
        default:
            return state
    }


};
type ActionType = removeTaskACType | addTaskACType | changeStatusACType | changeTaskTitleACType | deleteTasksACType | addTasksForNewTodolistACType;
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusACType= ReturnType<typeof changeStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type deleteTasksACType = ReturnType<typeof deleteTasksAC>
type addTasksForNewTodolistACType = ReturnType<typeof addTasksForNewTodolistAC>
export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistID
        }
    } as const
}
export const addTaskAC = (title:string, todolistID: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistID
        }
    } as const
}
export const changeStatusAC = (id: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            id,
            isDone,
            todolistID
        }
    }as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            id,
            newTitle,
            todolistID
        }
    }as const
}
export const deleteTasksAC = (id:string) => {
    return {
        type: 'DELETE_TASKS',
        payload: {
            id
        }
    }as const
}
export const addTasksForNewTodolistAC = () => {
    return {
        type: 'ADD_NEW_TASKS_FOR_TODOLIST',

    }as const
}