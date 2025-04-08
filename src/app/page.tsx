"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { use } from "react";
import { Button } from "~/components/ui/button";
import { login } from "~/lib/actions/auth";
import { api } from "~/trpc/server";

export default function Home() {
  return (
    // redirect("/entity1")
    // <main className="flex min-h-screen flex-col items-center justify-center "></main>
   <div>
      <p className="text-3xl font-bold underline">
      {/* {  redirect("/entity1")} */}
      {/* You are signed In */}
        </p>
        {/* <Button onClick={()=> login()}>Sign In with Github</Button> */}
    </div>
  );
}
