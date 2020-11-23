import React, {useMemo, useState} from "react";
import {inProgressDroppableId} from "./extra/dndUtils";
import {ListWrapper} from "./common/ListWrapper";
import {ColumnProps} from "./extra/types";
import {IconButton, OutlinedInput} from "@material-ui/core";
import {Add} from "@material-ui/icons";

export const InProgress = (props: ColumnProps): JSX.Element => {
    const [max, setMax] = useState<number>(10);
    const percentage = useMemo( () => props.items.length / max * 100, [max, props.items]);

    return <div className='todo'>

        <div className='addToTodo'>
            <div className='smallTitle'> In Progress </div>
            <OutlinedInput
                required
                id="outlined-required"
                onChange={event => setMax(Number(event.currentTarget.value)) }
                value={max}
            />
        </div>

        <div className='bar'
             style={{background: `linear-gradient(to right, blue ${percentage}% , white ${percentage}% , white 100%)`}}
        />
        <ListWrapper droppableId={inProgressDroppableId} onItemDelete={props.onItemDelete} listItems={props.items} />
    </div>
}