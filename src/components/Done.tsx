import {ListWrapper} from "./common/ListWrapper";
import {doneDroppableId} from "./extra/dndUtils";
import React, {useMemo} from "react";
import {ColumnProps} from "./extra/types";

export const Done = (props: ColumnProps): JSX.Element => {
    const percentage = useMemo(
        () => props.items.length / (props.max ? props.max : 1) * 100,
        [ props.max, props.items]
    );

    return <div className='todo'>
        <div className='smallTitle'> Done </div>
        <div className='bar'
             style={{background: `linear-gradient(to right, blue ${percentage}% , white ${percentage}% , white 100%)`}}
        />
        <ListWrapper droppableId={doneDroppableId} onItemDelete={props.onItemDelete} listItems={props.items} />
    </div>
}