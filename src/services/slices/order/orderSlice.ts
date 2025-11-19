import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../../types";
import { loadOrderApi } from "../../../api";
import { fetchWithAuth } from "../../../utils/authApi";

interface OrderState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  order: TOrder | null;
}

export const initialState: OrderState = {
  status: "idle",
  error: null,
  order: null,
};

interface OrderResponse {
  name: string;
  order: TOrder;
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
    return await fetchWithAuth(`/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Some error"
    );
  }
});

export const loadOrder = createAsyncThunk(
  "order/getOrder",
  async (number: number, { dispatch }) => {
    const getOrderResult = await loadOrderApi(number);
    if (getOrderResult.success) {
      dispatch(setOrderData(getOrderResult.orders[0]));
    }
    return getOrderResult;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderNumber(state) {
      state.order = null;
      state.status = "idle";
      state.error = null;
    },
    setOrderData: (state, action: PayloadAction<TOrder>) => {
      state.order = action.payload;
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
        state.order = action.payload.order;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post order";
      });
  },
});

export const { clearOrderNumber, setOrderData } = orderSlice.actions;
export default orderSlice.reducer;
