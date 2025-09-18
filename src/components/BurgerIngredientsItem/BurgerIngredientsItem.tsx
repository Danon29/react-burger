import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.scss";
import { IngreditentsData } from "../../types";
import { useDrag } from "react-dnd";

const BurgerIngredientsItem: React.FC<Props> = ({ item, count }) => {
  const [_, dragRef] = useDrag({
    type: "ingredient",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className={styles.card}>
      <img
        src={item.image}
        alt={item.name}
        className={`${styles.image} ml-4 mr-4`}
      />

      {count !== undefined && count > 0 && <Counter count={count} />}

      <div
        className={`text text_type_digits-default ${styles.price} mt-1 mb-1`}
      >
        <span className="pr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>

      <div className={`text text_type_main-default ${styles.title}`}>
        {item.name}
      </div>
    </div>
  );
};

interface Props {
  item: IngreditentsData;
  count: number;
}

export default BurgerIngredientsItem;
