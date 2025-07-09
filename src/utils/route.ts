// Auth Routes
export const signUpRoute = "/auth/sign-up";
export const verificationRoute = (email: string) =>
  `/auth/sign-up/verification-sent?email=${email}`;
export const verifyEmailRoute = `/auth/sign-up/verify-email`;
export const signInRoute = "/auth/sign-in";
export const accountSetUpRoute = "/auth/account-setup";
export const createFirstInvoiceRoute = "/auth/create-first-invoice";
export const forgotPasswordRoute = "/auth/forgot-password";
export const resetSentRoute = (email: string) =>
  `/auth/forgot-password/reset-sent?email=${email}`;

// DashBoard Routes
export const dashboardRoute = "/dashboard";

//Invoice routes
export const invoiceRoute = "/invoice";
export const createInvoiceRoute = "/invoice/create";
export const previewInvoiceRoute = (id: string) => `/invoice/${id}`;

//profile routes
export const profileRoute = "/profile";


//client routes
export const clientViewInvoiceRoute = (invoice_url: string) =>
  `/client/search?url=${invoice_url}`;

//wallet routes
export const walletRoute = "/wallet";