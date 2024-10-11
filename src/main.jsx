import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={AppRouter} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerClassName="font-primary"
        />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
