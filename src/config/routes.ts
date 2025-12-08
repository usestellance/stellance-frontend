export const authRoutes = {
  LOGIN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  VERIFICATION_SENT: (email: string) =>
    `/auth/sign-up/verification-sent?email=${email}`,
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CREATE_FIRST_INVOICE: "/auth/create-first-invoice",
  COMPLETE_PROFILE: "/auth/setup-account",
};

export const dashboardRoutes = {
  HOME: "/dashboard",
};
export const invoiceRoutes = {
  INVOICES: "/invoices",
  CREATE: "/invoices/create",
  CHOOSE_TEMPLATE: "/invoices/create/choose-template",
  PREVIEW_INVOICE: (invoice_id: string) => `/invoices/${invoice_id}/preview`,
};
export const profileRoutes = {
  PROFILE: "/profile",
};
export const walletRoutes = {
  WALLET: "/wallet",
};
export const receiptRoutes = {
  RECEIPTS: "/receipts",
};
export const notificationRoutes = {
  NOTIFICATIONS: "/notifications",
};

export const backendRoutes = {
  AUTH_ROUTES: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/login",
    RESEND_VERIFICATION_LINK: (email: string) =>
      `/auth/resend-email?email=${email}`,
    VALIDATE_TOKEN: (token: string) => `/auth/validate?token=${token}`,
    RESET_PASSWORD_EMAIL: (email: string) => `/auth/reset?email=${email}`,
  },
  PROFILE_ROUTES:{
    UPDATE_PROFILE: '/profile',
    GET_USER: '/profile/me'
  }
};
