"use client";

import  { Button } from "~/components/ui/button";
import { login } from "~/lib/actions/auth";


export const SignInButton = () => {
    return(
        <Button onClick={()=> login()}>Sign In with Github</Button>
    )
 
}