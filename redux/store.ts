import { configureStore } from "@reduxjs/toolkit";

import User from "./futures/GetUser";
import Login from "./futures/Login";
import Signin from "./futures/Signin";

export const store = configureStore({
  reducer: {
    Login,
    Signin,
    User,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
