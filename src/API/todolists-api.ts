import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

//api
export const todolistAPI = {
    getTodoLists() {

        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
    },
    updateTodoList(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    }


}

//types
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FieldsErrorsType = { field: string, error: string };
export type ResponseType<D = {}> = {
    fieldsErrors?: Array<FieldsErrorsType>
    resultCode: number
    messages: Array<string>
    data: D
}