import React, {useEffect, useState} from 'react'

import {todolistAPI} from "../API/todolists-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoLists().then(
            res => {
                setState(res.data)
            }
        )


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodoLists('What to buy').then(
            res => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodoList("e323dba0-0778-481c-9e74-9c0b542fa29e").then(
            res => setState(res.data)
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodoList("d6340337-7d84-4480-bdee-f7ecaa129a1a", 'Hahahaha').then(
            res => setState(res.data)
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
