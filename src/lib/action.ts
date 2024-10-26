// "use server";
// import { NextResponse } from 'next/server'
// import { clerkClient, currentUser } from "@clerk/nextjs/server";

// export async function updateUserRole() {
//   const user = await currentUser();
//   if (!user) {
//     throw new Error("Unauthorized");
//   }

//   const role = "user";

//   await clerkClient.users.updateUserMetadata(user.id, {
//     publicMetadata: {
//       role: role,
//     },
//   });
//   return NextResponse.json({ success: true });
// }
