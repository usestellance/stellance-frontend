export const authRoutes = {
  LOGIN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  VERIFICATION_SENT: "/auth/verification-sent",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CREATE_FIRST_INVOICE: "/auth/create-first-invoice",
};

export const dashboardRoutes = {
  HOME: "/dashboard",
};
export const invoiceRoutes = {
  INVOICES: "/invoices",
  CREATE: "/invoices/create",
  PREVIEW_INVOICE: (invoice_id:string) => `/invoices/${invoice_id}/preview`
};
export const profileRoutes = {
  PROFILE: "/profile",
};
