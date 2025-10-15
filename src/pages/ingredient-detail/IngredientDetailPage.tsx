import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IngreditentsData } from "../../types";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import styles from "./IngredientDetailPage.module.scss";
import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

const IngredientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState<IngreditentsData | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getItem = async () => {
      dispatch(fetchIngredients()).then((resultAction) => {
        if (fetchIngredients.fulfilled.match(resultAction)) {
          const items = resultAction.payload;
          const foundIngredient = items[Number(id)];
          if (foundIngredient) {
            setIngredient(foundIngredient);
          } else {
          }
        } else {
          navigate("/");
        }
      });
    };

    getItem();
  }, [id, navigate, dispatch]);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <IngredientDetails item={ingredient} />
      </div>
    </div>
  );
};

export default IngredientDetailPage;
