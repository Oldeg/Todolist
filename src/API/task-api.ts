import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

//api
export const taskAPI = {
    getTasks(todolistId: string) {

        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
    }
    ,
    createTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
    }
    ,
    updateTask(todolistId: string, model: UpdateTaskModelType, taskID: string) {
        return instance.put<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`, model)
    }
    ,
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }


}

//types
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}
type TaskResponseType<T = TaskType> = {
    data: { item: T }
    resultCode: number
    messages: string[]
    fieldErrors: []
}
export type UpdateTaskModelType = {
    title: string
    status: TaskStatuses
    description: string
    priority: TaskPriorities
    startDate: string
    deadline: string
}