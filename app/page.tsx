import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Home from "@/components/Home";

export default function Root() {
  if (!cookies().get("user")) {
    redirect("/login");
  }
  return <Home />;
}
