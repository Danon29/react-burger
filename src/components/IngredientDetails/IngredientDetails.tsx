import styles from "./IngredientDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IngreditentsData } from "../../types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";

const IngredientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<IngreditentsData | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getItem = async () => {
      dispatch(fetchIngredients()).then((resultAction) => {
        if (fetchIngredients.fulfilled.match(resultAction)) {
          const items = resultAction.payload;
          const foundIngredient = items[Number(id)];
          if (foundIngredient) {
            setItem(foundIngredient);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      });
    };

    getItem();
  }, [id, navigate, dispatch]);

  if (!item) return null;
  return (
    <div className={`${styles.container}`}>
      <img
        src={item.image_large}
        alt={item.name}
        className={`${styles.image} mb-4`}
      />
      <p className={`${styles.name} text text_type_main-medium mb-8`}>
        {item.name}
      </p>
      <div className={`${styles["detail-container"]}  mb-15`}>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </div>
          <div className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </div>
        </div>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </div>
          <div className="text text_type_digits-default text_color_inactive">
            {item.proteins}
          </div>
        </div>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </div>
          <div className="text text_type_digits-default text_color_inactive">
            {item.fat}
          </div>
        </div>
        <div className={styles["detail-item"]}>
          <div className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </div>
          <div className="text text_type_digits-default text_color_inactive">
            {item.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
