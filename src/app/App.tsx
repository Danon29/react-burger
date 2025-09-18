import { useEffect } from "react";
import "./App.scss";
import AppHeader from "../components/AppHeader/AppHeader";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import { fetchIngredients } from "../services/ingredients/ingredientsSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
