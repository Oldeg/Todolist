import axios from "axios";
import {ResponseType} from './todolists-api'
const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

//api
export const authAPI = {
    login(params:LoginParamsType){
        return instance.post<ResponseType<{userId:number}>>('auth/login',params)
    },
    me(){
        return instance.get<ResponseType<{id:number,email:string, login:string}>>('auth/me')
    },
    logOut () {
        return instance.delete<ResponseType<{userId:number}>>('auth/login')
    }

}

//types
export type LoginParamsType = {
    email:string
    password:string
    rememberMe: boolean
    captcha?: string
}