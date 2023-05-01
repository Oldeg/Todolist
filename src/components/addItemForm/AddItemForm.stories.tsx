import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from '@storybook/react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {ReduxStoreProviderDecorator} from "stories/ReduxStoreProviderDecorator";

export default {
    title: 'todolist/AddItemForm Component',
    component: AddItemForm,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AddItemForm>;

const TemplateWithErrors: ComponentStory<typeof AddItemForm> = (args) => {
    {

        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>("Title is required")

        const addItem = () => {
            if (title.trim() !== "") {
                args.addItem(title, setTitle);
                setTitle("");
            } else {
                setError("Title is required");
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null);
            }
            if (e.charCode === 13) {
                addItem();
            }
        }

        return <div>
            <TextField
                id="outlined-basic"
                label={error ? "Title is required!" : 'Type something'}
                variant="outlined"
                size='small'
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
            />
            <Button variant="contained"
                    style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                    onClick={addItem}>+</Button>


        </div>
    }
}
const TemplateDisabled: ComponentStory<typeof AddItemForm> = () => {
    {


        return <div>
            <TextField
                id="outlined-basic"
                label={'Type something'}
                variant="outlined"
                size='small'
                disabled={true}

            />
            <Button variant="contained"
                    style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                    disabled={true}>+</Button>


        </div>
    }
}

export const AddItemFormWithError = TemplateWithErrors.bind({});

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>
export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    addItem: action('Button was clicked')
};
export const AddItemFormDisabled = TemplateDisabled.bind({});

