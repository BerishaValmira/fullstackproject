import dynamic from "next/dynamic";
// import SignUpDialog from "../../features/Auth/AuthDialogUser/user-login";
import { useState } from "react";

const SignUpDialog = dynamic(
  () => import("../../features/Auth/AuthDialogUser/user-login"),
 
  {
    loading: () => <p>Loading...</p>,
    // ssr: false,
  },
);

export default function Page() {
  return (
    <div className="h-screen w-screen -mt-3 -ml-100">
      <SignUpDialog />
    </div>
  );
}
