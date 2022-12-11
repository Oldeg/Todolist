import React, {useState} from 'react'
import {taskAPI, TaskPriorities, TaskStatuses} from "../API/task-api";

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
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks = () => {
        taskAPI.getTasks(todolistId).then(
            res => {
                setState(res.data)
            }
        )
    }
    return <div>
        <input type="text" placeholder={'TodolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTasks}>Get tasks</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const createTask = () => {
        taskAPI.createTask(todolistId, title).then(
            res => {
                setState(res.data)
            }
        )
    }
    return <div>
        <input type='text' placeholder={'TodolistID'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={'Task title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={createTask}>Create Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId).then(
            res => setState(res.data)
        )
    }
    return <div>
        <input type="text" placeholder={'TodolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={'TaskId'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {
        taskAPI.updateTask(todolistId, {
            title: title, status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Middle,
            deadline: '', description: ''
        }, taskId).then(
            res => setState(res.data)
        )
    }
    return <div>
        <input type="text" placeholder={'TodolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={'TaskId'} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input type="text" placeholder={'Task title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTask}>Update task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
