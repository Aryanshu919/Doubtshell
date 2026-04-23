// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";
import questionReducer from "../slices/questionSlices";
import profileReducer from "../slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;