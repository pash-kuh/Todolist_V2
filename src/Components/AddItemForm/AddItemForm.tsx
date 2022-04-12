import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

type AddItemFormPropsType = {
    color: 'info' | 'secondary'
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function ({addItem, color}: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItems = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItems();
        }
    }

    return (
        <div style={{display: "flex"}}>
            <TextField
                variant="outlined"
                error={!!error}
                value={title}
                color={color}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label="Title"
                helperText={error}
                inputProps={{ maxLength: 20 }}
            />
            <IconButton color="inherit" size={"large"} onClick={addItems}>
                <AddBoxOutlinedIcon style={{width: "30px", height: "30px"}} color={'inherit'}/>
            </IconButton>
        </div>
    )
})