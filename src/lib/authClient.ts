import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // must be NEXT_PUBLIC_ for client
});

// import { createAuthClient } from "better-auth/client";
// const authClient = createAuthClient();

// const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "google",
//   });
// };
