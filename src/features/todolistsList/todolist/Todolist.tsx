import React, {FC, useCallback, useEffect} from "react";

import {AddItemForm, EditableSpan} from "components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import {FilterValuesType, TodolistDomainType,} from "features/todolistsList/todolist/todoListReducer";
import {Task} from "./task/Task";
import {selectors, tasksActions, todoListsActions} from "features/todolistsList";
import {useTypedSelector} from "hooks/useTypedSelector";
import {useActions} from "hooks/useActions";
import Paper from "@mui/material/Paper";
import {useTypedDispatch} from "hooks/useTypedDispatch";

type PropsType = {
    todolist: TodolistDomainType;

    demo?: boolean;
};

export const Todolist: FC<PropsType> = React.memo(
    ({demo = false, todolist}) => {
        const {id, filter, title, entityStatus} = todolist;
        const allTasks = useTypedSelector(selectors.selectTasks);
        const tasks = allTasks[id];
        const {changeTodolistFilter, changeTodolist, removeTodolist} =
            useActions(todoListsActions);
        const dispatch = useTypedDispatch();
        useEffect(() => {
            if (demo) return;
        }, [demo]);
        const onButtonFilterClickHandler = useCallback(
            (value: FilterValuesType) =>
                changeTodolistFilter({
                    value,
                    todolistId: id,
                }),
            [id, changeTodolistFilter]
        );
        let tasksForTodolist = tasks;

        if (filter === "active") {
            tasksForTodolist = tasks.filter((t) => !t.status);
        }
        if (filter === "completed") {
            tasksForTodolist = tasks.filter((t) => t.status);
        }

        const addTaskHandler = useCallback(
            async (title: string, setTitle: (value: string) => void) => {
                let thunk = tasksActions.addTask({title: title, todolistId: id})
                const resultAction = await dispatch(thunk)

                if (tasksActions.addTask.rejected.match(resultAction)) {
                    if (resultAction.payload?.errors?.length) {
                        const errorMessage = resultAction.payload?.errors[0]

                    }
                } else {
                    setTitle('')
                }
            },
            [id, dispatch]
        );

        const changeTodolistHandler = useCallback(
            (title: string) =>
                changeTodolist({
                    id: id,
                    title,
                }),
            [id, changeTodolist]
        );
        const removeTodolistHandler = () => removeTodolist(id);
        const filterButton = (buttonFilter: FilterValuesType, text: string) => {
            return (
                <Button
                    variant={filter === buttonFilter ? "outlined" : "contained"}
                    color="primary"
                    onClick={() => onButtonFilterClickHandler(buttonFilter)}
                    sx={{marginLeft: "4px"}}
                >
                    {text}
                </Button>
            );
        };
        return (
            <Paper style={{padding: "10px", position: "relative"}}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistHandler}/>
                </h3>
                <IconButton
                    aria-label="delete"
                    onClick={removeTodolistHandler}
                    disabled={entityStatus === "loading"}
                    style={{position: "absolute", right: "5px", top: "5px"}}
                >
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm
                    addItem={addTaskHandler}
                    disabled={entityStatus === "loading"}
                />
                <ul style={{listStyleType: "none", padding: "0px", flex: "1 1"}}>
                    {tasksForTodolist.map((t) => (
                        <Task key={t.id} todolistId={id} task={t}/>
                    ))}
                </ul>
                <div>
                    {filterButton("all", "All")}
                    {filterButton("active", "Active")}
                    {filterButton("completed", "Completed")}
                </div>
            </Paper>
        );
    }
);
