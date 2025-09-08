import styles from "./BurgerConstructor.module.scss";
import { IngreditentsData } from "../../types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const buns = useMemo(
    () => data.find((item) => item.type === "bun"),
    [data]
  ) as IngreditentsData;
  const ingedients = useMemo(
    () => data.filter((item) => item.type !== "bun"),
    [data]
  );
  const sum = useMemo(
    () =>
      (buns?.price as number) * 2 +
      ingedients.reduce((sum, item) => (sum += item.price), 0),
    [ingedients, buns]
  );

  return (
    <section className={`${styles.section} mt-30`}>
      {buns && (
        <div>
          <div className="pl-8 mb-4">
            <ConstructorElement
              type="top"
              isLocked
              text={`${buns.name} \n (верх)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          </div>

          <div className={styles.ingredients}>
            {ingedients.map((item) => {
              return (
                <div className={styles.ingredient} key={item._id}>
                  <span className={`${styles.draggable} mr-2`}>
                    <DragIcon type="primary" />
                  </span>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              );
            })}
          </div>

          <div className="pl-8 mt-4">
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${buns.name} \n (низ)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          </div>

          <div className={`${styles.priceContainer} mt-10 mr-15`}>
            <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
            <div className={`mr-10`}>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="button"
              type="primary"
              onClick={() => setShowModal(true)}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      )}

      {showModal && (
        <OrderDetails
          onClose={() => setShowModal(false)}
          orderNumber="034536"
        />
      )}
    </section>
  );
};

interface Props {
  data: IngreditentsData[];
}

export default BurgerConstructor;
