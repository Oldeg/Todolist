import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,

} from "./tasksReducer";
import {addTodolistAC, removeTodolistAC} from "./todoListReducer";


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
    expect(endState).toEqual({
        [todolistId1]: [
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    })

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
    const endState = tasksReducer(startState, addTaskAC('Juice', todolistId1))
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][1].id).toBe(taskID1)
    expect(endState[todolistId1][0].title).toBe('Juice')
    expect(endState).toEqual({
        [todolistId1]: [
            {id: '123', title: 'Juice' , isDone: false},
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: taskID2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskID3, title: "Milk", isDone: true},
            {id: taskID4, title: "React Book", isDone: true}
        ]
    })

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

    expect(endState[todolistId1][0].isDone).toBe(false)
    expect(endState[todolistId1][1].isDone).toBe(true)


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
    const endState = tasksReducer(startState, changeTaskTitleAC(taskID1, 'React', todolistId1))

    expect(endState[todolistId1][0].title).toBe('React')
    expect(endState[todolistId2][0].title).toBe('Milk')

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
    const endState = tasksReducer(startState, removeTodolistAC(todolistId2))

    expect(endState[todolistId1]).toBeDefined()
    expect(endState[todolistId2]).not.toBeDefined()


})
test('new array should be added when new todolist is added', () => {
        const startState: TasksStateType = {
            'todolistId1': [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false}
            ],
            'todolistId2': [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false}
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
