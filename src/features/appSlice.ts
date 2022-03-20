import { createSlice } from "@reduxjs/toolkit";

export interface appState {
  app: any;
  channelId: any;
  channelName: any;
}

const initialState: appState = {
  app: null,
  channelId: null,
  channelName: null,
};

export const appSlice: any = createSlice({
  name: "app",
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = appSlice.actions;
export const selectChannelId = (state: any) => state.app.channelId;
export const selectChannelName = (state: any) => state.app.channelName;

export default appSlice.reducer;
