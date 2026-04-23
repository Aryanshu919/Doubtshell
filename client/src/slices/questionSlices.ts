import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Question = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  isSolved: boolean;
  imageUrl?: string;
  anonymous: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
 
};

const initialState: { questions: Question[] } = {
  questions: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },

  },
});

export const { setQuestions} = questionSlice.actions;
export default questionSlice.reducer;