import { useEffect } from "react";
import "./App.scss";
import AppHeader from "../components/AppHeader/AppHeader";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { fetchIngredients } from "../services/ingredients/ingredientsSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

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
