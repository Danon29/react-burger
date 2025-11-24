import { ingredients } from "../../../utils/ingredients";
import reducer, {
  addConstructorIngredient,
  initialState,
  removeConstructorIngredient,
  replaceBun,
  clearConstructor,
  reorderIngredients,
} from "./constructorSlice";

describe("testing BurgerConstructor slice", () => {
  const [ingredient1, ingredient2, ingredient3] = ingredients;

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("addConstructorIngredient", () => {
    it("should increment count when adding duplicate ingredient", () => {
      const stateAfterFirst = reducer(
        undefined,
        addConstructorIngredient(ingredient2)
      );
      const stateAfterSecond = reducer(
        stateAfterFirst,
        addConstructorIngredient(ingredient2)
      );
      expect(stateAfterSecond.items).toHaveLength(2);
      expect(stateAfterSecond.counts[ingredient2._id]).toBe(2);
    });
  });

  describe("replaceBun", () => {
    it("should replace the bun", () => {
      const stateWithBun = reducer(
        undefined,
        addConstructorIngredient(ingredient1)
      );
      const newBun = { ...ingredient1, _id: "new-bun-id", name: "New Bun" };
      const result = reducer(stateWithBun, replaceBun(newBun));
      expect(result.bun).toEqual(newBun);
    });
  });

  describe("removeConstructorIngredient", () => {
    it("should remove an ingredient from items", () => {
      const stateWithIngredient = reducer(
        undefined,
        addConstructorIngredient(ingredient2)
      );
      const result = reducer(
        stateWithIngredient,
        removeConstructorIngredient(0)
      );
      expect(result.items).toHaveLength(0);
    });

    it("should decrement count when removing ingredient", () => {
      const state1 = reducer(undefined, addConstructorIngredient(ingredient2));
      const state2 = reducer(state1, addConstructorIngredient(ingredient2));
      expect(state2.counts[ingredient2._id]).toBe(2);

      const result = reducer(state2, removeConstructorIngredient(0));
      expect(result.counts[ingredient2._id]).toBe(1);
    });

    it("should delete count key when count reaches zero", () => {
      const stateWithIngredient = reducer(
        undefined,
        addConstructorIngredient(ingredient2)
      );
      const result = reducer(
        stateWithIngredient,
        removeConstructorIngredient(0)
      );
      expect(result.counts[ingredient2._id]).toBeUndefined();
    });

    it("should remove correct ingredient by index", () => {
      const state1 = reducer(undefined, addConstructorIngredient(ingredient2));
      const state2 = reducer(state1, addConstructorIngredient(ingredient3));
      expect(state2.items).toHaveLength(2);

      const result = reducer(state2, removeConstructorIngredient(0));
      expect(result.items).toHaveLength(1);
      expect(result.items[0]._id).toBe(ingredient3._id);
    });
  });

  describe("clearConstructor", () => {
    it("should clear all ingredients from constructor", () => {
      const state1 = reducer(undefined, addConstructorIngredient(ingredient1));
      const state2 = reducer(state1, addConstructorIngredient(ingredient2));
      const state3 = reducer(state2, addConstructorIngredient(ingredient3));

      const result = reducer(state3, clearConstructor());
      expect(result).toEqual(initialState);
      expect(result.bun).toBeNull();
      expect(result.items).toHaveLength(0);
      expect(result.counts).toEqual({});
    });
  });

  describe("reorderIngredients", () => {
    it("should reorder ingredients", () => {
      const state1 = reducer(undefined, addConstructorIngredient(ingredient2));
      const state2 = reducer(state1, addConstructorIngredient(ingredient3));
      expect(state2.items).toHaveLength(2);
      expect(state2.items[0]._id).toBe(ingredient2._id);
      expect(state2.items[1]._id).toBe(ingredient3._id);

      const result = reducer(
        state2,
        reorderIngredients({ dragIndex: 0, hoverIndex: 1 })
      );
      expect(result.items).toHaveLength(2);
      expect(result.items[0]._id).toBe(ingredient3._id);
      expect(result.items[1]._id).toBe(ingredient2._id);
    });

    it("should move ingredient from middle to beginning", () => {
      const state1 = reducer(undefined, addConstructorIngredient(ingredient2));
      const state2 = reducer(state1, addConstructorIngredient(ingredient3));
      const state3 = reducer(
        state2,
        addConstructorIngredient({
          ...ingredient2,
          _id: "third-ingredient",
        })
      );

      const result = reducer(
        state3,
        reorderIngredients({ dragIndex: 1, hoverIndex: 0 })
      );
      expect(result.items[0]._id).toBe(ingredient3._id);
    });
  });
});
