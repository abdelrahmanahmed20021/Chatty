"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { setUser } from '@/redux/futures/GetUser';
import {
  Login__in,
  restError,
} from '@/redux/futures/Login';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hook';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
} from '@mui/material';

type Label = {
  label: string;
  type: string;
  message: string;
  register: string;
};

export default function Login() {
  const [validate, setValidate] = useState<any>({
    password: true,
    email: true,
  });
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.Login);
  const { user } = useAppSelector((state) => state.User);
  const router = useRouter();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const labels: Label[] = [
    {
      label: "Email",
      type: "email",
      message: "* please enter valid email",
      register: "email",
    },
    {
      label: "Password",
      type: "password",
      message: "* please enter valid password",
      register: "password",
    },
  ];

  const validator = () => {
    if (!inputs.email) {
      setValidate((prop: any) => ({ password: true, email: false }));
    } else if (!inputs.password || inputs.password.length < 7) {
      setValidate((prop: any) => ({ email: true, password: false }));
    } else {
      setValidate({ email: true, password: true });
      return true;
    }
  };

  const LoginUser = (e: any) => {
    e.preventDefault();
    const vd = validator();

    console.log(inputs.email);

    if (!vd) return;

    dispatch(
      Login__in({
        body: { email: inputs.email, password: inputs.password },
        endPoint: "api/user/login",
      })
    ).then((res) => {
      dispatch(setUser(res.payload.data));
    });
  };

  useEffect(() => {
    if (user.token) {
      router.push("/");
      setInputs({ email: "", password: "" });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(restError(""));
      }, 2000);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form onSubmit={LoginUser} className="w-[30%]">
        <Card
          className="flex p-5 justify-start rounded-lg  h-max items-center flex-col"
          variant="outlined"
        >
          <h1 className="text-center pt-[40px] font-bold text-[2rem] text-dark">
            Login in
          </h1>
          <div className="flex w-full flex-col gap-5   mt-[40px] justify-start  items-start">
            {error && (
              <h2 className="bg-main  w-full p-5 font-bold rounded-sm text-light text-center">
                Wrong email or password
              </h2>
            )}
            {labels.map((data) => (
              <Box
                key={data.label}
                sx={{
                  display: "flex",
                  alignItems: "end",
                  gap: "20px",
                  flexDirection: "column",
                  margin: "0",
                }}
                className="w-full"
              >
                <div className="w-full flex flex-col gap-3 items-end">
                  <TextField
                    className="bg-white w-full"
                    id={data.label}
                    label={data.label}
                    variant="outlined"
                    type={data.type}
                    focused={!validate[data.register]}
                    color={!validate[data.register] ? "error" : "primary"}
                    onChange={(e: any) => {
                      setValidate({ email: true, password: true });
                      setInputs((prop: any) => ({
                        ...prop,
                        [data.register]: e.target.value,
                      }));
                    }}
                  />
                  {!validate[data.register] && (
                    <div className="text-main">{data.message}</div>
                  )}
                </div>
              </Box>
            ))}
          </div>
          <div className=" mt-[20px] flex  items-end justify-start w-full">
            <Link href="/signin" className="text-dark underline">
              You don't have an account?
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
