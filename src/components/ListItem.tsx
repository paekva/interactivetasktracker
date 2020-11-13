import React from "react";
import '../App.css'

export enum ListItemPosition {
    LAST,
    FIRST,
    MEDIATE
}

export const ListItem = (props: {position: ListItemPosition, children: React.ReactNode}):JSX.Element => {
    return <div>{props.children}</div>
}