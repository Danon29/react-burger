import { IngreditentsData } from "../../types";
import Modal from "../Modal/Modal";
import styles from "./IngredientDetails.module.scss";

const IngredientDetails: React.FC<Props> = ({ item }) => {
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

interface Props {
  item: IngreditentsData;
}
