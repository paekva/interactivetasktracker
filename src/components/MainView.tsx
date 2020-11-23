import {DragDropContext} from "react-beautiful-dnd";
import {ColumnsWrapper} from "./common/ColumnsWrapper";
import {ToDo} from "./ToDo";
import React, {useCallback, useState} from "react";
import {ItemData} from "./extra/types";
import {
    addItemToListAtPosition,
    inProgressDroppableId,
    removeItemInListAtPosition,
    todoDroppableId
} from "./extra/dndUtils";
import {InProgress} from "./InProgress";
import {Done} from "./Done";

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

const removeItem = (list: ItemData[], onSave: (newList: ItemData[]) => void ) => (event: any) => {
    const id = event.currentTarget.name;
    const updated = list.filter(el => el.id.toString() !== id);
    onSave(updated);
}

export const MainView = (): JSX.Element => {
    const [todos, setTodos] = useState<ItemData[]>(defaultList);
    const [inProgress, setInProgress] = useState<ItemData[]>([]);
    const [done, setDone] = useState<ItemData[]>([]);
    const [nextId, setNextId] = useState<number>(3);

    const onAdd = useCallback((value: string) => {
        setTodos([...todos, { id: nextId, text: value}]);
        setNextId(nextId+1);
    }, [nextId, todos]);

    const getListByType = useCallback((type: string) => {
        switch (type) {
            case todoDroppableId:
                return todos;
            case inProgressDroppableId:
                return inProgress;
            default:
                return done;
        }
    } , [todos, inProgress, done]);

    const getListMethodForUpdateByType = useCallback((type: string) => {
        switch (type) {
            case todoDroppableId:
                return setTodos;
            case inProgressDroppableId:
                return setInProgress;
            default:
                return setDone;
        }
    } , []);

    const onDragPerformed = useCallback((dragData) => {
        let sourceIdx = parseInt(dragData.source.index);
        let source = dragData.source.droppableId;

        let destinationIdx = parseInt(dragData.destination.index);
        let destination = dragData.destination.droppableId;

        const sourceList = getListByType(source);
        const destinationList = getListByType(destination);

        // handle removing item
        const results = removeItemInListAtPosition(sourceList, sourceIdx);
        getListMethodForUpdateByType(source)(results.list);

        // handle adding item
        const newList = addItemToListAtPosition(destinationList, results.removed, destinationIdx);
        getListMethodForUpdateByType(destination)(newList);

    }, [getListMethodForUpdateByType, getListByType]);

    return (
        <DragDropContext onDragEnd={onDragPerformed}>
            <ColumnsWrapper>
                <ToDo items={todos} onAddNewItem={onAdd} onItemDelete={removeItem(todos, setTodos)}/>
                <InProgress items={inProgress} onItemDelete={removeItem(inProgress, setInProgress)}/>
                <Done
                    items={done}
                    onItemDelete={removeItem(done, setDone)}
                    max={todos.length + inProgress.length + done.length}
                />
            </ColumnsWrapper>
        </DragDropContext>
    )
}