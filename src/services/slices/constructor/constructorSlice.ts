import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngreditentsData } from "../../../types";
import { v4 as uuidv4 } from "uuid";

interface ConstructorState {
  bun: IngreditentsData | null;
  items: ConstructorIngredient[];
  counts: Record<string, number>;
}

interface ConstructorIngredient extends IngreditentsData {
  uniqueId: string;
}

const initialState: ConstructorState = {
  bun: null,
  items: [],
  counts: {},
};

interface ReorderPayload {
  dragIndex: number;
  hoverIndex: number;
}

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addConstructorIngredient: {
      reducer(state, action: PayloadAction<ConstructorIngredient>) {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
        } else {
          state.items.push(action.payload);
          const id = action.payload._id;
          if (state.counts[id]) {
            state.counts[id] += 1;
          } else {
            state.counts[id] = 1;
          }
        }
      },
      prepare(ingredient: IngreditentsData) {
        return { payload: { ...ingredient, uniqueId: uuidv4() } };
      },
    },
    replaceBun(state, action: PayloadAction<IngreditentsData>) {
      state.bun = action.payload;
    },
    removeConstructorIngredient(state, action: PayloadAction<number>) {
      const removedItem = state.items[action.payload];
      if (removedItem) {
        const id = removedItem._id;
        if (state.counts[id]) {
          state.counts[id] -= 1;
          if (state.counts[id] <= 0) {
            delete state.counts[id];
          }
        }
      }
      state.items = [
        ...state.items.slice(0, action.payload),
        ...state.items.slice(action.payload + 1),
      ];
    },
    clearConstructor(state) {
      state.bun = null;
      state.items = [];
      state.counts = {};
    },
    reorderIngredients(state, action: PayloadAction<ReorderPayload>) {
      const { dragIndex, hoverIndex } = action.payload;
      const item = state.items[dragIndex];
      state.items.splice(dragIndex, 1);
      state.items.splice(hoverIndex, 0, item);
    },
  },
});

export const {
  addConstructorIngredient,
  removeConstructorIngredient,
  clearConstructor,
  replaceBun,
  reorderIngredients,
} = constructorSlice.actions;

export default constructorSlice.reducer;
