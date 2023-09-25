import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  if (cookies().get("user")) {
    redirect("/");
  }
  return children;
}
