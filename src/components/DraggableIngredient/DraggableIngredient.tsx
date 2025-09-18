import styles from "./DraggableIngredient.module.scss";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { XYCoord } from "dnd-core";
import { useRef } from "react";
import { IngreditentsData } from "../../types";

const DraggableIngredient: React.FC<{
  item: IngreditentsData;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (index: number) => void;
}> = ({ item, index, moveIngredient, onDelete }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover(item, monitor) {
      const draggedItem = item as { index: number };
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveIngredient(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={styles.ingredient}
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      <span className={`${styles.draggable} mr-2`}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onDelete(index)}
      />
    </div>
  );
};

export default DraggableIngredient;
