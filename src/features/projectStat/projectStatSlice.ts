import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ProjectsStatService from "./projectStatService";

const initialState: any = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    projectStatInformation: []
};

export const getAllStatus = createAsyncThunk(
    "projectStat/getAllStatus",
    async (_, thunkAPI) => {
        
        try {
            return await ProjectsStatService.getProjectStat();
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.detail) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const projectStatSlice = createSlice({
    name: "projectStat",
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
            .addCase(getAllStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getAllStatus.fulfilled,
                (state, action: PayloadAction<any>) => {

                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.projectStatInformation = action.payload
                }
            )
            .addCase(
                getAllStatus.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.projectStatInformation = []
                }
            );
    },
});

export const { reset } = projectStatSlice.actions;
export default projectStatSlice.reducer;
