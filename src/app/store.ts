import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import projectListReducer from "../features/projectList/projectListSlice";
import projectGroupListReducer from "../features/projectGroup/projectGroupSlice";
import taskReducer from "../features/tasks/tasksSlice";
import userReducer from "../features/user/userSlice";
import userListReducer from "../features/userList/userListSlice";
import projectDataReducer from "../features/projectData/projectDataSlice";
import projectStatReducer from "../features/projectStat/projectStatSlice";
import nerDataReducer from "../features/nerData/nerDataSlice";
import projectCreateReducer from "../features/projectCreate/projectCreateSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "auth",
    "tasks",
    "userList",
    "projectList",
    "projectGroupList",
    "projectServiceData",
    "projectStatus",
    "nerDataReducer",
    "projectCreate",
  ],
};

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userList: userListReducer,
  tasks: taskReducer,
  projectList: projectListReducer,
  projectGroupList: projectGroupListReducer,
  projectServiceData: projectDataReducer,
  projectStatus: projectStatReducer,
  nerData: nerDataReducer,
  projectCreate: projectCreateReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
