import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { auth } from "@/../auth";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect("/minside");
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
