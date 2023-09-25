"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { setUser } from "@/redux/futures/GetUser";
import { Sign__in } from "@/redux/futures/Signin";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Button, Card, CircularProgress, TextField } from "@mui/material";

export default function Siginin() {
  const [validate, setValidate] = useState<any>({
    password: true,
    email: true,
    name: true,
  });
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const { isLoading, error } = useAppSelector((state) => state.Signin);
  const { user } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const labels = [
    {
      label: "Name",
      type: "text",
      target: "name",
      message: "* Please enter valid name",
    },
    {
      label: "Email",
      type: "email",
      target: "email",
      message: "* Please enter valid email",
    },
    {
      label: "Password",
      type: "Password",
      target: "password",
      message: "* Please enter valid password",
    },
  ];

  const validator = () => {
    if (!inputs.name || inputs.name.length < 3) {
      setValidate((prop: any) => ({
        email: true,
        password: true,
        name: false,
      }));
    } else if (!inputs.email) {
      setValidate((prop: any) => ({
        password: true,
        email: false,
        name: true,
      }));
    } else if (!inputs.password || inputs.password.length < 7) {
      setValidate((prop: any) => ({
        email: true,
        password: false,
        name: true,
      }));
    } else {
      setValidate({ email: true, password: true, name: true });
      return true;
    }
  };
  const SignIN = (e: any) => {
    e.preventDefault();
    if (!validator()) {
      return;
    }
    dispatch(Sign__in({ body: inputs, endPoint: "api/user/signin" })).then(
      (res) => {
        dispatch(setUser(res.payload.data));
      }
    );
  };

  useEffect(() => {
    if (user.token) {
      router.push("/");
      setInputs({ email: "", password: "", name: "" });
    }
  }, [user]);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form onSubmit={SignIN} className="flex w-[30%]  ">
        <Card
          className="flex p-5 justify-start rounded-lg w-full h-[550px] items-center flex-col"
          variant="outlined"
        >
          <h1 className="text-center pt-[40px] font-bold text-[2rem] text-dark">
            Sign in
          </h1>
          <div className="flex w-full flex-col gap-5   mt-[40px] justify-start  items-start">
            {labels.map((data) => (
              <Box
                key={data.label}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: "20px",
                  flexDirection: "column",
                  margin: "0",
                }}
                className="w-full"
              >
                <TextField
                  className="bg-white w-full"
                  id={data.label}
                  label={data.label}
                  variant="outlined"
                  type={data.type}
                  onChange={(e: any) => {
                    setInputs((prop: any) => ({
                      ...prop,
                      [data.target]: e.target.value,
                    }));
                  }}
                />
                {!validate[data.target] && (
                  <div className="text-main">{data.message}</div>
                )}
              </Box>
            ))}
          </div>
          <div className=" mt-[20px] flex  items-end justify-start w-full">
            <Link href="/" className="text-dark underline">
              You have an account?
            </Link>
          </div>
          <Button
            variant="contained"
            className="hover:bg-gray-600 cursor-pointer flex gap-5"
            disabled={isLoading}
            style={{
              alignSelf: "flex-end",
              padding: ".75rem",
              marginTop: ".75rem",
              background: isLoading ? "#2e3964fb" : "#141E46",
            }}
            type="submit"
          >
            {!isLoading && <div>Create account</div>}
            {isLoading && <CircularProgress size={"25px"} disableShrink />}
          </Button>
        </Card>
      </form>
    </div>
  );
}
