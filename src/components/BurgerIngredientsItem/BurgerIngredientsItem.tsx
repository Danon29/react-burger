import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.scss";
import { IngreditentsData } from "../../types";

const BurgerIngredientsItem: React.FC<Props> = ({
  item: { image, name, price, __v: count },
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={`${styles.image} ml-4 mr-4`} />

      {count !== undefined && count > 0 && <Counter count={count} />}

      <div
        className={`text text_type_digits-default ${styles.price} mt-1 mb-1`}
      >
        <span className="pr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>

      <div className={`text text_type_main-default ${styles.title}`}>
        {name}
      </div>
    </div>
  );
};

interface Props {
  item: IngreditentsData;
}

export default BurgerIngredientsItem;
