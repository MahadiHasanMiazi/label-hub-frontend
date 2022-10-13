import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import projectDataService from "./projectDataService";
import {toast} from "react-toastify";
const initialState: any = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const serviceFileUpload = createAsyncThunk(
    "projectData/upload",
    async (projectData: any, thunkAPI) => {
        try {
            return await projectDataService.projectDataUpload(
                projectData.file,
                projectData.projectId,
                projectData.tasksList
            );
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.detail) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const projectDataSlice = createSlice({
    name: "projectData",
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
            .addCase(serviceFileUpload.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                serviceFileUpload.fulfilled,
                (state, action: PayloadAction<any>) => {

                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    toast.success("File successfully uploaded");
                }
            )
            .addCase(
                serviceFileUpload.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                }
            );
    },
});

export const { reset } = projectDataSlice.actions;
export default projectDataSlice.reducer;
