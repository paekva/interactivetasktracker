import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {ListItem} from "./ListItem";
import {ItemData} from "../extra/types";

export const ListWrapper = (props: {
    droppableId: string,
    listItems: ItemData[],
    onItemDelete: (event: any) => void
}): JSX.Element => {
    return <Droppable droppableId={props.droppableId}>
        {
            provided => (
                <div className='todoList' ref={provided.innerRef} {...provided.droppableProps}>
                    {props.listItems.map((el, index) =>
                        <ListItem
                            droppableId={props.droppableId}
                            key={el.id}
                            id={el.id}
                            index={index}
                            itemText={el.text}
                            date={el.date}
                            onDelete={props.onItemDelete}
                        />
                    )}
                    {provided.placeholder}
                </div>
            )
        }
    </Droppable>

}