// Auth Routes
export const signUpRoute = "/auth/sign-up";
export const verificationRoute = (email: string) =>
  `/auth/sign-up/verification-sent?email=${email}`;
export const signInRoute = "/auth/sign-in";
export const accountSetUpRoute = "/auth/account-setup";
export const createFirstInvoiceRoute = "/auth/create-first-invoice";

// DashBoard Routes
export const dashboardRoute = "/dashboard";
export const invoiceRoute = "/invoice";
