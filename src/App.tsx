import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

import {
    addTodolistAC, TodolistDomainType,
} from "./Reducers/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Store/store";







function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '40px 40px 40px 0px'}}>
                    <AddItemForm addItem={useCallback((title) =>dispatch(addTodolistAC(title)),[dispatch])}/>
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
