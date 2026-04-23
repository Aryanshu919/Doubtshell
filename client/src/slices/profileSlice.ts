import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  bookmarks: string[];
};

const initialState: { profile: UserProfile | null } = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      if (!state.profile) return;

      const questionId = action.payload;

      const exists = state.profile.bookmarks.includes(questionId);

      if (exists) {
        state.profile.bookmarks = state.profile.bookmarks.filter(
          (id) => id !== questionId,
        );
      } else {
        state.profile.bookmarks.push(questionId);
      }
    },
  },
});

export const { setProfile, clearProfile, toggleBookmark } = profileSlice.actions;
export default profileSlice.reducer;
