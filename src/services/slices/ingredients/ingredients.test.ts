import { ingredients } from "../../../utils/ingredients";
import reducer, { fetchIngredients, initialState } from "./ingredientsSlice";

describe("testing Ingredients slice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("fetchIngredients", () => {
    it("should handle fetchIngredients.pending", () => {
      const action = { type: fetchIngredients.pending.type };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        items: [],
        status: "loading",
        error: null,
      });
    });

    it("should handle fetchIngredients.fulfilled", () => {
      const mockIngredients = [ingredients[0], ingredients[1]];
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients,
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        items: mockIngredients,
        status: "succeeded",
        error: null,
      });
    });

    it("should handle fetchIngredients.rejected", () => {
      const errorMessage = "Failed to fetch";
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage },
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        items: [],
        status: "failed",
        error: errorMessage,
      });
    });

    it("should handle fetchIngredients.rejected with default error message", () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: {},
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        items: [],
        status: "failed",
        error: "Failed to fetch ingredients",
      });
    });

    it("should set error to null when pending after rejected", () => {
      const rejectedState = reducer(initialState, {
        type: fetchIngredients.rejected.type,
        error: { message: "Some error" },
      });
      expect(rejectedState.error).toBe("Some error");

      const pendingAction = { type: fetchIngredients.pending.type };
      const result = reducer(rejectedState, pendingAction);
      expect(result.error).toBeNull();
      expect(result.status).toBe("loading");
    });
  });
});
