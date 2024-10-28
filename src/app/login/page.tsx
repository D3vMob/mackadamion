import { currentUser } from "@clerk/nextjs/server";

export default async function LoginPage() {
  const user = await currentUser();
 

  return (
    <>
      <div>LOGIN PAGE</div>
    </>
  );
}
