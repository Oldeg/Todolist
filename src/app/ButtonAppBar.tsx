import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "components";
import {authSelectors} from 'features/auth';
import {appSelectors} from 'app/index';
import {useTypedDispatch} from 'hooks/useTypedDispatch';
import {useTypedSelector} from 'hooks/useTypedSelector';
import {logOut} from 'features/auth/authActions';

export function ButtonAppBar() {
    const dispatch = useTypedDispatch()
    const status = useTypedSelector(appSelectors.selectStatus)
    const isLoggedIn = useTypedSelector(authSelectors.selectorIsLoggedIn)
    const logOutHandler = React.useCallback(() => {
        dispatch(logOut())
    }, [dispatch])
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
                {status === 'loading' ? <LinearProgress color='secondary' sx={{
                    position: 'fixed',
                    zIndex: '10',
                    width: '100%',
                    top: '64px'
                }}/> : ''}
            </AppBar>
        </Box>
    );
}
