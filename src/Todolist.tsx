import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Store/store";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/tasksReducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Reducers/todoListReducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType

}

export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const onAllClickHandler = () => dispatch(changeFilterAC("all", props.id));
    const onActiveClickHandler = () => dispatch(changeFilterAC("active", props.id));
    const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", props.id));
    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={(title) => dispatch(changeTodolistTitleAC(props.id,title))}/>

            <IconButton aria-label="delete" onClick={() => dispatch(removeTodolistAC(props.id))}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))}/>
        <ul>


            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeStatusAC(t.id, e.currentTarget.checked, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
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
}


