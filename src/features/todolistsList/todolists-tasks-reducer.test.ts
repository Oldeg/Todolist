import {tasks,todoList} from "features/todolistsList"
import {addTodolist} from 'features/todolistsList/todolist/todoListsActions';

test('ids should be equals', () => {
    const startTasksState: tasks.TasksStateType = {}
    const startTodolistsState: Array<todoList.TodolistDomainType> = []

    const action = addTodolist.fulfilled({

        id: '1', title: 'title 1',
        order: 0,
        addedDate: ''

    }, 'requestID', 'title 1')

    const endTasksState = tasks.slice.reducer(startTasksState, action)
    const endTodolistsState = todoList.slice.reducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})
