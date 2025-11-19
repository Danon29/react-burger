import reducer, {
  postOrder,
  initialState,
  clearOrderNumber,
  setOrderData,
} from "./orderSlice";
import { TOrder } from "../../../types";

describe("testing Order slice", () => {
  const mockOrder: TOrder = {
    _id: "643d69a5c3f7b9001cfa0943",
    ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941"],
    status: "done",
    name: "Краторный space бургер",
    createdAt: "2023-04-15T10:00:00.000Z",
    updatedAt: "2023-04-15T10:05:00.000Z",
    number: 12345,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("postOrder", () => {
    it("should handle postOrder.pending", () => {
      const action = { type: postOrder.pending.type };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        status: "loading",
        error: null,
        order: null,
      });
    });

    it("should handle postOrder.fulfilled", () => {
      const action = {
        type: postOrder.fulfilled.type,
        payload: {
          name: "Краторный space бургер",
          order: mockOrder,
          success: true,
        },
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        status: "succeeded",
        error: null,
        order: mockOrder,
      });
    });

    it("should handle postOrder.rejected", () => {
      const errorMessage = "Failed to post order";
      const action = {
        type: postOrder.rejected.type,
        payload: errorMessage,
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        status: "failed",
        error: errorMessage,
        order: null,
      });
    });

    it("should handle postOrder.rejected with default error message", () => {
      const action = {
        type: postOrder.rejected.type,
        payload: undefined,
      };
      const result = reducer(initialState, action);
      expect(result).toEqual({
        status: "failed",
        error: "Failed to post order",
        order: null,
      });
    });

    it("should set error to null when pending after rejected", () => {
      const rejectedState = reducer(initialState, {
        type: postOrder.rejected.type,
        payload: "Some error",
      });
      expect(rejectedState.error).toBe("Some error");

      const pendingAction = { type: postOrder.pending.type };
      const result = reducer(rejectedState, pendingAction);
      expect(result.error).toBeNull();
      expect(result.status).toBe("loading");
    });
  });

  describe("clearOrderNumber", () => {
    it("should clear order and reset state", () => {
      const stateWithOrder = reducer(initialState, {
        type: postOrder.fulfilled.type,
        payload: {
          name: "Краторный space бургер",
          order: mockOrder,
          success: true,
        },
      });
      const result = reducer(stateWithOrder, clearOrderNumber());
      expect(result).toEqual(initialState);
    });

    it("should clear order even if it's already null", () => {
      const result = reducer(initialState, clearOrderNumber());
      expect(result).toEqual(initialState);
    });
  });

  describe("setOrderData", () => {
    it("should set order data", () => {
      const result = reducer(initialState, setOrderData(mockOrder));
      expect(result.order).toEqual(mockOrder);
      expect(result.status).toBe("idle");
      expect(result.error).toBeNull();
    });

    it("should replace existing order data", () => {
      const stateWithOrder = reducer(initialState, setOrderData(mockOrder));
      const newOrder = { ...mockOrder, _id: "new-order-id", number: 54321 };
      const result = reducer(stateWithOrder, setOrderData(newOrder));
      expect(result.order).toEqual(newOrder);
    });
  });
});
