import React, {useCallback, useState} from "react";
import './ToDo.css'
import {Card, CardActions, CardContent, IconButton, OutlinedInput} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";

type ToDoItem = {id: number, text: string};
const defaultList: ToDoItem[] = [
    {
        id: 0,
        text: '1'
    },
    {
        id: 1,
        text: '2'
    },
    {
        id: 2,
        text: '3'
    },
]

export const ToDo = ():JSX.Element => {
    const [nextId, setNextId] = useState<number>(3);
    const [todos, setTodos] = useState<ToDoItem[]>(defaultList);
    const [value, setValue] = useState('');

    const onAddPress = useCallback(() => {
        setTodos([...todos, { id: nextId, text: value}]);
        setNextId(nextId+1);
    }, [nextId, value, todos]);

    const onDeleteTask = useCallback((event) => {
        const name = event.currentTarget.name;
        const newTodos = todos.filter(el => el.id.toString() !== name);
        setTodos(newTodos);
    }, [todos]);

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
                        onClick={onAddPress}
                    >
                        <Add />
                    </IconButton>
                }
            />
        </div>
        <div className='todoList'>
            {todos.map((el) => <Card className='todoItem' key={`${el.id} todos`}>
                <CardContent>
                    {el.text}
                </CardContent>
                <CardActions>
                    <IconButton
                        name={el.id.toString()}
                        color="primary"
                        title='Delete the task'
                        onClick={onDeleteTask}
                    >
                        <Delete />
                    </IconButton>
                </CardActions>
            </Card>)}
        </div>
    </div>
}