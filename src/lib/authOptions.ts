import GitHubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const authOptions: NextAuthConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin", 
    signOut: "/auth/signout",
    error: "/auth/error", 
    verifyRequest: "/auth/verify-request", // (used for check email message)
  
  },
  secret: process.env.NEXTAUTH_SECRET,
};