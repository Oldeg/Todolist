import React, {useEffect} from 'react';
import './App.css';
import {ButtonAppBar} from "./ButtonAppBar";
import {CircularProgress, Container} from "@mui/material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./store";
import {initializeAppTC} from "./app-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useAppDispatch()
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.initialized)

    useEffect(() => {

        dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {

        return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}}/>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <ButtonAppBar/>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>

            </div>
        </BrowserRouter>
    );
}

export default App;
