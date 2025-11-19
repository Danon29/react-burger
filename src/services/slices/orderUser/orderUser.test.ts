import reducer, { initialState } from "./orderUserSlice";
import {
  onOpen,
  onMessage,
  onError,
  onClose,
} from "../../actions/ordersUserSocketActions";
import { WebSocketStatus, TOrder } from "../../../types";

describe("testing OrderUser slice", () => {
  const mockOrders: TOrder[] = [
    {
      _id: "643d69a5c3f7b9001cfa0943",
      ingredients: ["643d69a5c3f7b9001cfa093c"],
      status: "pending",
      name: "Краторный space бургер",
      createdAt: "2023-04-15T10:00:00.000Z",
      updatedAt: "2023-04-15T10:05:00.000Z",
      number: 12345,
    },
    {
      _id: "643d69a5c3f7b9001cfa0944",
      ingredients: ["643d69a5c3f7b9001cfa0941"],
      status: "done",
      name: "Биокотлетный бургер",
      createdAt: "2023-04-15T11:00:00.000Z",
      updatedAt: "2023-04-15T11:05:00.000Z",
      number: 12346,
    },
  ];

  const sortedMockOrders: TOrder[] = [mockOrders[1], mockOrders[0]];

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("WebSocket actions", () => {
    it("should handle onOpen", () => {
      const action = onOpen();
      const result = reducer(initialState, action);
      expect(result.status).toBe(WebSocketStatus.ONLINE);
      expect(result.orders).toEqual([]);
      expect(result.error).toBeNull();
    });

    it("should handle onMessage", () => {
      const action = onMessage({
        orders: mockOrders,
        total: 100,
        totalToday: 10,
      });
      const result = reducer(initialState, action);
      expect(result.orders).toEqual(sortedMockOrders);
      expect(result.gotFirstMessage).toBe(true);
    });

    it("should sort orders by number descending on message", () => {
      const unsortedOrders: TOrder[] = [
        { ...mockOrders[0], number: 100 },
        { ...mockOrders[1], number: 200 },
      ];
      const action = onMessage({
        orders: unsortedOrders,
        total: 100,
        totalToday: 10,
      });
      const result = reducer(initialState, action);
      expect(result.orders[0].number).toBe(200);
      expect(result.orders[1].number).toBe(100);
      expect(result.gotFirstMessage).toBe(true);
    });

    it("should handle onError", () => {
      const errorMessage = "WebSocket connection error";
      const action = onError(errorMessage);
      const result = reducer(initialState, action);
      expect(result.error).toBe(errorMessage);
      expect(result.status).toBe(WebSocketStatus.OFFLINE);
    });

    it("should handle onClose", () => {
      const onlineState = reducer(initialState, onOpen());
      expect(onlineState.status).toBe(WebSocketStatus.ONLINE);

      const action = onClose();
      const result = reducer(onlineState, action);
      expect(result.status).toBe(WebSocketStatus.OFFLINE);
    });

    it("should update orders on subsequent messages", () => {
      const firstMessage = reducer(initialState, onOpen());
      const withOrders = reducer(
        firstMessage,
        onMessage({
          orders: [mockOrders[0]],
          total: 50,
          totalToday: 5,
        }),
      );

      const secondMessage = reducer(
        withOrders,
        onMessage({
          orders: mockOrders,
          total: 100,
          totalToday: 10,
        }),
      );

      expect(secondMessage.orders).toEqual(sortedMockOrders);
      expect(secondMessage.gotFirstMessage).toBe(true);
    });

    it("should handle error after successful connection", () => {
      const connectedState = reducer(initialState, onOpen());
      const withOrders = reducer(
        connectedState,
        onMessage({
          orders: mockOrders,
          total: 100,
          totalToday: 10,
        }),
      );

      const errorAction = onError("Connection lost");
      const result = reducer(withOrders, errorAction);
      expect(result.status).toBe(WebSocketStatus.OFFLINE);
      expect(result.error).toBe("Connection lost");
      expect(result.orders).toEqual(sortedMockOrders);
    });
  });
});
