export type ItemData = { id: number, text: string, date: number };

export type ColumnProps = {
    items: ItemData[],
    onItemDelete: (value: string) => void
    onAddNewItem?: (value: string) => void,
    max?: number;
}