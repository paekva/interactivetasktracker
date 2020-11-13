import React, {useState} from "react";
import './ToDo.css'

export const ToDo = ():JSX.Element => {
    const [todos, setTodos] = useState([ '1', '2', '3']);

    return <div className='todo'>
        <div className='addToTodo'>
            Add new
        </div>
        <div className='todoList'>
            {todos.map(el => <div>{el}</div>)}
        </div>
    </div>
}