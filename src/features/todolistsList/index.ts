import * as tasks from './todolist/task/tasksReducer'
import * as todoList from './todolist/todoListReducer'
import * as tasksAsyncActions from './todolist/task/tasksActions'
import * as todoListsAsyncActions from './todolist/todoListsActions'
import * as selectors from './selectors'

const  todoListsActions = {
    ...todoListsAsyncActions,
    ...todoList.slice.actions,

}
const tasksActions = {
    ...tasksAsyncActions,
    ...tasks.slice.actions
}
export {
    todoList,
    tasks,
    tasksActions,
    todoListsActions,
    selectors
}