import axios from "axios";
import Cookies from "js-cookie";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../endpoint";

type initialState = {
  isLoading: boolean;
  error: string | undefined;
};

type body = { email: string; password: string; name: string };

const initialState: initialState = {
  isLoading: false,
  error: "",
};

export const Sign__in = createAsyncThunk(
  "content/Signin",
  async (body: { endPoint: string; body: body }) => {
    const res = await axios.post(`${BASE_URL}/${body.endPoint}`, body.body);
    const data = await res.data;
    Cookies.set("user", JSON.stringify(data.data));
    return data;
  }
);

export const userSlice = createSlice({
  name: "Signin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Sign__in.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Sign__in.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(Sign__in.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
