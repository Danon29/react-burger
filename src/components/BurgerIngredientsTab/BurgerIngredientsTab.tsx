import React, { ForwardedRef } from "react";
import { IngreditentsData } from "../../types";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerIngredientsTab.module.scss";

interface Props {
  title: string;
  data: IngreditentsData[];
}

const BurgerIngredientsTab = React.forwardRef<HTMLDivElement, Props>(
  ({ title, data }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={styles.tab}>
        <h2 className="text text_type_main-medium">{title}</h2>
        <div className={`${styles.cards} ml-4 mr-4 mt-6 mb-10`}>
          {data.map((card) => (
            <BurgerIngredientsItem
              key={card._id}
              imgSrc={card.image}
              title={card.name}
              price={card.price}
              count={card.__v}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default BurgerIngredientsTab;
