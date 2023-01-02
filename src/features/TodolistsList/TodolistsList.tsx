import {AppRootState, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../todoListReducer";
import React, {useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) return

        dispatch(fetchTodolistsTC())
    }, []);
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '40px 40px 40px 0px'}}>
            <AddItemForm addItem={(title) => dispatch(addTodolistTC(title))}/>
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