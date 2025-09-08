import { useEffect, useState } from "react";
import "./App.scss";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import { getData } from "./api";
import { IngreditentsData } from "./types";

function App() {
  const [data, setData] = useState<IngreditentsData[]>([]);

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
