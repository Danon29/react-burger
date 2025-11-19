import { ingredients } from "../../../utils/ingredients";
import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
  initialState,
} from "./currentIngredientSlice";

describe("testing CurrentIngredient slice", () => {
  const [ingredient1, ingredient2] = ingredients;

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("setCurrentIngredient", () => {
    it("should set the current ingredient", () => {
      const result = reducer(undefined, setCurrentIngredient(ingredient1));
      expect(result.ingredient).toEqual(ingredient1);
    });

    it("should replace the current ingredient with a new one", () => {
      const stateWithIngredient = reducer(
        undefined,
        setCurrentIngredient(ingredient1)
      );
      const result = reducer(
        stateWithIngredient,
        setCurrentIngredient(ingredient2)
      );
      expect(result.ingredient).toEqual(ingredient2);
    });

    it("should set ingredient to null", () => {
      const stateWithIngredient = reducer(
        undefined,
        setCurrentIngredient(ingredient1)
      );
      const result = reducer(stateWithIngredient, setCurrentIngredient(null));
      expect(result.ingredient).toBeNull();
    });
  });

  describe("clearCurrentIngredient", () => {
    it("should clear the current ingredient", () => {
      const stateWithIngredient = reducer(
        undefined,
        setCurrentIngredient(ingredient1)
      );
      const result = reducer(stateWithIngredient, clearCurrentIngredient());
      expect(result.ingredient).toBeNull();
    });

    it("should clear ingredient even if it's already null", () => {
      const result = reducer(undefined, clearCurrentIngredient());
      expect(result.ingredient).toBeNull();
    });
  });
});
