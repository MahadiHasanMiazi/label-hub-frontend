import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import tasksService from "./tasksService";
import { toast } from "react-toastify";
const initialState: any = {
  tasksList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all tasks
export const allTasks = createAsyncThunk(
  "tasks/allTasks",
  async (_, thunkAPI) => {
    try {
      return await tasksService.getAllTasks();
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allTasks.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(allTasks.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasksList = action.payload;
      })
      .addCase(allTasks.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tasksList = null;
      });
  },
});

export const { reset } = tasksSlice.actions;
export default tasksSlice.reducer;
