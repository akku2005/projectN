import React, { Suspense } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";
import "../../styles/Devices.scss";
import { ThemeContext } from "../../../components/context/ThemeContext";

// Fallback Loader Component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">Loading...</div>
  </div>
);

const Folder = () => {
  const projects = [
    { name: "Myproject (1)" },
    { name: "Myproject (2)" },
    { name: "Myproject (3)" },
    { name: "Myproject (4)" },
    { name: "Myproject (5)" },
  ];

  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
        <Sidebar /> {/* Sidebar */}
        <div className="dashboard-content">
          <Header /> {/* Header */}
          <div className=" flex flex-col w-full mt-4">
            {/* Top Box */}
            <div className="p-4 mb-2 flex justify-between items-center rounded-md">
              <div>
                <h2 className="text-xl font-semibold">Project</h2>
              </div>
              <div className="text-4xl cursor-pointer bg-green-500 w-10 h-10 flex items-center justify-center rounded-md">
                +
              </div>
            </div>

            {/* Middle Box */}
            <div className="flex items-center mb-10 mt-5">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg  border-white rounded-lg p-6 w-full shadow-lg">
                <h1 className="text-lg mb-4">Project List</h1>
                <ul>
                  {projects.map((project, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center  mb-2"
                    >
                      <div className="flex items-center">
                        <i className="fas fa-layer-group mr-2"></i>
                        <span>{project.name}</span>
                      </div>
                      <div className="flex space-x-10 font-medium">
                        <span>Handover</span>
                        <span>Add</span>
                        <span className="text-red-500">Delete</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Replacing Bottom Box with the provided structure */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg">
              <p className="text-lg mb-2">Project Info</p>
              <div className="flex items-center mb-4">
                <i className="fas fa-layer-group text-3xl mr-3 text-green-400"></i>
                <h1 className="text-2xl font-bold">My Project</h1>
              </div>
              <p className="text-md mb-4 text-gray-400">
                Creation Time: 2024-08-22 17:56:59
              </p>
              <p className="text-md">
                Project Notes: 1. This item is the system default and cannot be
                modified or deleted. 2. Users can put new access or temporarily
                unallocated devices into this item.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Folder;
