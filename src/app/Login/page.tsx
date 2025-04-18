import dynamic from "next/dynamic";


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
