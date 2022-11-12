import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./Reducers/tasksReducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListReducer
} from "./Reducers/todoListReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, todolistsDispatch] = useReducer(todoListReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })

    function removeTask(id: string, todolistID: string) {
        tasksDispatch(removeTaskAC(id, todolistID))
    }

    function addTask(title: string, todolistID: string) {
        tasksDispatch(addTaskAC(title, todolistID))
    }

    function changeStatus(id: string, isDone: boolean, todolistID: string) {

        tasksDispatch(changeStatusAC(id, isDone, todolistID))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {

        tasksDispatch(changeTaskTitleAC(id, newTitle, todolistID))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {

        todolistsDispatch(changeFilterAC(value, todolistId))
    }

    function changeTodolistTitle(id: string, title: string) {

        todolistsDispatch(changeTodolistTitleAC(id, title))
    }


    function removeTodolist(id: string)  {

        todolistsDispatch(removeTodolistAC(id))
        tasksDispatch(removeTodolistAC(id))
    }


    function addTodolist(title: string) {

        tasksDispatch(addTodolistAC(title))
        todolistsDispatch(addTodolistAC(title))


    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '40px 40px 40px 0px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} >
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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
