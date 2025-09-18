import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredients/ingredientsSlice";
import constructorReducer from "../services/constructor/constructorSlice";
import currentIngredientReducer from "../services/currentIngredient/currentIngredientSlice";
import orderReducer from "../services/order/orderSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorState: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
