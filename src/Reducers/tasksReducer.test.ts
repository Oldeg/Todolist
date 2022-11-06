import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    addTaskAC,
    addTasksForNewTodolistAC,
    changeStatusAC,
    changeTaskTitleAC,
    deleteTasksAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReducer";


test('Correct task should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskID1 = v1()
    let taskID2 = v1()
    let taskID3 = v1()
    let taskID4 = v1()
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startState, removeTaskAC(taskID1, todolistId1))
    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1][0].id).toBe(taskID2)

})
test('Task should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskID1 = v1()
    let taskID2 = v1()
    let taskID3 = v1()
    let taskID4 = v1()
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startState, addTaskAC('Presidents', todolistId1))
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][1].id).toBe(taskID1)
    expect(endState[todolistId1][0].title).toBe('Presidents')

})
test('Task status should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskID1 = v1()
    let taskID2 = v1()
    let taskID3 = v1()
    let taskID4 = v1()
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startState, changeStatusAC(taskID1, false, todolistId1))
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][0].isDone).toBe(false)

})
test('Task title should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskID1 = v1()
    let taskID2 = v1()
    let taskID3 = v1()
    let taskID4 = v1()
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startState, changeTaskTitleAC(taskID1, 'Subjects', todolistId1))

    expect(endState[todolistId1][0].title).toBe('Subjects')
    expect(endState[todolistId1][1].title).toBe('JS')

})
test('Tasks should be deleted', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskID1 = v1()
    let taskID2 = v1()
    let taskID3 = v1()
    let taskID4 = v1()
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startState, deleteTasksAC(todolistId2))

    expect(endState[todolistId1]).toBeDefined()
    expect(endState[todolistId2]).not.toBeDefined()


})
test('Array should be added for new todolist', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1()
    let taskID1 = v1()
    let taskID2 = v1()
    let taskID3 = v1()
    let taskID4 = v1()
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    }
    const endState = tasksReducer(startState, addTasksForNewTodolistAC(todolistId3))
    expect(endState[todolistId3]).toBeDefined()
    expect(endState[todolistId3].length).toBe(0)


})