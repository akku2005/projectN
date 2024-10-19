import React, { Suspense, useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faChevronDown,
  faSearch,
  faPrint,
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import "../../../_root/styles/Dashboard.scss";
import { ThemeContext } from "../../../components/context/ThemeContext";
import "tailwindcss/tailwind.css";
import "../../styles/Devices.scss";
import DevicesMobileView from "./SecurityMobileView"; // Import your mobile view component

// Fallback Loader Component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">Loading...</div>
  </div>
);

const SecurityPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  // State to track if the screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  // Effect to update isMobile based on window size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Project list data
  const projects = [
    { name: "My Project 1", count: 2, link: "#" },
    { name: "My Project 2", count: 3, link: "#" },
    { name: "My Project 3", count: 5, link: "#" },
    { name: "My Project 4", count: 1, link: "#" },
    { name: "My Project 5", count: 4, link: "#" },
  ];

  // Device data for the table
  const deviceData = [
    {
      sn: 1,
      mac: "44:D1:FA:EF:58:FC",
      ip: "172.16.100.2",
      name: "Gateways",
      type: "EAP520",
      mode: "AP",
      version: "WIS-EAP520-V3...",
      accessTime: "2024-08-22 20:07:0",
      statusIcon: "fas fa-check-circle",
    },
    {
      sn: 2,
      mac: "44:D1:FA:EF:58:FC",
      ip: "172.16.100.2",
      name: "Gateways",
      type: "EAP520",
      mode: "AP",
      version: "WIS-EAP520-V3...",
      accessTime: "2024-08-22 20:07:0",
      statusIcon: "fas fa-check-circle",
    },
  ];

  // Render different views based on the screen size
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        {isMobile ? (
          <DevicesMobileView /> // Render mobile view component
        ) : (
          <div className="statistics flex items-start">
            {/* Left Box: Project List */}
            <div
              className={`projectList ProjectInfo bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-1 border-t border-r border-gray-100 w-full sm:w-[240px] mt-4 lg:h-screen lg:w-[240px] ${
                isDarkMode ? "dark" : "light"
              }`}
            >
              <div className="p-5 w-50">
                <h2
                  className={`text-2xl mb-5 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Project List
                </h2>
                <ul className="list-none p-2">
                  {projects.map((project, index) => (
                    <li key={index} className="mb-4">
                      <a
                        href={project.link}
                        className={`flex items-center border-[3px] border-transparent hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-auto ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                        {project.name} ({project.count})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Device List */}
            <div className=" p-5 flex-grow overflow-hidden">
              <div className="ProjectInfo flex space-x-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg justify-between">
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 w-[263px] text-center rounded-md ${
                        index === 0
                          ? "border-2 border-green-500 text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      Upgrade
                    </div>
                  ))}
              </div>

              <div className="ProjectInfo flex items-center mt-10 mb-10">
                <div className="text-lg font-semibold">Device List</div>
                <div className="flex items-center ml-auto space-x-2">
                  <div className="relative h-12 flex items-center">
                    <button className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded space-x-2">
                      <p>EAP520</p>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </div>
                  <div className="relative h-12">
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                    />
                  </div>
                  <div className="relative h-12 flex items-center">
                    <button className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded space-x-2">
                      <FontAwesomeIcon icon={faPrint} />
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="ProjectInfo mt-4 overflow-x-auto">
                <table
                  className={`min-w-full ${
                    isDarkMode ? "text-white" : "text-black"
                  } table-auto`}
                >
                  <thead>
                    <tr className="bg-white bg-opacity-10 backdrop-blur-lg border-gray-300 border-opacity-40">
                      <th className="py-2 px-4 text-left">
                        <input
                          type="checkbox"
                          style={{
                            width: "21px",
                            height: "20px",
                            borderRadius: "10px",
                          }}
                        />
                      </th>
                      <th className="py-2 px-4 text-left">SN</th>
                      <th className="py-2 px-4 text-left">MAC</th>
                      <th className="py-2 px-4 text-left">IP</th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Type</th>
                      <th className="py-2 px-4 text-left">Mode</th>
                      <th className="py-2 px-4 text-left">Version</th>
                      <th className="py-2 px-4 text-left">Access Time</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Config</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        sn: 1,
                        mac: "44:D1:FA:EF:58:FC",
                        ip: "172.16.100.2",
                        name: "Gateways",
                        type: "EAP520",
                        mode: "AP",
                        version: "WIS-EAP520-V3...",
                        accessTime: "2024-08-22 20:07:0",
                        statusIcon: "fas fa-check-circle",
                      },
                      {
                        sn: 2,
                        mac: "44:D1:FA:EF:58:FC",
                        ip: "172.16.100.2",
                        name: "Gateways",
                        type: "EAP520",
                        mode: "AP",
                        version: "WIS-EAP520-V3...",
                        accessTime: "2024-08-22 20:07:0",
                        statusIcon: "fas fa-check-circle",
                      },
                    ].map((row, index) => (
                      <tr key={index} className="bg-transparent">
                        <td className="py-2 px-4">
                          <input
                            type="checkbox"
                            style={{
                              width: "21px",
                              height: "20px",
                              borderRadius: "10px",
                            }}
                          />
                        </td>
                        <td className="py-2 px-4">{row.sn}</td>
                        <td className="py-2 px-4">{row.mac}</td>
                        <td className="py-2 px-4">{row.ip}</td>
                        <td className="py-2 px-4">{row.name}</td>
                        <td className="py-2 px-4">{row.type}</td>
                        <td className="py-2 px-4">{row.mode}</td>
                        <td className="py-2 px-4">{row.version}</td>
                        <td className="py-2 px-4">{row.accessTime}</td>
                        <td className="py-2 px-4">
                          <i className={row.statusIcon}></i>
                        </td>
                        <td className="py-2 px-4">...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default SecurityPage;
