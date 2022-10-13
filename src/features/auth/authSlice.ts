import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./authService";
import {
  ICngPassData, IForgotPass, IinitialState,
  ILogin,
  IRegistration
} from "./authTypes";
// Get user from localStorage
const userStr = localStorage.getItem("user");
let user = null;
if (userStr) {
  user = JSON.parse(userStr);
}
const initialState: IinitialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isRegistered: false,
  isPassChanged: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userRegData: IRegistration, thunkAPI) => {
    try {
      return await authService.register(userRegData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user

export const login = createAsyncThunk(
  "auth/login",
  async (userLoginData: ILogin, thunkAPI) => {
    try {
      return await authService.login(userLoginData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.detail) ||
      error.message;
    error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
//forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userMail: IForgotPass, thunkAPI) => {
    try {
      return await authService.passwordForgot(userMail);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (passWithToken: ICngPassData, thunkAPI) => {
    try {
      return await authService.passwordReset(passWithToken);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isRegistered = false;
      state.isPassChanged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<IinitialState>) => {
          state.isLoading = false;
          state.isRegistered = true;
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ILogin>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Login Succesfull");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<IForgotPass>) => {
          state.isLoading = false;
          state.message = action.payload;
          state.isSuccess = true;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<IForgotPass>) => {
          state.isLoading = false;
          state.message = action.payload;
          state.isPassChanged = true;
          state.isSuccess = true;
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
