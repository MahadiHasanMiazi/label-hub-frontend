import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser, IUpdateData, IPassData } from "./userTypes";
import userService from "./userService";
import { toast } from "react-toastify";

let userData: ICurrentUser = {
  dob: "",
  email: "",
  full_name: "",
  gender: "",
  id: 0,
  institution_name: "",
  phone_number: "",
  qualification: "",
  role: 5,
  status: 1,
  validated_data_count:0,
  assigned_data_count:0,

};
const initialState = {
  logedinUser: userData,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get user/me
export const currentUser = createAsyncThunk(
  "user/currentUser",
  async (_, thunkAPI) => {
    try {
      return await userService.logedInUser();
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update user/me
export const updateCurrentUser = createAsyncThunk(
  "user/updateUser",
  async (userRegData: IUpdateData, thunkAPI) => {
    try {
      const resp = await userService.updatelogedInUser(userRegData);
      thunkAPI.dispatch(currentUser());
      return resp;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.detail &&
          error.response.data.detail[0].msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// change user password
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (userPassData: IPassData, thunkAPI) => {
    try {
      const { user }: any = thunkAPI.getState();
      const {
        logedinUser: { id },
      }: any = user;

      const resp = await userService.changeUserPassword(userPassData, id);

      return resp;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(currentUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logedinUser = action.payload;
        state.message = "";
      })
      .addCase(currentUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.logedinUser = userData;
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        updateCurrentUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          toast.success("Profile updated successfull");
          state.logedinUser = action.payload;
        }
      )
      .addCase(
        updateCurrentUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        changeUserPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          toast.success("Password updated successfully");
        }
      )
      .addCase(
        changeUserPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
