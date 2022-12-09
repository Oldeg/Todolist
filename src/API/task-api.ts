import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

type GetTaskType = {
    error: null | string
    items: [{ id: string, title: string, description: string | null }]
    totalCount: number
}
type CreateTask = {
    data: {
        item: {
            description: string
            title: string
            completed: boolean
            status: number
            priority: number
            startDate: string
            deadline: string
            id: string
            todoListId: string
            order: number
            addedDate: string
        }
    }
    resultCode: number
    messages: string[]
}
type UpdateTask = {
    data: {
        item: {
            description: string
            title: string
            completed: boolean
            status: number
            priority: number
            startDate: string
            deadline: string
            id: string
            todoListId: string
            order: number
            addedDate: string
        }
    }
    resultCode: number
    messages: string[]
}
type DeleteTask = {
    resultCode: number
    messages: string[],
    data: {}
}
export const taskAPI =
    {
        getTasks(todolistId: string) {

            return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
        }
        ,
        createTask(todolistId: string, title: string) {
            return instance.post<CreateTask>(`todo-lists/${todolistId}/tasks`, {title: title})
        }
        ,
        updateTask(todolistId: string, title: string, taskId: string) {
            return instance.put<UpdateTask>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
        }
        ,
        deleteTask(todolistId: string, title: string, taskId: string) {
            return instance.delete<DeleteTask>(`todo-lists/${todolistId}/tasks/${taskId}`)
        }


    }