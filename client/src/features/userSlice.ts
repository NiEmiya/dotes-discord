import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  user: any;
}

const initialState: userState = {
  user: null,
};

export const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
