import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userListService from "./userListService";
import { toast } from "react-toastify";
import { IinitialState } from "./userListType";
const initialState: IinitialState = {
  users: [],
  userGroups: [],
  singleUser:{},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all user
export const allUser = createAsyncThunk(
  "userList/allUser",
  async (userPayload: any, thunkAPI) => {
    try {
      return await userListService.getAllUsers(userPayload);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get a user by id
export const getSingleUser = createAsyncThunk(
  "userList/getSingleUser",
  async (userId: any, thunkAPI) => {
    try {
      return await userListService.getSingleUser(userId);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get all group of a user
export const allGroupOfUser = createAsyncThunk(
  "userList/allGroupOfUser",
  async (userPayload: any, thunkAPI) => {
    try {
      return await userListService.getAllGroupOfUser(userPayload);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// delete a  user
export const deleteUser = createAsyncThunk(
  "userList/deleteUser",
  async (userId: number, thunkAPI) => {
    try {
      const userDelResp = await userListService.deleteAuser(userId);
      const userPayload = {};
      thunkAPI.dispatch(allUser(userPayload));
      return userDelResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update user status
export const updateUserStatus = createAsyncThunk(
  "userList/updateUserStatus",
  async (userId: number, thunkAPI) => {
    try {
      const userUpdateResp = await userListService.updateAuser(userId);
      const userPayload = {};
      thunkAPI.dispatch(allUser(userPayload));
      return userUpdateResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// create new user
export const createUser = createAsyncThunk(
  "userList/createUser",
  async (userData: any, thunkAPI) => {
    try {
      const userCreateResp = await userListService.createAuser(userData);
      const userPayload = {};
      thunkAPI.dispatch(allUser(userPayload));
      return userCreateResp;
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

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    resetUserList: (state: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(allUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(allUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = null;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        toast.success("User created successfully");
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        toast.success("User Deleted");
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          toast.success("User Activated");
        }
      )
      .addCase(
        updateUserStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        }
      )
      .addCase(allGroupOfUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(
        allGroupOfUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.userGroups = action.payload;
        }
      )
      .addCase(allGroupOfUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userGroups = [];
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getSingleUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.singleUser = action.payload;
        }
      )
      .addCase(getSingleUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.singleUser = {};
      });
  },
});

export const { resetUserList } = userListSlice.actions;
export default userListSlice.reducer;
