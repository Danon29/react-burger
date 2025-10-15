import React, { useEffect, useState } from "react";
import styles from "./Ingredients.module.scss";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store";
import { useParams, useNavigate } from "react-router-dom";
import { IngreditentsData } from "../../types";
import { RootState } from "../../services/rootReducer";

const IngredientsPage = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { ingredientId } = useParams<"ingredientId">();
  const [ingredient, setIngredient] = useState<null | IngreditentsData>(null);
  const { items } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    const ingredient = items.find(
      (ingr: IngreditentsData) => ingr._id === ingredientId,
    );
    if (ingredient) {
      setIngredient(ingredient);
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, ingredientId, items]);

  return (
    <>
      {ingredient && (
        <div className={`${styles.ingredientWrap} pt-3 pb-5`}>
          <p className="mb-8 text text_type_main-large">Детали ингредиента</p>
          <div className={`${styles.ingredientInfo__imagewrap} mb-4`}>
            <img
              className={`${styles.ingredientInfo__image} ml-5 mr-5`}
              src={ingredient.image}
              alt={ingredient.name}
            />
          </div>
          <p
            className={`${styles.ingredientInfo__name} mb-8 text text_type_main-medium`}
          >
            {ingredient.name}
          </p>
          <div
            className={`${styles.ingredientInfo__facts} pl-15 pr-15 text text_type_main-default text_color_inactive`}
          >
            <div className={`${styles.fact__block}`}>
              <span>Калории,ккал</span>
              <span>{ingredient.calories}</span>
            </div>
            <div className={styles.fact__block}>
              <span>Белки, г</span>
              <span>{ingredient.proteins}</span>
            </div>
            <div className={styles.fact__block}>
              <span>Жиры, г</span>
              <span>{ingredient.fat}</span>
            </div>
            <div className={styles.fact__block}>
              <span>Углеводы, г</span>
              <span>{ingredient.carbohydrates}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientsPage;
