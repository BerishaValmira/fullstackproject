"use client";

import { signIn, signOut } from "next-auth/react";

export const login = async () => {
    await signIn("github", {
        redirectTo: "/entity1",
        // callbackUrl: "/entity1",
    });
};
export const logout = async () => {
    await signOut({
        redirectTo: "/",
    });
};
