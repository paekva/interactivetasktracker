import React from "react";
import '../../App.css'
import {ColumnItem, ListItemPosition} from "./ColumnItem";

export const ColumnsWrapper = (props: {children: React.ReactNode[]}): JSX.Element => {
    return <div className='listWrapper'>
        {props.children.map((el, index) =>
            <ColumnItem
                key={`${index} list`}
                position={index === 0 ? ListItemPosition.FIRST
                    : index === props.children.length - 1
                        ? ListItemPosition.LAST
                        : ListItemPosition.MEDIATE
                }>
                {el}
            </ColumnItem>
        )}
    </div>
}