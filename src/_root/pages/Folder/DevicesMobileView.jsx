import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const DevicesMobileView = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 mb-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Project</h1>
        <button className="bg-green-500 p-2 rounded-md h-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faPlus} className="text-white" />
        </button>
      </div>

      <div>
        <h2 className="text-xl mb-2">Projects</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start" // Adjusted to items-start
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faLayerGroup} className="text-white" />
                <span>Myproject (2)</span>
              </div>
              <div className="flex space-x-6 mt-6 justify-center w-full">
                {" "}
                {/* Centering the action buttons */}
                <span className="text-sm">Handover</span>
                <span className="text-sm">Add</span>
                <span className="text-sm text-red-500">Delete</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg mt-4">
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
  );
};

export default DevicesMobileView;
