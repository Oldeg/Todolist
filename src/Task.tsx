import {useDispatch} from "react-redux";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/tasksReducer";
import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task:TaskType
}
export const Task = React.memo(({todolistId,task}:TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(task.id, e.currentTarget.checked, todolistId))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    },[task.id,todolistId])


    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
})