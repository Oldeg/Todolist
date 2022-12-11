import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

import {addTodolistTC, fetchTodolistsTC, TodolistDomainType,} from "./Reducers/todoListReducer";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./Store/store";


function App() {


    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '40px 40px 40px 0px'}}>
                    <AddItemForm addItem={useCallback((title) => dispatch(addTodolistTC(title)), [dispatch])}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                    />
                                </Paper>

                            </Grid>

                        })
                    }
                </Grid>


            </Container>

        </div>
    );
}

export default App;
