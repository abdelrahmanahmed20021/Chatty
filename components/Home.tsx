"use client";
import { useEffect } from "react";

import { setUser } from "@/redux/futures/GetUser";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export default function Home() {
  const { user } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUser("user"));
  }, []);
  return <div>{user.email}</div>;
}
