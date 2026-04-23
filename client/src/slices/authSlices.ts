import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;

};

type AuthState = {
  user: User | null;
  token: string | null;
};

const intialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"), // Initialize token from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
        state.user = null; 
        state.token = null;
        localStorage.removeItem("token"); 
    },

    setToken : (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
    }


  },
});

export const { setUser, logout, setToken} = authSlice.actions;   
export default authSlice.reducer;