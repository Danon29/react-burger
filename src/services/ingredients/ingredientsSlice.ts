import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngreditentsData } from "../../types";
import { getData } from "../../api";
import { replaceBun } from "../constructor/constructorSlice";

interface IngredientsState {
  items: IngreditentsData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAndSync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData();

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch ingredients";
      });
  },
});

export default ingredientsSlice.reducer;
