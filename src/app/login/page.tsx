import { currentUser } from "@clerk/nextjs/server";

export default async function LoginPage() {
  const user = await currentUser();
  console.log(user);
  console.log(user?.publicMetadata?.role);

  return (
    <>
      <div>LOGIN PAGE</div>
    </>
  );
}
