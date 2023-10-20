import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Item {
  id: number;
  text: string;
}

interface DraggableItemProps {
  item: Item;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const ItemType = "ITEM";

const DraggableItem = ({ item, index, moveItem }: DraggableItemProps) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{ padding: "8px", border: "1px solid #ccc", marginBottom: "8px" }}
    >
      {item.text}
    </div>
  );
};

interface ListProps {
  items: Item[];
}

const List = ({ items }: ListProps) => {
  const [list, setList] = useState(items);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedList = [...list];
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);
    setList(updatedList);
  };

  return (
    <div>
      {list.map((item, index) => (
        <DraggableItem
          key={item.id}
          item={item}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

const items: Item[] = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
  // ...additional items
];

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List items={items} />
    </DndProvider>
  );
};

export default App;
