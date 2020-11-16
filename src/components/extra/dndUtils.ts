export const todoDroppableId = 'TODO';
export const inProgressDroppableId = 'PROGRESS';
export const doneDroppableId = 'DONE';

export const addItemToListAtPosition = <T,>(list: T[], item: T, position: number) => {
    const before = list.slice(0, position);
    const after = list.slice(position);
    return before.concat(item, after);
}

export const removeItemInListAtPosition = <T,>(list: T[], position: number): {removed: T, list: T[] } => {
    return {
        removed: list.splice(position, 1)[0],
        list: list
    };
}
