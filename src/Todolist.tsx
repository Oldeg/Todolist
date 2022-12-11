import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./Store/store";
import {addTaskTC, deleteTaskTC, getTasksTC, updateTaskTC,} from "./Reducers/tasksReducer";
import {changeFilterAC, changeTodolistTC, FilterValuesType, removeTodolistTC} from "./Reducers/todoListReducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./API/task-api";


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType

}

export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC("all", props.id)), [dispatch, props.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC("active", props.id)), [dispatch, props.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC("completed", props.id)), [dispatch, props.id]);
    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.status);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status);
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title:newTitle}))
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }
    return <div>
        <h3><EditableSpan value={props.title}
                          onChange={useCallback((title) => dispatch(changeTodolistTC(props.id, title)), [dispatch, props.id])}/>

            <IconButton aria-label="delete" onClick={() => dispatch(removeTodolistTC(props.id))}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={useCallback((title) => dispatch(addTaskTC(title, props.id)), [dispatch, props.id])}/>
        <ul>


            {
                tasksForTodolist.map(t => <Task key={t.id}
                                                todolistId={props.id}
                                                task={t}
                                                changeTaskStatus={changeTaskStatus}
                                                changeTaskTitle={changeTaskTitle}
                                                removeTask={removeTask}/>)
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="success"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error"
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
})


