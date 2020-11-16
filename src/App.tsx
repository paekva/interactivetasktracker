import React, {useCallback, useState} from 'react';
import './App.css';
import {ListWrapper} from "./components/ListsWrapper";
import {ToDo} from "./components/ToDo";
import {DragDropContext} from "react-beautiful-dnd";


export type ToDoItem = {id: number, text: string};
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
export const todoDroppableId = 'TODO';

const addItemToListAtPosition = <T,>(list: T[], item: T, position: number) => {
    const before = list.slice(0, position);
    const after = list.slice(position);
    return before.concat(item, after);
}

const removeItemInListAtPosition = <T,>(list: T[], position: number): {removed: T, list: T[] } => {
    return {
        removed: list.splice(position, 1)[0],
        list: list
    };
}

function App() {
    const [todos, setTodos] = useState<ToDoItem[]>(defaultList);
    const [nextId, setNextId] = useState<number>(3);

    const onAdd = useCallback((value: string) => {
        setTodos([...todos, { id: nextId, text: value}]);
        setNextId(nextId+1);
    }, [nextId, todos]);

    const onDelete = useCallback((id: string) => {
        const newTodos = todos.filter(el => el.id.toString() !== id);
        setTodos(newTodos);
    }, [todos]);

    const onDragPerformed = useCallback((dragData) => {
        console.warn(dragData);

        let itemId = dragData.draggableId;

        let sourceIdx = parseInt(dragData.source.index);
        let source = dragData.source.droppableId;

        let destinationIdx = parseInt(dragData.destination.index);
        let destination = dragData.source.droppableId;

        // handle removing item
        const results = removeItemInListAtPosition(todos, sourceIdx);
        // if(source === todoDroppableId)

        // handle adding item
        const newList = addItemToListAtPosition(results.list, results.removed, destinationIdx);
        setTodos(newList);

    }, [todos]);

    return (
    <div className='app'>
        <DragDropContext onDragEnd={onDragPerformed}>
            <ListWrapper>
                <ToDo todos={todos} addNewTodo={onAdd} deleteToDo={onDelete}/>
                <div>2</div>
                <div>3</div>
            </ListWrapper>
        </DragDropContext>
    </div>
  );
}

export default App;
