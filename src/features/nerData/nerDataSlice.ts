import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import nerDataService from "./nerDataService";
import { toast } from "react-toastify";
const initialState: any = {
  unassignedData: null,
  isNerError: false,
  isNerLoading: false,
  isNerSuccess: false,
  nerMessage: "",
};

// ner data assign
export const assignNerData = createAsyncThunk(
  "nerData/assignNerData",
  async (assignData: any, thunkAPI) => {
    const { project_id } = assignData;
    try {
      const assignResp = await nerDataService.assignNerData(assignData);
      thunkAPI.dispatch(unassignNerData(project_id));
      return assignResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get unassigned ner data
export const unassignNerData = createAsyncThunk(
  "nerData/unassignNerData",
  async (projectId: number, thunkAPI) => {
    try {
      return await nerDataService.unassignNerData(projectId);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const nerDataSlice = createSlice({
  name: "nerData",
  initialState,
  reducers: {
    resetNer: (state: any) => {
      state.isNerError = false;
      state.isNerLoading = false;
      state.isNerSuccess = false;
      state.nerMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unassignNerData.pending, (state) => {
        state.isNerLoading = true;
      })
      .addCase(
        unassignNerData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isNerLoading = false;
          state.isNerError = false;
          state.isNerSuccess = true;
          state.unassignedData = action.payload;
        }
      )
      .addCase(
        unassignNerData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isNerLoading = false;
          state.isProjectError = true;
          state.nerMessage = action.payload;
        }
      )
      .addCase(assignNerData.pending, (state) => {
        state.isNerLoading = true;
      })
      .addCase(assignNerData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isNerLoading = false;
        state.isNerError = false;
        state.isNerSuccess = true;
        toast.success("Data assigned successfully");
      })
      .addCase(assignNerData.rejected, (state, action: PayloadAction<any>) => {
        state.isNerLoading = false;
        state.isProjectError = true;
        state.nerMessage = action.payload;
      });
  },
});
export const { resetNer } = nerDataSlice.actions;
export default nerDataSlice.reducer;
