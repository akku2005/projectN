import React, { useState, useEffect, useContext } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";
import { ThemeContext } from "../../../components/context/ThemeContext";
import DevicesMobileView from "./DevicesMobileView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBars,
  faSitemap,
  faFileAlt,
  faFilter,
  faSearch,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Devices.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";

const Devices = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    { name: "My Project 1", count: 2, link: "#" },
    { name: "My Project 2", count: 3, link: "#" },
    { name: "My Project 3", count: 5, link: "#" },
    { name: "My Project 4", count: 1, link: "#" },
    { name: "My Project 5", count: 4, link: "#" },
  ];

  const deviceRows = [
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

  return (
    <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        {isMobile ? (
          <DevicesMobileView />
        ) : (
          <div className="statistics">
            <div className="flex">
              {/* Left Box */}
              <div
                className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-1 border-t border-r border-gray-100 w-full h-auto sm:h-[380px] mt-4 lg:h-screen lg:w-[240px] ${
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
                      <div key={index} className="mb-4">
                        <a
                          href={project.link}
                          className={`flex items-center border-[3px] border-transparent hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-auto ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faLayerGroup}
                            className="mr-2"
                          />
                          {project.name} ({project.count})
                        </a>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex flex-col h-full p-5">
                <div>
                  <div className="flex justify-between mt-0 mb-0">
                    <div className="flex space-x-16">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center w-[100px] h-[100px] p-2"
                        >
                          <div className="flex items-center space-x-2">
                            <h2 className="text-5xl text-green-500 font-semibold">
                              02
                            </h2>
                            <p className="text-gray-400 text-xl">All</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex-1 rounded-lg w-full mt-0">
                  <div className="flex items-center p-4 justify-between">
                    <h1 className="text-xl font-semibold mr-4">Device List</h1>
                    <div className="flex items-center space-x-2">
                      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-gray-300 border-opacity-40 rounded-lg w-[75px]">
                        <button className="w-7 h-7 bg-green-600 rounded ml-[3px]">
                          <FontAwesomeIcon icon={faBars} />
                        </button>
                        <button className="w-10 h-10 rounded">
                          <FontAwesomeIcon icon={faSitemap} />
                        </button>
                      </div>
                      <button className="px-4 py-2 p-1 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg">
                        All
                      </button>
                      <button className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2">
                        <span>All Model</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>

                      <div className="flex items-center bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Search"
                          className="px-4 py-2 bg-transparent text-white focus:outline-none"
                        />
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                      </div>

                      <button className="w-20 h-10 bg-white bg-opacity-10 border-[2px] border-green-500 border-opacity-50 rounded-lg flex items-center justify-between px-2">
                        <FontAwesomeIcon icon={faFileAlt} className="mx-1" />
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="mx-1"
                        />
                      </button>

                      <button className="w-20 h-10 bg-white bg-opacity-10 border-[2px] border-green-500  border-opacity-50 rounded-lg flex items-center justify-between px-2">
                        <FontAwesomeIcon icon={faFilter} />
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b border-gray-300">
                            SN
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            MAC Address
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            IP Address
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            Device Name
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            Type
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            Mode
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            Version
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            Access Time
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {deviceRows.map((device) => (
                          <tr key={device.sn} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.sn}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.mac}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.ip}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.name}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.type}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.mode}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.version}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              {device.accessTime}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              <FontAwesomeIcon
                                icon={device.statusIcon}
                                className="text-green-600"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Devices;
