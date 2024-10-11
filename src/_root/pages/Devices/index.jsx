// src/components/Dashboard.js
import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";

import "../../styles/Dashboard.scss";
import { ThemeContext } from "../../../components/context/ThemeContext";

const Devices = () => {
  // Use ThemeContext
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Header */}
        <Header />

        {/* Statistics */}
        <div className="statistics">
          <h2 className="text-center justify-center items-center text-4xl mt-44">
            Under Development
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Devices;
