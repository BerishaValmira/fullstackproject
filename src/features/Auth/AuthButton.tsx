"use server";



import { signIn } from "~/auth";
import { SignInButton } from "./Sign-in-button";
 
export default function Auth() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
} 