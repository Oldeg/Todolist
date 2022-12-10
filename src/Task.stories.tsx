import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';


import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "./API/task-api";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators:[ ReduxStoreProviderDecorator],
    args:{
        changeTaskTitle: action('ChangeTaskTitle'),
        changeTaskStatus: action('ChangeTaskStatus'),
        removeTask: action('RemoveTask'),
        task: {id:'abcd', title:'Task',status: TaskStatuses.Completed,order:0,
            addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
            todoListId: 'todolistId1'},
        todolistId:'12345',


    }


} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id:'abcd', title:'Task',status:TaskStatuses.New, order:0,
        addedDate:'', deadline:'', description:'', startDate:'', priority:TaskPriorities.Low,
        todoListId: 'todolistId1' },
};



