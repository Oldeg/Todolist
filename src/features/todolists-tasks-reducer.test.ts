import {addTodolistAC, TodolistDomainType, todoListReducer} from "./todoListReducer";
import {tasksReducer, TasksStateType} from "./tasksReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({
        todolist: {
            id: '1', title: 'title 1',
            order: 0,
            addedDate: ''
        }
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
