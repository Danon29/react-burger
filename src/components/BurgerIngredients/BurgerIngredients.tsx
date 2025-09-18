import { useMemo, useRef, useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngreditentsData } from "../../types";
import BurgerIngredientsTab from "../BurgerIngredientsTab/BurgerIngredientsTab";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { setCurrentIngredient } from "../../services/currentIngredient/currentIngredientSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const IngredientsTabsEnum = {
  BUN: { value: "BUN", label: "Булки" },
  SAUCE: { value: "SAUCE", label: "Соусы" },
  MAIN: { value: "MAIN", label: "Начинки" },
} as const;

type TabValue =
  (typeof IngredientsTabsEnum)[keyof typeof IngredientsTabsEnum]["value"];

const BurgerIngredients: React.FC = () => {
  const data = useAppSelector((state) => state.ingredients.items);

  const [activeTab, setActiveTab] = useState<TabValue>(
    IngredientsTabsEnum.BUN.value
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const detailedItem = useAppSelector(
    (state) => state.currentIngredient.ingredient
  );

  const dispatch = useAppDispatch();

  const { openModal, isModalOpen, closeModal } = useModal();

  const refs = useRef<Record<TabValue, HTMLElement | null>>({
    BUN: null,
    SAUCE: null,
    MAIN: null,
  });

  const groups = useMemo<Record<TabValue, IngreditentsData[]>>(() => {
    return {
      BUN: data?.filter((i) => i.type === "bun"),
      SAUCE: data?.filter((i) => i.type === "sauce"),
      MAIN: data?.filter((i) => i.type === "main"),
    };
  }, [data]);

  const onTabChange = (value: TabValue) => {
    setActiveTab(value);
    refs.current[value]?.scrollIntoView({ behavior: "smooth" });
  };

  const openIngredientsModal = (value: IngreditentsData) => {
    dispatch(setCurrentIngredient(value));
    openModal();
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top;
    let closestTab: TabValue | null = null;
    let minDiff = Infinity;

    (Object.keys(refs.current) as TabValue[]).forEach((tab) => {
      const ref = refs.current[tab];
      if (ref) {
        const diff = Math.abs(ref.getBoundingClientRect().top - containerTop);
        if (diff < minDiff) {
          minDiff = diff;
          closestTab = tab;
        }
      }
    });

    if (closestTab && closestTab !== activeTab) {
      setActiveTab(closestTab);
    }
  };

  return (
    <section className={`mt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>

      <div className={`mt-10 ${styles.tabs}`}>
        {Object.entries(IngredientsTabsEnum).map(([key, v]) => (
          <Tab
            key={v.value}
            value={v.value}
            active={activeTab === v.value}
            onClick={() => onTabChange(v.value)}
          >
            {v.label}
          </Tab>
        ))}
      </div>

      <div
        ref={containerRef}
        className={`${styles.ingredientsWrapper} mt-10 custom-scroll`}
        onScroll={handleScroll}
      >
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
              onItemClick={openIngredientsModal}
            />
          </div>
        ))}
      </div>

      {isModalOpen && detailedItem && (
        <Modal
          title="Детали ингридиента"
          onClose={() => {
            closeModal();
            dispatch(setCurrentIngredient(null));
          }}
        >
          <IngredientDetails item={detailedItem} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
