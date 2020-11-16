import React, {useCallback, useState} from "react";
import './ToDo.css'
import {IconButton, OutlinedInput} from "@material-ui/core";
import {Add, } from "@material-ui/icons";
import {todoDroppableId} from "./extra/dndUtils";
import {ListWrapper} from "./common/ListWrapper";
import {ColumnProps} from "./extra/types";

export const ToDo = (props: ColumnProps):JSX.Element => {
    const [value, setValue] = useState('');
    const { items , onItemDelete, onAddNewItem} = props;

    const onAdd = useCallback(() => onAddNewItem(value) ,[ onAddNewItem, value]);
    const onDelete = useCallback((event) => {
        const name = event.currentTarget.name;
        onItemDelete(name);
    } ,[ onItemDelete ]);
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
        <ListWrapper droppableId={todoDroppableId} onItemDelete={onDelete} listItems={items} />
    </div>
}