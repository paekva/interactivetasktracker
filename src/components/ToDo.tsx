import React, {useCallback, useState} from "react";
import './ToDo.css'
import {IconButton, OutlinedInput} from "@material-ui/core";
import {Add} from "@material-ui/icons";

export const ToDo = ():JSX.Element => {
    const [todos, setTodos] = useState([ '1', '2', '3']);
    const [value, setValue] = useState('');

    const onAddPress = useCallback(() => setTodos([...todos, value]), [value, todos]);
    return <div className='todo'>
        <div className='addToTodo'>
            <OutlinedInput
                required
                id="outlined-required"
                label="Add new task"
                onChange={event => setValue(event.currentTarget.value) }
                endAdornment={
                    <IconButton
                        color="primary"
                        aria-label="add an alarm"
                        title='Add new task'
                        onClick={onAddPress}
                    >
                        <Add />
                    </IconButton>
                }
            />

        </div>
        <div className='todoList'>
            {todos.map((el, index) => <div className='todoItem' key={`${index} todos`}>{el}</div>)}
        </div>
    </div>
}