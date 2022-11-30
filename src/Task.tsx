

import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskTitle: (taskId: string,newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string,isDone:boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    todolistId: string
    task:TaskType
}
export const Task = React.memo(({todolistId,task,removeTask,changeTaskStatus,changeTaskTitle}:TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id,todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id,e.currentTarget.checked,todolistId)
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue,todolistId)
    },[task.id,todolistId])


    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
})