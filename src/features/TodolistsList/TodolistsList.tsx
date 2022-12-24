import {AppRootState, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../todoListReducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)
    useEffect(() => {
        if (demo) return

        dispatch(fetchTodolistsTC())
    }, [])

    return <>
        <Grid container style={{padding: '40px 40px 40px 0px'}}>
            <AddItemForm addItem={useCallback((title) => dispatch(addTodolistTC(title)), [dispatch])}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                demo={demo}
                            />
                        </Paper>

                    </Grid>

                })
            }
        </Grid>
    </>

}