import React, { Suspense } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import "../_root/styles/Dashboard.scss";
import { ThemeContext } from "../components/context/ThemeContext";
import { Outlet } from "react-router-dom";

// Fallback Loader Component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">Loading...</div>
  </div>
);

const Dashboard = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
        <Sidebar /> {/* Sidebar should only be here */}
        <div className="dashboard-content">
          <Header /> {/* Header should only be here */}
          <div className="statistics">
            {/* This Outlet will render content based on child routes */}
            <Outlet />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
