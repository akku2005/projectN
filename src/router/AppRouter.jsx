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
import Dashboard from "../_root/Dashboard";
import { RouterData } from "./RouterData";
import OverViews from "../_root/pages/OverViews";
import Settings from "../_root/pages/Settings";
import Cookies from "js-cookie"; // Ensure js-cookie is installed

const Signin = lazy(() => import("../_auth/pages/Signin"));
const Signup = lazy(() => import("../_auth/pages/Signup"));

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = Cookies.get("userToken"); // Ensure cookie name matches the one set in Signin component
  return !!token; // Return true if token exists
};

// Loader function for protected routes
const protectedLoader = () => {
  if (!isAuthenticated()) {
    return redirect(RouterData.auth.children.signin); // Redirect to sign-in if not authenticated
  }
  return null; // Allow access if authenticated
};

// Loader function for auth routes
const authLoader = () => {
  if (isAuthenticated()) {
    return redirect(RouterData.root.dashboard); // Redirect to dashboard if already authenticated
  }
  return null; // Allow access to auth routes if not authenticated
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Auth component at root path
        element: <Auth />,
        loader: authLoader, // Apply loader to check if the user is authenticated
        children: [
          {
            path: RouterData.auth.children.signin.substring(1), // Remove leading '/' for relative path
            element: <Signin />,
          },
          {
            path: RouterData.auth.children.signup.substring(1), // Remove leading '/' for relative path
            element: <Signup />,
          },
        ],
      },
      {
        path: "dashboard", // Relative path for dashboard
        element: <Dashboard />,
        loader: protectedLoader, // Apply the loader for authentication check
        children: [
          {
            path: "", // Default path for the dashboard
            element: <OverViews />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export default AppRouter;
