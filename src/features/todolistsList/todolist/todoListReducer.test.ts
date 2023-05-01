import {todoListsActions, todoList} from 'features/todolistsList';
import {v1} from 'uuid';
import {RequestStatusType} from "app/app-reducer";
import {
    addTodolist,
    changeTodolist,
    fetchTodoLists,
    removeTodolist
} from 'features/todolistsList/todolist/todoListsActions';

let todolistId1: string;
let todolistId2: string;
let startState: Array<todoList.TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})
test('correct todolist should be removed', () => {


    const endState = todoList.slice.reducer(startState, removeTodolist.fulfilled(todolistId1, 'requestID', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {


    let newTodolistTitle = "New todolist";

    const endState = todoList.slice.reducer(startState, addTodolist.fulfilled({
        id: '1',
        title: newTodolistTitle,
        order: 0,
        addedDate: ''
    }, 'requestID', newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {


    let newTodolistTitle = "New todolist";


    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoList.slice.reducer(startState, changeTodolist.fulfilled({
        id: action.id,
        title: action.title
    }, 'requestId', {id: action.id, title: action.title}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {


    let newFilter: todoList.FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoList.slice.reducer(startState,todoListsActions.changeTodolistFilter({value: action.filter, todolistId: action.id}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

    const endState = todoList.slice.reducer([], fetchTodoLists.fulfilled(startState, ''))

    expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {


    let newStatus: RequestStatusType = "loading";

    const endState = todoList.slice.reducer(startState, todoListsActions.changeTodolistEntityStatus({
        entityStatus: newStatus,
        todolistID: todolistId1
    }));

    expect(endState[0].entityStatus).toBe("loading");
    expect(endState[1].entityStatus).toBe("idle");

});
