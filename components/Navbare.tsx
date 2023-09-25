"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { restUser } from "@/redux/futures/GetUser";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Avatar, Button } from "@mui/material";

export default function Navbare() {
  const { user } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    user.token && (
      <nav className="flex h-[80px] justify-between shadow-sm items-center p-4">
        <Avatar alt={user.name} src="" />
        <p>{user.name}</p>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(restUser("rest"));
            Cookies.remove("user");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </nav>
    )
  );
}
