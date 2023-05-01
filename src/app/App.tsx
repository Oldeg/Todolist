import React, {useEffect} from 'react';
import './App.css';
import {ButtonAppBar} from "./ButtonAppBar";
import {CircularProgress} from "@mui/material";
import {TodoListsList} from "features/todolistsList/TodoListsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "features/auth/Login";
import {selectInitialize} from './selectors';
import {useTypedSelector} from 'hooks/useTypedSelector';
import {initializeApp} from 'app/appActions';
import {useActions} from 'hooks/useActions';
import {appActions} from 'app/index';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const isInitialized = useTypedSelector(selectInitialize)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }

    }, [demo])
    if (!isInitialized) {

        return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}}/>
    }
    return (

        <div className="App">
            <ButtonAppBar/>
            <div>
                <Routes>
                    <Route path={'/'} element={<TodoListsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>

        </div>

    );
}

export default App;
