import {ListWrapper} from "./common/ListWrapper";
import {doneDroppableId} from "./extra/dndUtils";
import React from "react";
import {ColumnProps} from "./extra/types";

export const Done = (props: Omit<ColumnProps, 'onAddNewItem'>): JSX.Element => {
    return <div className='todo'>
        <div className='smallTitle'> Done </div>
        <div>
            animation
        </div>
        <ListWrapper droppableId={doneDroppableId} onItemDelete={props.onItemDelete} listItems={props.items} />
    </div>
}