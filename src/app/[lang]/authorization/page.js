import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Login from "./(views)/Login/Login";

export default async function AuthPage() {
  const session = await auth0.getSession();

  if (session) redirect("/");

  return <Login />;
}
