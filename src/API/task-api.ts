import axios from "axios";

const instance = axios.create({
    withCredentials:true,
    headers:{'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})
export const taskAPI = {
    getTasks(todolistId: string) {

        return instance.get<>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, title: string,taskId: string){
        return instance.put<>(`todo-lists/${todolistId}/tasks/${taskId}`, {title:title})
    },
    deleteTask(todolistId: string, title: string,taskId: string){
        return instance.delete<>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }


}