import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {Card, CardActions, CardContent, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export const ListItem = (props: {
    id: number,
    index: number,
    itemText: string,
    onDelete: (event: any) => void
}): JSX.Element => <Draggable draggableId={props.id.toString()}
                              index={props.index}
                              key={`${props.id} todos`}>
    {provided1 => (
        <Card
            ref={provided1.innerRef}
            {...provided1.draggableProps}
            {...provided1.dragHandleProps}
            className='todoItem'
        >
            <CardContent>
                {props.itemText}
            </CardContent>
            <CardActions>
                <IconButton
                    name={props.id.toString()}
                    color="primary"
                    title='Delete the task'
                    onClick={props.onDelete}
                >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    )}
</Draggable>;