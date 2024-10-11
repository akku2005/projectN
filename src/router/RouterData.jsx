export const RouterData = {
  auth: {
    path: "/auth",
    children: {
      signin: "/auth/sign-in",
      signup: "/auth/sign-up",
      forgotPassword: "/auth/forgot-password",
    },
  },
  root: {
    dashboard: "/dashboard",
    settings: "/settings",
  },
};
