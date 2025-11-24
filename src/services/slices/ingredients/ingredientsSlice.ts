import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IngreditentsData } from "../../../types";
import { getData } from "../../../api";

interface IngredientsState {
  items: IngreditentsData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: IngredientsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAndSync",
  async (_, { rejectWithValue }) => {
    try {
      return await getData();
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
  selectors: {
    getIngredients: (state) => state.items,
  },
});

export const { getIngredients } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;

export const getIngredientsDict = createSelector(
  [getIngredients],
  (ingredients: IngreditentsData[]) =>
    ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient._id] = ingredient;
        return acc;
      },
      {} as Record<IngreditentsData["_id"], IngreditentsData>
    )
);
