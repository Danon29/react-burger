import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients/ingredientsSlice";
import constructorReducer from "./slices/constructor/constructorSlice";
import currentIngredientReducer from "./slices/currentIngredient/currentIngredientSlice";
import orderReducer from "./slices/order/orderSlice";
import authReducer from "./slices/auth/authSlice";
import ordersFeed from "./slices/ordersFeed/ordersFeed";
import ordersUser from "./slices/orderUser/orderUserSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorState: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  ordersFeed: ordersFeed,
  ordersUser: ordersUser,
  auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
