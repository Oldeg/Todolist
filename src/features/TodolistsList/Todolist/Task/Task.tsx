import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../API/task-api";


type TaskPropsType = {
    changeTaskTitle: (taskId: string,newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string,status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    todolistId: string
    task:TaskType
}
export const Task = React.memo(({todolistId,task,removeTask,changeTaskStatus,changeTaskTitle}:TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id,todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id,e.currentTarget.checked ? TaskStatuses.Completed: TaskStatuses.New,todolistId)
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue,todolistId)
    },[task.id,todolistId,changeTaskTitle])


    return <li key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed}/>
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
})