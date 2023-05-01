import {v1} from "uuid";
import {tasks} from "features/todolistsList";
import {TaskPriorities, TaskStatuses} from "api/task-api";
import {addTask, deleteTask, getTasks, updateTask} from 'features/todolistsList/todolist/task/tasksActions';
import {addTodolist, fetchTodoLists, removeTodolist} from 'features/todolistsList/todolist/todoListsActions';

let todolistId1: string;
let todolistId2: string;
let taskID1: string;
let taskID2: string;
let taskID3: string;
let taskID4: string;
let startState: tasks.TasksStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    taskID1 = v1()
    taskID2 = v1()
    taskID3 = v1()
    taskID4 = v1()

    startState = {
        [todolistId1]: [
            {
                id: taskID1, title: "HTML&CSS", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: taskID2, title: "JS", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            {
                id: taskID3, title: "Milk", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: taskID4, title: "React Book", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2
            }
        ]
    }

})

test('Correct task should be removed', () => {

    const endState = tasks.slice.reducer(startState, deleteTask.fulfilled({
        id: taskID1,
        todolistID: todolistId1
    }, '', {todolistId: todolistId1, taskId: taskID1}))
    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1][0].id).toBe(taskID2)
    expect(endState).toEqual({
        [todolistId1]: [
            {
                id: taskID2, title: "JS", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            {
                id: taskID3, title: "Milk", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: taskID4, title: "React Book", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2
            }
        ]
    })

})
test('task should be added', () => {

    const endState = tasks.slice.reducer(startState, addTask.fulfilled({


            todoListId: todolistId1, title: 'Juice', status: TaskStatuses.New, order: 0, addedDate: '',
            deadline: '', description: '', priority: TaskPriorities.Low, startDate: '', id: 'exist'


    }, '', {title: 'Juice', todolistId: todolistId1}))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].id).toBe('exist')
    expect(endState[todolistId1][0].title).toBe('Juice')
    expect(endState).toEqual({
        [todolistId1]: [
            {
                id: 'exist', title: 'Juice', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: taskID1, title: "HTML&CSS", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: taskID2, title: "JS", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId1
            }

        ],
        [todolistId2]: [
            {
                id: taskID3, title: "Milk", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: taskID4, title: "React Book", status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: todolistId2
            }
        ]
    })

})
test('task status should be changed', () => {

    const endState = tasks.slice.reducer(startState, updateTask.fulfilled({
        taskId: taskID1,
        domainModel: {status: TaskStatuses.New},
        todolistId: todolistId1
    }, '', {todolistId: todolistId1, taskId: taskID1, domainModel: {status: TaskStatuses.New}}))

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.Completed)


})
test('task title should be changed', () => {

    const endState = tasks.slice.reducer(startState, updateTask.fulfilled({
        taskId: taskID1,
        domainModel: {title: 'React'},
        todolistId: todolistId1
    }, 'requestID', {todolistId: todolistId1, taskId: taskID1, domainModel: {title: 'React'}}))

    expect(endState[todolistId1][0].title).toBe('React')
    expect(endState[todolistId2][0].title).toBe('Milk')

})
test('Tasks should be deleted', () => {

    const endState = tasks.slice.reducer(startState, removeTodolist.fulfilled(todolistId2, 'requestID', todolistId2))

    expect(endState[todolistId1]).toBeDefined()
    expect(endState[todolistId2]).not.toBeDefined()


})
test('new array should be added when new todolist is added', () => {
    const startState: tasks.TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, order: 0,
                addedDate: '', deadline: '', description: '', startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            }
        ]
    }

    const action = addTodolist.fulfilled({id: '1', title: 'title 1', order: 0, addedDate: ''}, 'requestID', 'title 1')

    const endState = tasks.slice.reducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('Empty array should be added when we set todolists', () => {
    const state = [
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ]
    const endState = tasks.slice.reducer({}, fetchTodoLists.fulfilled(state, ''))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
test('Tasks should be added for todolists', () => {
    const state = startState[todolistId1]
    const endState = tasks.slice.reducer({}, getTasks.fulfilled({todolistId: todolistId1, tasks: state}, '', todolistId1))


    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId1][1].title).toBe('JS')
})
