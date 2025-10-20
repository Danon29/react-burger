import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";

const Main: React.FC = () => {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
};

export default Main;
