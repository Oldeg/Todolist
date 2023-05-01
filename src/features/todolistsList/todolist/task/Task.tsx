import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "api/task-api";
import {useActions} from 'hooks/useActions';
import {tasksActions} from 'features/todolistsList';


type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo(({todolistId, task}: TaskPropsType) => {
    const {updateTask, deleteTask} = useActions(tasksActions)

    const removeTask = (taskId: string, todolistId: string) => {
        deleteTask({todolistId, taskId})
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId,
            taskId: task.id,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        updateTask({todolistId, taskId: task.id, domainModel: {title: newTitle}})
    }, [task.id, todolistId,updateTask])


    return <li key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}
        style={{display: 'flex', alignItems:'flex-start', marginBottom: '5px', position:'relative', width: '100%'}}>
        <Checkbox onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed}/>
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={() => removeTask(task.id, todolistId)}>
            <DeleteIcon />
        </IconButton>
    </li>
})