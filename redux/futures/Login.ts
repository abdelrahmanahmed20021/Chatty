import axios from "axios";
import Cookies from "js-cookie";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../endpoint";

type initialState = {
  isLoading: boolean;
  error: string | undefined;
};

type body = { email: string; password: string };

const initialState: initialState = {
  isLoading: false,
  error: "",
};

export const Login__in = createAsyncThunk(
  "content/Login",
  async (body: { endPoint: string; body: body }) => {
    const res = await axios.post(`${BASE_URL}/${body.endPoint}`, body.body);
    const data = await res.data;
    Cookies.set("user", JSON.stringify(data.data));
    return data;
  }
);

export const userSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    restError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login__in.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Login__in.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(Login__in.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { restError } = userSlice.actions;
export default userSlice.reducer;
