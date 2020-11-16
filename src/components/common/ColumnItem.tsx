import React from "react";
import '../../App.css'

export enum ListItemPosition {
    LAST,
    FIRST,
    MEDIATE
}

export const ColumnItem = (props: {position: ListItemPosition, children: React.ReactNode}):JSX.Element => {
    const additionalStyle = props.position === ListItemPosition.LAST
        ? 'last' : props.position === ListItemPosition.FIRST
            ? 'first' : 'last first'
    return <div className={`${additionalStyle} list`}>{props.children}</div>
}