import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import projectListService from "./projectListService";
import { toast } from "react-toastify";
const initialState: any = {
  projectList: [],
  project: {},
  currentPage: 1,
  isProjectError: false,
  isProjectSuccess: false,
  isProjectLoading: false,
  projectMessage: "",
};

// create new project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData: any, thunkAPI) => {
    try {
      const projectCreateResp = await projectListService.createAProject(
        projectData
      );
      thunkAPI.dispatch(allProjects(initialState.currentPage));
      return projectCreateResp;
    } catch (error: any) {
      const message =
        error.response.data.detail || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete a  project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: number, thunkAPI) => {
    const { projectList }: any = thunkAPI.getState();

    try {
      const projectDelResp = await projectListService.deleteAProject(projectId);
      thunkAPI.dispatch(allProjects(projectList.currentPage));
      return projectDelResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get a  project
export const getAProject = createAsyncThunk(
  "projects/getAProject",
  async (projectId: number, thunkAPI) => {
    try {
      const getAprojectResp = await projectListService.getAProject(projectId);
      return getAprojectResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (updateprojectData: any, thunkAPI) => {
    const { projectList }: any = thunkAPI.getState();
    try {
      const projectData = {
        name: updateprojectData.name,
        description: updateprojectData.description,
      };
      const projectId = updateprojectData.projectId;
      const projectCreateResp = await projectListService.updateAProject(
        projectData,
        projectId
      );
      thunkAPI.dispatch(allProjects(projectList.currentPage));
      //thunkAPI.dispatch(allProjects(projectList.currentPage));
      return projectCreateResp;
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

// get all projects
export const allProjects = createAsyncThunk(
  "projects/allProjects",
  async (projectPayload: any, thunkAPI) => {
  
    try {
      return await projectListService.getAllProjects(projectPayload);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectListSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProject: (state: any) => {
      state.isProjectLoading = false;
      state.isProjectSuccess = false;
      state.isProjectError = false;
      state.projectMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isProjectLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectSuccess = true;
        toast.success("Project created successfully");
      })
      .addCase(createProject.rejected, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectSuccess = false;
        state.isProjectError = true;
        state.projectMessage = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.isProjectLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectSuccess = true;
        toast.success("Project updated successfully");
      })
      .addCase(updateProject.rejected, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectError = true;
        state.projectMessage = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        toast.success("Project Deleted");
      })
      .addCase(deleteProject.rejected, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectError = true;
        state.projectMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(allProjects.pending, (state) => {
        state.isProjectLoading = true;
      })
      .addCase(allProjects.fulfilled, (state, action: PayloadAction<any>) => {
      
        state.isProjectLoading = false;
        state.isProjectSuccess = true;
        state.isProjectError = false;
        state.projectList = action.payload;
      })
      .addCase(allProjects.rejected, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectError = true;
        state.projectMessage = action.payload;
        state.projectList = null;
      })
      .addCase(getAProject.pending, (state) => {
        state.isProjectLoading = true;
      })
      .addCase(getAProject.fulfilled, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectSuccess = true;
        state.isProjectError = false;
        state.project = action.payload;
      })
      .addCase(getAProject.rejected, (state, action: PayloadAction<any>) => {
        state.isProjectLoading = false;
        state.isProjectError = true;
        state.projectMessage = action.payload;
      });
  },
});

export const { resetProject } = projectListSlice.actions;
export default projectListSlice.reducer;
