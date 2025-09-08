import { useMemo, useRef, useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngreditentsData } from "../../types";
import BurgerIngredientsTab from "../BurgerIngredientsTab/BurgerIngredientsTab";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const IngredientsTabsEnum = {
  BUN: { value: "BUN", label: "Булки" },
  SAUCE: { value: "SAUCE", label: "Соусы" },
  MAIN: { value: "MAIN", label: "Начинки" },
} as const;

type TabValue =
  (typeof IngredientsTabsEnum)[keyof typeof IngredientsTabsEnum]["value"];

const BurgerIngredients: React.FC<Props> = ({ data }) => {
  const [currentTab, setCurrentTab] = useState<TabValue>(
    IngredientsTabsEnum.BUN.value
  );

  const [detailedItem, setDetailedItem] = useState<IngreditentsData | null>(
    null
  );

  const refs = useRef<Record<TabValue, HTMLElement | null>>({
    BUN: null,
    SAUCE: null,
    MAIN: null,
  });

  const groups = useMemo<Record<TabValue, IngreditentsData[]>>(() => {
    return {
      BUN: data.filter((i) => i.type === "bun"),
      SAUCE: data.filter((i) => i.type === "sauce"),
      MAIN: data.filter((i) => i.type === "main"),
    };
  }, [data]);

  const onTabChange = (value: TabValue) => {
    setCurrentTab(value);
    refs.current[value]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`mt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>

      <div className={`mt-10 ${styles.tabs}`}>
        {Object.entries(IngredientsTabsEnum).map(([key, v]) => (
          <Tab
            key={v.value}
            value={v.value}
            active={currentTab === v.value}
            onClick={() => onTabChange(v.value)}
          >
            {v.label}
          </Tab>
        ))}
      </div>

      <div className={`${styles.ingredientsWrapper} mt-10 custom-scroll`}>
        {Object.entries(groups).map(([key, value]) => (
          <div
            key={key}
            ref={(el) => {
              refs.current[key as TabValue] = el;
            }}
          >
            <BurgerIngredientsTab
              title={
                IngredientsTabsEnum[key as keyof typeof IngredientsTabsEnum]
                  .label
              }
              data={value}
              onItemClick={setDetailedItem}
            />
          </div>
        ))}
      </div>

      {detailedItem && (
        <IngredientDetails
          item={detailedItem}
          onClose={() => setDetailedItem(null)}
        />
      )}
    </section>
  );
};

export default BurgerIngredients;

interface Props {
  data: IngreditentsData[];
}
