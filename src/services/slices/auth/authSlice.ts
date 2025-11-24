import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserData,
  login,
  logout,
  register,
  updateUserData,
} from "../../../utils/authApi";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false,
};

export const registerUser = createAsyncThunk<
  { user: User },
  { email: string; password: string; name: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setIsLoading(true));
      const result = await register({ email, password, name });
      if (result.success) {
        const user = { email: result.user.email, name: result.user.name };
        dispatch(setUser(user));
        return { user };
      }
      return rejectWithValue("Authentication failed");
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Some error"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const loginUser = createAsyncThunk<
  { user: User },
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setIsLoading(true));
      const result = await login({ email, password });
      if (result.success) {
        const user = { email: result.user.email, name: result.user.name };
        dispatch(setUser(user));
        return { user };
      }
      return rejectWithValue("Authentication failed");
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Some error"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logOut",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setIsLoading(true));
      const result = await logout();
      if (result.success) {
        dispatch(clearAuth());
        return;
      } else {
        return rejectWithValue("Logout failed");
      }
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Some error"
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    data: { email: string; name: string; password: string },
    { dispatch }
  ) => {
    const result = await updateUserData(data);

    if (result.success) dispatch(setUser(result.user));
    return result;
  }
);

export const fetchAuthUser = createAsyncThunk<
  { user: User | null },
  void,
  {
    rejectValue: string;
  }
>("auth/fetchAuthUser", async (_, { rejectWithValue, dispatch }) => {
  try {
    const result = await getUserData();
    if (result.success) {
      const user = { email: result.user.email, name: result.user.name };
      dispatch(setUser(user));
      return { user };
    }
    return { user: null };
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Some error"
    );
  } finally {
    dispatch(setIsAuthChecked(true));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isAuthChecked = true;
      });
  },
});

export const { setUser, clearAuth, setIsAuthChecked, setIsLoading } =
  authSlice.actions;
export const { getIsAuthChecked } = authSlice.selectors;
export default authSlice.reducer;
