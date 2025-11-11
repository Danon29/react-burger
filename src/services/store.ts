import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import * as ordersAllSocketActions from "./actions/ordersFeedSocketActions";
import * as ordersUserSocketActions from "./actions/ordersUserSocketActions";

const socketMiddlewareFeedOrders = socketMiddleware(
  {
    connect: ordersAllSocketActions.wsConnect,
    disconnect: ordersAllSocketActions.wsDisconnect,
    onOpen: ordersAllSocketActions.onOpen,
    onMessage: ordersAllSocketActions.onMessage,
    onError: ordersAllSocketActions.onError,
    onClose: ordersAllSocketActions.onClose,
  },
  true
);

const socketMiddlewareUserOrders = socketMiddleware(
  {
    connect: ordersUserSocketActions.wsConnect,
    disconnect: ordersUserSocketActions.wsDisconnect,
    onOpen: ordersUserSocketActions.onOpen,
    onMessage: ordersUserSocketActions.onMessage,
    onError: ordersUserSocketActions.onError,
    onClose: ordersUserSocketActions.onClose,
  },
  true
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(socketMiddlewareFeedOrders, socketMiddlewareUserOrders),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
