// Layout.js
import React, { useContext } from "react";
import Header from "./Header";
import Sidebar from "./sidebar";
import { ThemeContext } from "./context/ThemeContext";

const Layout = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
