import React, { Suspense } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import MainContent from "./MainContent";
import "../_root/styles/Dashboard.scss";
import { ThemeContext } from "../components/context/ThemeContext";

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
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Header */}
          <Header />

          {/* Statistics */}
          <div className="statistics">
            <MainContent />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
