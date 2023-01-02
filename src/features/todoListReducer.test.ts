import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
    FilterValuesType,
    todoListReducer, setTodolistAC, changeTodolistEntityStatusAC
} from './todoListReducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../app/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})
test('correct todolist should be removed', () => {


    const endState = todoListReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";

    const endState = todoListReducer(startState, addTodolistAC({
        todolist: {
            id: '1',
            title: newTodolistTitle,
            order: 0,
            addedDate: ''
        }
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, changeTodolistTitleAC({id: action.id, title: action.title}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, changeFilterAC({value: action.filter, todolistId: action.id}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

    const endState = todoListReducer([], setTodolistAC({todolists: startState}))

    expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {


    let newStatus: RequestStatusType = "loading";

    const endState = todoListReducer(startState, changeTodolistEntityStatusAC({
        entityStatus: newStatus,
        todolistID: todolistId1
    }));

    expect(endState[0].entityStatus).toBe("loading");
    expect(endState[1].entityStatus).toBe("idle");

});
