import styles from "./ProfileOrders.module.scss";
import { useEffect } from "react";
import { wsOrdersUserUrl } from "../../api";
import Spinner from "../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  wsConnect,
  wsDisconnect,
} from "../../services/actions/ordersUserSocketActions";
import { getIngredientsDict } from "../../services/slices/ingredients/ingredientsSlice";
import { FeedOrdersList } from "../../components/OrdersFeedList/OrdersFeedList";
import { getCookie } from "../../utils/cookie";

const ProfileOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: ingredients, status: isLoadingIngredients } = useAppSelector(
    (state) => state.ingredients,
  );

  const { orders, gotFirstMessage } = useAppSelector(
    (state) => state.ordersUser,
  );
  const ingredientsDict = useAppSelector(getIngredientsDict);

  useEffect(() => {
    dispatch(
      wsConnect(
        `${wsOrdersUserUrl}?token=${getCookie("accessToken")?.split("Bearer ")[1]}`,
      ),
    );

    return () => {
      debugger;
      dispatch(wsDisconnect());
    };
  }, [dispatch, ingredients]);

  if (!gotFirstMessage || isLoadingIngredients !== "succeeded") {
    return (
      <div className={styles.preloaderWrap}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {
        <div className="pr-2">
          <FeedOrdersList
            orders={orders}
            ingredientsDict={ingredientsDict}
            linkpath="/profile/orders"
          />
        </div>
      }
    </>
  );
};

export default ProfileOrders;
