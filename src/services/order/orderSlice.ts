import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customRequest } from "../../utils/http";

interface OrderState {
  orderNumber: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orderNumber: null,
  status: "idle",
  error: null,
};

interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

interface PostOrderPayload {
  ingredients: string[];
}

export const postOrder = createAsyncThunk<
  OrderResponse,
  PostOrderPayload,
  { rejectValue: string }
>("order/postOrder", async (payload, { rejectWithValue }) => {
  try {
    const data = await customRequest(`/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Some error",
    );
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderNumber(state) {
      state.orderNumber = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderNumber = action.payload.order.number.toString();
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post order";
      });
  },
});

export const { clearOrderNumber } = orderSlice.actions;
export default orderSlice.reducer;
