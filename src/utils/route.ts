// Auth Routes
export const signUpRoute = "/auth/sign-up";
export const verificationRoute = (email: string) =>
  `/auth/sign-up/verification-sent?email=${email}`;
export const signInRoute = "/auth/sign-in";
export const accountSetUpRoute = "/auth/account-setup";
