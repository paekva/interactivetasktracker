import React, {useCallback, useState} from "react";
import './ToDo.css'
import {IconButton, OutlinedInput} from "@material-ui/core";
import {Add, } from "@material-ui/icons";
import {todoDroppableId} from "./extra/dndUtils";
import {ListWrapper} from "./common/ListWrapper";
import {ItemData} from "./extra/types";

export const ToDo = (props: {todos: ItemData[], addNewTodo: (value: string) => void, deleteToDo: (value: string) => void}):JSX.Element => {
    const [value, setValue] = useState('');
    const { todos , deleteToDo, addNewTodo} = props;

    const onAdd = useCallback(() => addNewTodo(value) ,[ addNewTodo, value]);
    const onDelete = useCallback((event) => {
        const name = event.currentTarget.name;
        deleteToDo(name);
    } ,[ deleteToDo ]);
    return <div className='todo'>
        <div className='addToTodo'>
            <div className='smallTitle'> TO DO </div>
            <OutlinedInput
                required
                id="outlined-required"
                label="Add new task"
                onChange={event => setValue(event.currentTarget.value) }
                endAdornment={
                    <IconButton
                        color="primary"
                        title='Add new task'
                        onClick={onAdd}
                    >
                        <Add />
                    </IconButton>
                }
            />
        </div>
        <ListWrapper droppableId={todoDroppableId} onItemDelete={onDelete} listItems={todos} />
    </div>
}