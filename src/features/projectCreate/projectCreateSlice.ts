import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITagsType {
  id?: number;
  tags?: any;
  name?: string;
  currentTags?: any;
}

const tagList: ITagsType[] = [];

const initialState: any = {
  tagList,
};

export const createProjectSlice = createSlice({
  name: "createProject",
  initialState,
  reducers: {
    addNewtask: (state, action: PayloadAction<any>) => {
      const tastExist = state.tagList.some(
        (element: any) => element.id === action.payload.id
      );
      if (!tastExist) {
        state.tagList.push(action.payload);
      } else {
        state.tagList = state.tagList.filter(
          (tag: any) => tag.id !== action.payload.id
        );
      }
    },
    addtags: (state, action: PayloadAction<any>) => {
      const { selectedTag, selectedTasks } = action.payload;
      const tagExists = state.tagList.some((element: any) =>
        element.tags.includes(selectedTag)
      );

      if (!tagExists) {
        state.tagList.map((tasks: any) => {
          if (tasks.id === selectedTasks) {
            tasks.tags = [...tasks.tags, selectedTag];
          }
        });
      } else {
        //remove tag if  exists
        state.tagList.map((tasks: any) => {
          if (tasks.id === selectedTasks) {
            tasks.tags = tasks.tags.filter(
              (tagIds: any) => tagIds !== selectedTag
            );
          }
        });
      }
    },
    removeAllTasks: (state) => {
      state.tagList = [];
    },
  },
});

export const { addNewtask, addtags, removeAllTasks } =
  createProjectSlice.actions;
export default createProjectSlice.reducer;
