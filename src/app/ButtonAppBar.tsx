import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from "@mui/material/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {logOutTC} from "../features/Login/authReducer";
import {useCallback} from "react";

export function ButtonAppBar() {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootState, string>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    },[])
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <ErrorSnackbar/>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' ? <LinearProgress color='secondary'/> : ''}
            </AppBar>
        </Box>
    );
}
