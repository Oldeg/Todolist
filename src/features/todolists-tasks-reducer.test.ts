import {addTodolistTC, TodolistDomainType, todoListReducer} from "./todoListReducer";
import {tasksReducer, TasksStateType} from "./tasksReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistTC.fulfilled({

        id: '1', title: 'title 1',
        order: 0,
        addedDate: ''

    }, 'requestID', 'title 1')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})
