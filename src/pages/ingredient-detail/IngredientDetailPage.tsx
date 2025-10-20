import React from "react";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import styles from "./IngredientDetailPage.module.scss";

const IngredientDetailPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientDetailPage;
