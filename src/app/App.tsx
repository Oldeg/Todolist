import React from 'react';
import './App.css';
import {ButtonAppBar} from "./ButtonAppBar";
import {Container} from "@mui/material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

type PropsType = {
    demo?: boolean
}
function App({demo = false}:PropsType) {


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>

        </div>
    );
}

export default App;
