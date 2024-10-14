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
import Cookies from "js-cookie";

const Signin = lazy(() => import("../_auth/pages/Signin"));
const Signup = lazy(() => import("../_auth/pages/Signup"));
const Dashboard = lazy(() => import("../_root/Dashboard"));
const Devices = lazy(() => import("../_root/pages/Devices"));

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = Cookies.get("userToken");
  return !!token;
};

// Loader function for protected routes
const protectedLoader = () => {
  if (!isAuthenticated()) {
    return redirect(RouterData.auth.children.signin); // Redirect to sign-in if not authenticated
  }
  return null;
};

// Loader function for auth routes
const authLoader = () => {
  if (isAuthenticated()) {
    return redirect(RouterData.root.dashboard); // Redirect to dashboard if authenticated
  }
  return null;
};

// Define routes
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Root path displays Auth component with Signin by default
        element: <Auth />,
        loader: authLoader,
        children: [
          {
            index: true, // Set Signin as the default page at '/'
            element: <Signin />,
          },
          {
            path: "sign-up", // Access signup page via '/sign-up'
            element: <Signup />,
          },
        ],
      },
      {
        path: "dashboard", // Dashboard routes
        element: <Dashboard />,
        loader: protectedLoader,
        children: [
          {
            index: true,
            element: <OverViews />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "devices",
        element: <Devices />,
      },
    ],
  },
]);

export default AppRouter;
