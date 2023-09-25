import Cookies from "js-cookie";

import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type InitialState = {
  user: User;
};

const initialState: InitialState = {
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
  },
};

export const userSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!Cookies.get("user")) return;
      state.user = JSON.parse(Cookies.get("user")!);
    },
    restUser: (state, action) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, restUser } = userSlice.actions;
export default userSlice.reducer;
