import {DragDropContext} from "react-beautiful-dnd";
import {ColumnsWrapper} from "./common/ColumnsWrapper";
import {ToDo} from "./ToDo";
import React, {useCallback, useState} from "react";
import {ItemData} from "./extra/types";
import {addItemToListAtPosition, removeItemInListAtPosition} from "./extra/dndUtils";

const defaultList: ItemData[] = [
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

export const MainView = (): JSX.Element => {
    const [todos, setTodos] = useState<ItemData[]>(defaultList);
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
        <DragDropContext onDragEnd={onDragPerformed}>
            <ColumnsWrapper>
                <ToDo todos={todos} addNewTodo={onAdd} deleteToDo={onDelete}/>
                <div>2</div>
                <div>3</div>
            </ColumnsWrapper>
        </DragDropContext>
    )
}