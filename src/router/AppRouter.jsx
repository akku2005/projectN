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
import { lazy, Suspense } from "react"; // Suspense added
import App from "../App";
import Auth from "../_auth/Auth";
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

// Lazy-loading fallback
const LazyLoader = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth", // Use 'auth' as the path for the Auth component
        element: <Auth />, // Renders Auth component with child routes
        loader: authLoader, // Check authentication
        children: [
          {
            path: "sign-in", // Matches RouterData.auth.children.signin
            element: (
              <LazyLoader>
                <Signin />
              </LazyLoader>
            ),
          },
          {
            path: "sign-up", // Matches RouterData.auth.children.signup
            element: (
              <LazyLoader>
                <Signup />
              </LazyLoader>
            ),
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: protectedLoader,
        children: [
          {
            path: "",
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
