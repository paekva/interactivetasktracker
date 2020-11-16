import React, {useCallback, useState} from "react";
import './ToDo.css'
import {Card, CardActions, CardContent, IconButton, OutlinedInput} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {todoDroppableId, ToDoItem} from "../App";

export const ToDo = (props: {todos: ToDoItem[], addNewTodo: (value: string) => void, deleteToDo: (value: string) => void}):JSX.Element => {
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
        <Droppable droppableId={todoDroppableId}>
            {
                provided => (
                    <div className='todoList' ref={provided.innerRef} {...provided.droppableProps}>
                        {todos.map((el, index) => (
                            <Draggable draggableId={el.id.toString()}
                                       index={index}
                                       key={`${el.id} todos`}>
                                {provided1 => (
                                    <Card
                                        ref={provided1.innerRef}
                                        {...provided1.draggableProps}
                                        {...provided1.dragHandleProps}
                                        className='todoItem'
                                    >
                                        <CardContent>
                                            {el.text}
                                        </CardContent>
                                        <CardActions>
                                            <IconButton
                                                name={el.id.toString()}
                                                color="primary"
                                                title='Delete the task'
                                                onClick={onDelete}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    </div>
}