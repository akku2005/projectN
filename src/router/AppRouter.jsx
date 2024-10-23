import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Auth from "../_auth/Auth";
import { lazy } from "react";
import { RouterData } from "./RouterData";

import Cookies from "js-cookie";
import NotFound from "../_root/pages/PageNotFound";
import MainContent from "../_root/MainContent";

const Signin = lazy(() => import("../_auth/pages/Signin"));
const Signup = lazy(() => import("../_auth/pages/Signup"));
const Dashboard = lazy(() => import("../_root/Dashboard"));
const Devices = lazy(() => import("../_root/pages/Devices"));
const Folder = lazy(() => import("../_root/pages/Folder"));
const Security = lazy(() => import("../_root/pages/SecurityPage"));
const AuthConfigPage = lazy(() => import("../_root/pages/AuthConfigPage"));

const isAuthenticated = () => {
  const token = Cookies.get("userToken");
  return !!token;
};

const protectedLoader = () => {
  if (!isAuthenticated()) {
    return redirect(RouterData.auth.children.signin);
  }
  return null;
};

const authLoader = () => {
  if (isAuthenticated()) {
    return redirect(RouterData.root.dashboard);
  }
  return null;
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Auth />,
        loader: authLoader,
        children: [
          { index: true, element: <Signin /> },
          { path: "sign-up", element: <Signup /> },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: protectedLoader,
        children: [
          { index: true, element: <MainContent /> },
          { path: "devices", element: <Devices /> },
          { path: "folder", element: <Folder /> },
          { path: "security", element: <Security /> },
          { path: "lock", element: <AuthConfigPage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default AppRouter;
