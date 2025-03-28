import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    redirect("/entity1")
    // <main className="flex min-h-screen flex-col items-center justify-center "></main>
  );
}
