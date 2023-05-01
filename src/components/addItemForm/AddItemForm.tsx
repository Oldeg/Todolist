import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string, setTitle: (value: string) => void) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title, setTitle);
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

    return <div style={{marginLeft: '4px', display: 'flex', justifyContent: 'space-between'}}>
        <TextField
            id="outlined-basic"
            label={error ? "Title is required!" : 'Type something'}
            variant="outlined"
            size='small'
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            disabled={props.disabled}
        />
        <Button variant="contained"
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px', marginLeft: '10px'}}
                onClick={addItem} disabled={props.disabled}>+</Button>


    </div>
})
