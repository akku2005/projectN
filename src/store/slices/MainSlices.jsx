import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  sideBarToggle: false,
  token: "",
  searchUser: "",
  currentCampaign: "",
  currentUserID: "",
  currentLink: "manage-users",
  currentChangeTaxInformationID: "",
  referCode: "",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSideBarToggle: (state) => {
      state.sideBarToggle = !state.sideBarToggle;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },
    setCurrentCampaign: (state, action) => {
      state.currentCampaign = action.payload;
    },
    setCurrentUserID: (state, action) => {
      state.currentUserID = action.payload;
    },
    setCurrentLink: (state, action) => {
      state.currentLink = action.payload;
    },
    setCurrentChangeTaxInformationID: (state, action) => {
      state.currentChangeTaxInformationID = action.payload;
    },
    setReferCode: (state, action) => {
      state.referCode = action.payload;
    },
  },
});

export const {
  setUser,
  setSideBarToggle,
  setToken,
  setSearchUser,
  setCurrentCampaign,
  setCurrentUserID,
  setCurrentLink,
  setCurrentChangeTaxInformationID,
  setReferCode,
} = mainSlice.actions;
export default mainSlice.reducer;
