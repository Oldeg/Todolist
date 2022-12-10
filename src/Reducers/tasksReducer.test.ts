import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
} from "./tasksReducer";
import {addTodolistAC, removeTodolistAC} from "./todoListReducer";
import {TaskPriorities, TaskStatuses} from "../API/task-api";

let todolistId1: string;
let todolistId2:string;
let taskID1:string;
let taskID2:string;
let taskID3:string;
let taskID4:string;
let startState: TasksStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    taskID1 = v1()
    taskID2 = v1()
    taskID3 = v1()
    taskID4 = v1()

    startState = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", status: TaskStatuses.Completed, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: todolistId1},
            {id: taskID2, title: "JS", status: TaskStatuses.Completed, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: todolistId1}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", status: TaskStatuses.Completed, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: todolistId2},
            {id: taskID4, title: "React Book", status: TaskStatuses.Completed, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: todolistId2}
        ]
    }

})

test('Correct task should be removed', () => {

    const endState = tasksReducer(startState, removeTaskAC(taskID1, todolistId1))
    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1][0].id).toBe(taskID2)
    expect(endState).toEqual({
        [todolistId1]: [
            {id: taskID2, title: "JS", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", status: TaskStatuses.Completed,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2},
            {id: taskID4, title: "React Book", status: TaskStatuses.Completed,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2}
        ]
    })

})
test('Task should be added', () => {

    const endState = tasksReducer(startState, addTaskAC('Juice', todolistId1))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][1].id).toBe(taskID1)
    expect(endState[todolistId1][0].title).toBe('Juice')
    expect(endState).toEqual({
        [todolistId1]: [
            {id: endState[todolistId1][0].id, title: 'Juice',status: TaskStatuses.New,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1},
            {id: taskID1, title: "HTML&CSS", status: TaskStatuses.Completed,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1},
            {id: taskID2, title: "JS", status: TaskStatuses.Completed,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", status: TaskStatuses.Completed,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2},
            {id: taskID4, title: "React Book", status: TaskStatuses.Completed,order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2}
        ]
    })

})
test('Task status should be changed', () => {

    const endState = tasksReducer(startState, changeStatusAC(taskID1, TaskStatuses.New, todolistId1))

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.Completed)


})
test('Task title should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC(taskID1, 'React', todolistId1))

    expect(endState[todolistId1][0].title).toBe('React')
    expect(endState[todolistId2][0].title).toBe('Milk')

})
test('Tasks should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC(todolistId2))

    expect(endState[todolistId1]).toBeDefined()
    expect(endState[todolistId2]).not.toBeDefined()


})
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status:TaskStatuses.New, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: 'todolistId1'},
            {id: '2', title: 'JS', status:TaskStatuses.Completed, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: 'todolistId1'},
            {id: '3', title: 'React', status:TaskStatuses.New, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: 'todolistId1'}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status:TaskStatuses.New, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: 'todolistId2'},
            {id: '2', title: 'milk', status:TaskStatuses.Completed, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: 'todolistId2'},
            {id: '3', title: 'tea', status:TaskStatuses.New, order:0,
                addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
                todoListId: 'todolistId2'}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
