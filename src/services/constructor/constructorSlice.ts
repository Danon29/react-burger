import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngreditentsData } from "../../types";

interface ConstructorState {
  bun: IngreditentsData | null;
  items: IngreditentsData[];
  counts: Record<string, number>;
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
    addConstructorIngredient(state, action: PayloadAction<IngreditentsData>) {
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
