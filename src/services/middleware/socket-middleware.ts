import { Middleware } from "@reduxjs/toolkit";
import type {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export type WSActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  send?: ActionCreatorWithPayload<S>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R, S>(
  wsActions: WSActions<R, S>,
  withTokenRefresh: boolean = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      send,
    } = wsActions;
    const { dispatch } = store;

    return (next) => (action) => {
      if (connect.match(action)) {
        debugger;

        socket = new WebSocket(action.payload);
        if (onConnecting) dispatch(onConnecting());

        socket.onopen = () => {
          console.log("WebSocket onopen");
          if (onOpen) dispatch(onOpen());
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          const errorMessage = `WebSocket connection error: ${action.payload}`;
          dispatch(onError(errorMessage));
        };

        socket.onclose = (event) => {
          console.log("WebSocket onclose", event.code, event.reason);
          if (onClose) dispatch(onClose());
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (
              withTokenRefresh &&
              data.message === "Invalid or missing token"
            ) {
              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(data));
          } catch (e) {
            dispatch(onError((e as Error).message));
          }
        };

        return;
      }

      if (socket && send?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (e) {
          dispatch(onError((e as Error).message));
        }

        return;
      }

      if (socket && disconnect.match(action)) {
        socket.close();
        socket = null;

        return;
      }

      next(action);
    };
  };
};
