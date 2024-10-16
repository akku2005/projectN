// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import Auth from "../_auth/Auth";
// import { lazy } from "react";
// import Dashboard from "../_root/Dashboard";
// import { RouterData } from "./RouterData";
// import OverViews from "../_root/pages/OverViews";
// import Settings from "../_root/pages/Settings";

// const Signin = lazy(() => import("../_auth/pages/Signin"));
// const Signup = lazy(() => import("../_auth/pages/Signup"));

// // // Helper function to check if user is authenticated
// // const isAuthenticated = () => {
// //   const token = Cookies.get("userToken");
// //   return token;
// // };

// // // Loader function for protected routes
// // const protectedLoader = () => {
// //   if (!isAuthenticated()) {
// //     return redirect(RouterData.auth.children.signin);
// //   }
// //   return null;
// // };

// // // Loader function for auth routes
// // const authLoader = () => {
// //   if (isAuthenticated()) {
// //     return redirect(RouterData.root.dashboard);
// //   }
// //   return null;
// // };

// const AppRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     // loader: protectedLoader,
//     children: [
//       {
//         path: "/",
//         element: <Dashboard />,
//         children: [
//           {
//             path: RouterData.root.dashboard,
//             element: <OverViews />,
//           },

//           {
//             path: RouterData.root.settings,
//             element: <Settings />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: RouterData.auth.path,
//     element: <Auth />,
//     children: [
//       {
//         path: RouterData.auth.children.signin,
//         element: <Signin />,
//       },
//       {
//         path: RouterData.auth.children.signup,
//         element: <Signup />,
//       },
//     ],
//   },
// ]);

// export default AppRouter;

import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Auth from "../_auth/Auth";
import { lazy } from "react";
import { RouterData } from "./RouterData";
import OverViews from "../_root/pages/OverViews";
import Settings from "../_root/pages/Settings";
import Devices from "../_root/pages/Devices"; // Import Device component
import Cookies from "js-cookie";
import NotFound from "../_root/pages/PageNotFound";
import SecurityPage from "../_root/pages/SecurityPage";
import Folder from "../_root/pages/Folder";

const Signin = lazy(() => import("../_auth/pages/Signin"));
const Signup = lazy(() => import("../_auth/pages/Signup"));
const Dashboard = lazy(() => import("../_root/Dashboard"));

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
          { index: true, element: <OverViews /> },
          { path: "settings", element: <Settings /> },
          { path: "devices", element: <Devices /> },
        ],
      },
      {
        path: "/devices",
        element: <Devices />,
      },
      {
        path: "/security",
        element: <SecurityPage />,
      },
      {
        path: "/folder",
        element: <Folder />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default AppRouter;
