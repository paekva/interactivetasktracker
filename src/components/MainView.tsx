import {DragDropContext} from "react-beautiful-dnd";
import {ColumnsWrapper} from "./common/ColumnsWrapper";
import {ToDo} from "./ToDo";
import React, {useCallback, useState} from "react";
import {ItemData} from "./extra/types";
import {addItemToListAtPosition, removeItemInListAtPosition, todoDroppableId} from "./extra/dndUtils";
import {InProgress} from "./InProgress";

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
    const [inProgress, setInProgress] = useState<ItemData[]>([{id: 3, text: '4'}]);
    const [nextId, setNextId] = useState<number>(3);

    const onAdd = useCallback((value: string) => {
        setTodos([...todos, { id: nextId, text: value}]);
        setNextId(nextId+1);
    }, [nextId, todos]);

    const onDeleteFromTodo = useCallback((id: string) => {
        const newTodos = todos.filter(el => el.id.toString() !== id);
        setTodos(newTodos);
    }, [todos]);

    const onDragPerformed = useCallback((dragData) => {
        let sourceIdx = parseInt(dragData.source.index);
        let source = dragData.source.droppableId;

        let destinationIdx = parseInt(dragData.destination.index);
        let destination = dragData.destination.droppableId;

        const sourceList = source === todoDroppableId ? todos : inProgress;
        const destinationList = destination === todoDroppableId ? todos : inProgress;

        // handle removing item
        const results = removeItemInListAtPosition(sourceList, sourceIdx);
        source === todoDroppableId ? setTodos(results.list) : setInProgress(results.list);

        // handle adding item
        const newList = addItemToListAtPosition(destinationList, results.removed, destinationIdx);
        destination === todoDroppableId ? setTodos(newList) : setInProgress(newList);

    }, [inProgress, todos]);

    return (
        <DragDropContext onDragEnd={onDragPerformed}>
            <ColumnsWrapper>
                <ToDo items={todos} onAddNewItem={onAdd} onItemDelete={onDeleteFromTodo}/>
                <InProgress items={inProgress} onItemDelete={onDeleteFromTodo}/>
                <div>3</div>
            </ColumnsWrapper>
        </DragDropContext>
    )
}