export type ItemData = { id: number, text: string };

export type ColumnProps = {
    items: ItemData[],
    onItemDelete: (value: string) => void
    onAddNewItem: (value: string) => void,
}