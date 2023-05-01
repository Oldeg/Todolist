import React, {useCallback, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "components";
import {Todolist} from "./todolist/Todolist";
import {Navigate} from "react-router-dom";
import {authSelectors} from 'features/auth';
import {selectTodoLists} from 'features/todolistsList/selectors';
import {useTypedDispatch} from 'hooks/useTypedDispatch';
import {useTypedSelector} from 'hooks/useTypedSelector';
import {useActions} from 'hooks/useActions';
import {todoListsActions} from 'features/todolistsList/index';


type PropsType = {
    demo?: boolean
}
export const TodoListsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useTypedDispatch();
    const todoLists = useTypedSelector(selectTodoLists)
    const isLoggedIn = useTypedSelector(authSelectors.selectorIsLoggedIn)
    const {fetchTodoLists} = useActions(todoListsActions)
    const addTodoList = useCallback(async (title: string, setTitle: (value: string) => void) => {
        const result = await dispatch(todoListsActions.addTodolist(title))
        if (todoListsActions.addTodolist.rejected.match(result)) {
            return
        } else {
            setTitle('')
        }
    }, [dispatch])
    useEffect(() => {
        if (demo || !isLoggedIn) return
        if (todoLists.length === 0) {
            fetchTodoLists()
        }

    }, [demo, isLoggedIn, dispatch, fetchTodoLists]);
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <div style={{overflowX: 'scroll', padding: '0px 50px', minHeight: '91vh'}}>
        <Grid container style={{padding: '40px 40px 40px 0px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: 'nowrap'}}>
            {
                todoLists.map(tl => {

                    return <Grid item key={tl.id}>
                        <div style={{width: '310px'}}>
                            <Todolist
                                todolist={tl}
                                demo={demo}
                            />
                        </div>

                    </Grid>

                })
            }
        </Grid>
    </div>

}