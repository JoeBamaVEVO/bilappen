import { auth } from "@/../auth";

export default async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1 className="text-center text-2xl">Heisann {session?.user?.uuid}</h1>
      <div></div>
    </div>
  );
}
