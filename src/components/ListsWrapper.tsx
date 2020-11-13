import React from "react";
import '../App.css'
import {ListItem, ListItemPosition} from "./ListItem";

export const ListWrapper = (props: {children: React.ReactNode[]}): JSX.Element => {
    return <div className='listWrapper'>
        {props.children.map((el, index) =>
            <ListItem
                key={`${index} list`}
                position={index === 0 ? ListItemPosition.FIRST
                    : index === props.children.length - 1
                        ? ListItemPosition.LAST
                        : ListItemPosition.MEDIATE
                }>
                {el}
            </ListItem>
        )}
    </div>
}