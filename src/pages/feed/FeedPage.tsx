import styles from "./FeedPage.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Spinner from "../../components/Spinner/Spinner";
import {
  wsConnect,
  wsDisconnect,
} from "../../services/actions/ordersFeedSocketActions";
import {
  selectCreatedOrders,
  selectPendingOrders,
} from "../../services/slices/ordersFeed/ordersFeed";
import { wsOrdersFeedUrl } from "../../api";
import { getIngredientsDict } from "../../services/slices/ingredients/ingredientsSlice";
import { FeedOrdersList } from "../../components/OrdersFeedList/OrdersFeedList";

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { items: ingredients, status: isLoadingIngredients } = useAppSelector(
    (state) => state.ingredients,
  );

  const pendingOrders = useAppSelector(selectPendingOrders);
  const createdOrders = useAppSelector(selectCreatedOrders);

  const { orders, total, totalToday, gotFirstMessage } = useAppSelector(
    (state) => state.ordersFeed,
  );
  const ingredientsDict = useAppSelector(getIngredientsDict);

  useEffect(() => {
    dispatch(wsConnect(wsOrdersFeedUrl));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, ingredients]);

  return (
    <div className={styles.pageWrapper}>
      {isLoadingIngredients !== "succeeded" || !gotFirstMessage ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Лента заказов
          </h1>
          <div className={styles.contentWrapper}>
            <section className={`pr-2 mt-10 ${styles.feed}`}>
              <FeedOrdersList
                orders={orders}
                ingredientsDict={ingredientsDict}
                linkpath="/feed"
              />
            </section>
            <section className={`mt-10 ${styles.feedInfo}`}>
              <div className={`mb-15 ${styles.board}`}>
                <div className={styles.boardColumn}>
                  <p className="mb-6 text text_type_main-medium">Готовы:</p>
                  <div className={styles.boardOrders}>
                    {pendingOrders.map((order) => (
                      <span
                        key={order._id}
                        className="mb-2 text text_type_digits-default text_color_success"
                      >
                        {order.number}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.boardColumn}>
                  <p className="mb-6 text text_type_main-medium">В работе:</p>
                  <div className={styles.boardOrders}>
                    {createdOrders.map((order) => (
                      <span
                        key={order._id}
                        className="mb-2 text text_type_digits-default text_color_success"
                      >
                        {order.number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-15">
                <p className="text text_type_main-medium">
                  Выполнено за все время:
                </p>
                <p className="text text_type_digits-large">{total}</p>
              </div>
              <div>
                <p className="text text_type_main-medium">
                  Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">{totalToday}</p>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
export default FeedPage;
