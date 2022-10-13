import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import projectGroupService from "./projectGroupService";
const initialState: any = {
    projectGroupList: [],
    groupInformation: [],
    currentPage: 1,
    isGroupError: false,
    isGroupSuccess: false,
    isGroupLoading: false,
    groupMessage: "",
};

// get all groups of a project
export const allGroupOfProject = createAsyncThunk(
  "projectGroup/allGroupOfProject",
  async (groupPayload: any, thunkAPI) => {
    try {
      return await projectGroupService.getAllGroupOfAProject(
        groupPayload.currentProjectId,
        groupPayload.currentPage,
        groupPayload.limit,
        groupPayload.searchKey
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

export const viewGroup = createAsyncThunk(
    "projectGroup/viewGroup",
    async (groupPayload: any, thunkAPI) => {
        const { currentProjectId, groupId } = groupPayload;
        try {
            return await projectGroupService.getGroup(
                currentProjectId,
                groupId
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

// delete a  group of a project
export const deleteGroupofProject = createAsyncThunk(
  "projectGroup/deleteGroupofProject",
  async (groupData: number, thunkAPI) => {
    const { projectGroupList }: any = thunkAPI.getState();
    const { groupId, projectId }: any = groupData;
    const groupPayload = {
      currentProjectId: projectId,
      currentPage: projectGroupList.currentPage,
    };
    try {
      const projectGroupDelResp =
        await projectGroupService.deleteGroupOfAProject(groupId);
      thunkAPI.dispatch(allGroupOfProject(groupPayload));
      return projectGroupDelResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// lock or unlock  a  group of a project
export const lockUnlockGroupofProject = createAsyncThunk(
  "projectGroup/lockUnlockGroupofProject",
  async (groupLockUnlock: any, thunkAPI) => {
    const { projectGroupList }: any = thunkAPI.getState();
    const { groupId, is_locked, projectId }: any = groupLockUnlock;
    const groupPayload = {
      currentProjectId: projectId,
      currentPage: projectGroupList.currentPage,
    };
    const lockUnlockData = {
      groupId,
      is_locked,
    };
    try {
      const projectGroupDelResp =
        await projectGroupService.lockUnlockGroupOfAProject(lockUnlockData);
      thunkAPI.dispatch(allGroupOfProject(groupPayload));
      return projectGroupDelResp;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// create  a  group of a project
export const createGroupofProject = createAsyncThunk(
  "projectGroup/createGroupofProject",
  async (groupData: any, thunkAPI) => {
    const { projectGroupList }: any = thunkAPI.getState();
    const { project_id }: any = groupData;
    const getGroups = {
      currentProjectId: project_id,
      currentPage: projectGroupList.currentPage,
    };

    try {
      const projectGroupCreateRes =
        await projectGroupService.createGroupOfAProject(groupData);
      thunkAPI.dispatch(allGroupOfProject(getGroups));
      return projectGroupCreateRes;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectGroupSlice = createSlice({
  name: "projectGroup",
  initialState,
  reducers: {
    resetGroup: (state: any) => {
      state.isGroupLoading = false;
      state.isGroupSuccess = false;
      state.isGroupError = false;
      state.groupMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewGroup.pending, (state) => {
        state.isGroupLoading = true;
      })
      .addCase(
          viewGroup.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupSuccess = true;
          state.isGroupError = false;
          state.groupInformation = action.payload;
        }
      )
      .addCase(
          viewGroup.rejected,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = true;
          state.groupMessage = action.payload;
            state.groupInformation = null;
        }
      )
        .addCase(allGroupOfProject.pending, (state) => {
            state.isGroupLoading = true;
        })
        .addCase(
            allGroupOfProject.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isGroupLoading = false;
                state.isGroupSuccess = true;
                state.isGroupError = false;
                state.projectGroupList = action.payload;
                state.currentPage = action.payload.page;
            }
        )
        .addCase(
            allGroupOfProject.rejected,
            (state, action: PayloadAction<any>) => {
                state.isGroupLoading = false;
                state.isGroupError = true;
                state.groupMessage = action.payload;
                state.projectGroupList = null;
            }
        )
      .addCase(
        deleteGroupofProject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = false;
          state.isGroupSuccess = true;
          toast.success("Group Deleted");
        }
      )
      .addCase(
        deleteGroupofProject.rejected,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = true;
          state.groupMessage = action.payload;
          toast.error(action.payload);
        }
      )
      .addCase(lockUnlockGroupofProject.pending, (state) => {
        state.isGroupLoading = true;
      })
      .addCase(
        lockUnlockGroupofProject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = false;
          state.isGroupSuccess = true;
          //toast.success("Group Deleted");
        }
      )
      .addCase(
        lockUnlockGroupofProject.rejected,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = true;
          state.groupMessage = action.payload;
          toast.error(action.payload);
        }
      )
      .addCase(createGroupofProject.pending, (state) => {
        state.isGroupLoading = true;
      })
      .addCase(
        createGroupofProject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = false;
          state.isGroupSuccess = true;
          toast.success("Group created successfully!");
        }
      )
      .addCase(
        createGroupofProject.rejected,
        (state, action: PayloadAction<any>) => {
          state.isGroupLoading = false;
          state.isGroupError = true;
          state.groupMessage = action.payload;
          toast.error(action.payload);
        }
      );
  },
});

export const { resetGroup } = projectGroupSlice.actions;
export default projectGroupSlice.reducer;
