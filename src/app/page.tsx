import Image from "next/image";
import { auth, signOut } from "@/../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main className="text-2xl text-center flex flex-col gap-5">
      <h1>🚗💨Bilappen!</h1>
      <div>
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirect: false });
            }}
          >
            <button type="submit" className="btn">
              Logout
            </button>
          </form>
        ) : (
          <button className="btn">
            <Link href="/login"> Login</Link>
          </button>
        )}
      </div>
    </main>
  );
}
