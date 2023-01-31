import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from '../../../components/addItemForm/AddItemForm';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../../app/store";
import {addTaskTC, deleteTaskTC, updateTaskTC,} from "../../tasksReducer";
import {changeFilterAC, changeTodolistTC, removeTodolistTC, TodolistDomainType} from "../../todoListReducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../API/task-api";


type PropsType = {
    todolist: TodolistDomainType

    demo?: boolean

}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolist.id])

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) return
    }, [demo])

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC({
        value: "all",
        todolistId: props.todolist.id
    })), [dispatch, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC({
        value: "active",
        todolistId: props.todolist.id
    })), [dispatch, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC({
        value: "completed",
        todolistId: props.todolist.id
    })), [dispatch, props.todolist.id]);
    let tasksForTodolist = tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.status);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status);
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC({todolistId, taskId, domainModel: {title: newTitle}}))
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC({todolistId, taskId, domainModel: {status: status}}))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC({todolistId, taskId}))
    }
    return <div>
        <h3><EditableSpan value={props.todolist.title}
                          onChange={useCallback((title) => dispatch(changeTodolistTC({
                              id: props.todolist.id,
                              title
                          })), [dispatch, props.todolist.id])}/>

            <IconButton aria-label="delete" onClick={() => dispatch(removeTodolistTC(props.todolist.id))}
                        disabled={props.todolist.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm
            addItem={useCallback((title) => dispatch(addTaskTC({
                title,
                todolistId: props.todolist.id
            })), [dispatch, props.todolist.id])}
            disabled={props.todolist.entityStatus === 'loading'}/>
        <ul>


            {
                tasksForTodolist.map(t => <Task key={t.id}
                                                todolistId={props.todolist.id}
                                                task={t}
                                                changeTaskStatus={changeTaskStatus}
                                                changeTaskTitle={changeTaskTitle}
                                                removeTask={removeTask}/>)
            }
        </ul>
        <div>
            <Button variant={props.todolist.filter === 'all' ? "outlined" : "contained"} color="secondary"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.todolist.filter === 'active' ? "outlined" : "contained"} color="success"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.todolist.filter === 'completed' ? "outlined" : "contained"} color="error"
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
})


