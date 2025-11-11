import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngreditentsData } from "../../../types";

interface CurrentIngredientState {
  ingredient: IngreditentsData | null;
}

const initialState: CurrentIngredientState = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setCurrentIngredient(
      state,
      action: PayloadAction<IngreditentsData | null>,
    ) {
      state.ingredient = action.payload;
    },
    clearCurrentIngredient(state) {
      state.ingredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
