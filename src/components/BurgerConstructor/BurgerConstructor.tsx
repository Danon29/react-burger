import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useDrop } from "react-dnd";
import {
  addConstructorIngredient,
  removeConstructorIngredient,
  reorderIngredients,
  replaceBun,
} from "../../services/constructor/constructorSlice";
import DraggableIngredient from "../DraggableIngredient/DraggableIngredient";
import { postOrder } from "../../services/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const BurgerConstructor: React.FC = () => {
  const { isModalOpen, closeModal, openModal } = useModal();

  const data = useAppSelector((state) => state.constructorState.items);

  const buns = useAppSelector((state) => state.constructorState.bun);

  const sum = useMemo(
    () =>
      (buns?.price as number) * 2 +
      data.reduce((sum, item) => (sum += item.price), 0),
    [data, buns]
  );

  const deleteIngredientFromConstructor = (index: number) => {
    dispatch(removeConstructorIngredient(index));
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch(reorderIngredients({ dragIndex, hoverIndex }));
  };

  const dispatch = useAppDispatch();

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item: any) => {
      if (item.type === "bun") {
        dispatch(replaceBun(item));
      } else {
        dispatch(addConstructorIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const bun = useAppSelector((state) => state.constructorState.bun);

  const ingredients = [
    ...useAppSelector((state) => state.constructorState.items).map(
      (item) => item._id
    ),
    ...(bun ? [bun._id, bun._id] : []),
  ];

  return (
    <section ref={dropRef} className={`${styles.section} mt-30`}>
      {!buns && ingredients.length === 0 ? (
        <div className={styles["empty-block"]} style={{ height: "400px" }}>
          <div
            className={`${styles["empty-block__text"]} text text_type_main-medium`}
          >
            Перетащите булки и ингридиенты
          </div>
        </div>
      ) : (
        <div>
          {buns && (
            <div className="pl-8 mb-4">
              <ConstructorElement
                type="top"
                isLocked
                text={`${buns.name} \n (верх)`}
                price={buns.price}
                thumbnail={buns.image}
              />
            </div>
          )}
          {data.length > 0 ? (
            <div className={styles.ingredients}>
              {data.map((item, index) => {
                return (
                  <div className={styles.ingredient} key={item.uniqueId}>
                    <DraggableIngredient
                      key={item._id}
                      index={index}
                      item={item}
                      moveIngredient={moveIngredient}
                      onDelete={deleteIngredientFromConstructor}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles["empty-block"]}>
              <div
                className={`${styles["empty-block__text"]} text text_type_main-medium`}
              >
                Перетащите ингридиенты
              </div>
            </div>
          )}
          {buns && (
            <>
              <div className="pl-8 mt-4">
                <ConstructorElement
                  type="bottom"
                  isLocked
                  text={`${buns?.name} \n (низ)`}
                  price={buns?.price ?? 0}
                  thumbnail={buns?.image ?? ""}
                />
              </div>

              <div className={`${styles.priceContainer} mt-10 mr-15`}>
                <div className="text text_type_digits-medium mr-2 mb-1">
                  {sum}
                </div>
                <div className={`mr-10`}>
                  <CurrencyIcon type="primary" />
                </div>
                <Button
                  htmlType="button"
                  type="primary"
                  onClick={() => {
                    dispatch(postOrder({ ingredients }))
                      .unwrap()
                      .then(() => {
                        openModal();
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => closeModal()}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
