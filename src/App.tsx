import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC, addTasksForNewTodolistAC,
    changeStatusAC,
    changeTaskTitleAC,
    deleteTasksAC,
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

    /* let [todolists, setTodolists] = useState<Array<TodolistType>>([
         {id: todolistId1, title: "What to learn", filter: "all"},
         {id: todolistId2, title: "What to buy", filter: "all"}
     ])*/

    /*let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });*/
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
        //достанем нужный массив по todolistId:
        /*let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        tasksDispatch(removeTaskAC(id, todolistID))
    }

    function addTask(title: string, todolistID: string) {
        /*let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistID];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistID] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой*/
        tasksDispatch(addTaskAC(title, todolistID))
    }

    function changeStatus(id: string, isDone: boolean, todolistID: string) {
        /*//достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistID];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }*/
        tasksDispatch(changeStatusAC(id, isDone, todolistID))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        /*//достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }*/
        tasksDispatch(changeTaskTitleAC(id, newTitle, todolistID))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        /* let todolist = todolists.find(tl => tl.id === todolistId);
         if (todolist) {
             todolist.filter = value;
             setTodolists([...todolists])
         }*/
        todolistsDispatch(changeFilterAC(value, todolistId))
    }

    function changeTodolistTitle(id: string, title: string) {
        /*// найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodolists([...todolists]);
        }*/
        todolistsDispatch(changeTodolistTitleAC(id, title))
    }


    function removeTodolist(id: string) {
        /*// засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id !== id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        todolistsDispatch(removeTodolistAC(id))
        tasksDispatch(deleteTasksAC(id))
    }


    function addTodolist(title: string) {
        /*let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })*/
        let todolistID = v1();
        todolistsDispatch(addTodolistAC(title,todolistID))
        tasksDispatch(addTasksForNewTodolistAC(todolistID))
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

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
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
