import React, {useEffect, useState} from 'react'
import {taskAPI} from "../API/task-api";

export default {
    title: 'TaskAPI'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4e5eb0fb-4857-4d22-8bd9-093ad3b03cbe'
    }
}
export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks("dce03f23-daf1-4720-9971-fd8bec3dbaac").then(
            res => {
                setState(res.data)
            }
        )


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTask("dce03f23-daf1-4720-9971-fd8bec3dbaac", 'Lalala').then(
            res => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask("dce03f23-daf1-4720-9971-fd8bec3dbaac",'Yoyoyo' ,"2c70fbc5-dbc6-469b-93d3-265043ab6144").then(
            res => setState(res.data)
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask("dce03f23-daf1-4720-9971-fd8bec3dbaac", 'PPPPPPPPPPPPPPP',"28b25a22-c186-418e-98a4-70706e7c7c8c").then(
            res => setState(res.data)
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
