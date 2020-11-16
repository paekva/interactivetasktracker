import React from "react";
import {inProgressDroppableId} from "./extra/dndUtils";
import {ListWrapper} from "./common/ListWrapper";
import {ColumnProps} from "./extra/types";

export const InProgress = (props: Omit<ColumnProps, 'onAddNewItem'>): JSX.Element => {
    return <div className='todo'>
        <div className='smallTitle'> In Progress </div>
        <div>
            animation
        </div>
        <ListWrapper droppableId={inProgressDroppableId} onItemDelete={props.onItemDelete} listItems={props.items} />
    </div>
}