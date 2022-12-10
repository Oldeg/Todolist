import React, {useCallback} from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Store/store";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/tasksReducer";
import {changeFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC} from "./Reducers/todoListReducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./API/task-api";




type PropsType = {
    id: string
    title: string
    filter: FilterValuesType

}

export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC("all", props.id)), [dispatch,props.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC("active", props.id)), [dispatch,props.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC("completed", props.id)), [dispatch,props.id]);
    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.status);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status);
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeStatusAC(taskId, status, todolistId))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    return <div>
        <h3><EditableSpan value={props.title}
                          onChange={useCallback((title) => dispatch(changeTodolistTitleAC(props.id, title)), [dispatch,props.id])}/>

            <IconButton aria-label="delete" onClick={() => dispatch(removeTodolistAC(props.id))}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={useCallback((title) => dispatch(addTaskAC(title, props.id)), [dispatch,props.id])}/>
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


