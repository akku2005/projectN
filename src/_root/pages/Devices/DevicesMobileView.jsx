import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faSitemap,
  faSearch,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { ThemeContext } from "../../../components/context/ThemeContext";

const API_URL =
  "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/management";

const DevicesMobileView = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedChildProject, setSelectedChildProject] = useState(null);
  const [deviceData, setDeviceData] = useState([]);
  const [contentMapNumbers, setContentMapNumbers] = useState([
    { number: 0, label: "All" },
    { number: 0, label: "Gateway" },
    { number: 0, label: "AP" },
    { number: 0, label: "CPE" },
    { number: 0, label: "4G" },
    { number: 0, label: "5G" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [modelFilter, setModelFilter] = useState("All Model");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isDeviceTypeDropdownOpen, setIsDeviceTypeDropdownOpen] =
    useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const projectDropdownRef = useRef(null);
  const deviceTypeDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const modelDropdownRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target)
      ) {
        setIsProjectDropdownOpen(false);
      }
      if (
        deviceTypeDropdownRef.current &&
        !deviceTypeDropdownRef.current.contains(event.target)
      ) {
        setIsDeviceTypeDropdownOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setIsStatusDropdownOpen(false);
      }
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target)
      ) {
        setIsModelDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getToken = () => {
    const token = Cookies.get("userToken");
    if (!token) {
      setError("User token cookie not found");
      return null;
    }
    return token;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { workgroups, devices } = response.data.managementPageData;

      setProjects(workgroups);
      if (workgroups.length > 0) {
        setSelectedProject(workgroups[0]);
        processDeviceData(devices[0]);
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const processDeviceData = (deviceGroup) => {
    const { deviceList, deviceStatistics } = deviceGroup;
    setDeviceData(deviceList.list);

    const updatedNumbers = [
      { number: deviceStatistics.all, label: "All" },
      { number: deviceStatistics.product["1"] || 0, label: "Gateway" },
      { number: deviceStatistics.product["2"] || 0, label: "AP" },
      { number: 0, label: "CPE" },
      { number: 0, label: "4G" },
      { number: 0, label: "5G" },
    ];

    setContentMapNumbers(updatedNumbers);
  };

  const fetchProjectData = async (projectId) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const response = await axios.get(`${API_URL}?projectId=${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { devices } = response.data.managementPageData;
      processDeviceData(devices[0]);
    } catch (error) {
      setError("Error fetching project data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedChildProject(null);
    fetchProjectData(project.gid);
  };

  const handleChildProjectClick = (child) => {
    setSelectedChildProject(child);
    fetchProjectData(child.gid);
  };

  const handleDeviceTypeClick = async (index) => {
    setActiveIndex(index);
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const projectId = selectedChildProject
        ? selectedChildProject.gid
        : selectedProject.gid;
      const deviceType = contentMapNumbers[index].label.toLowerCase();

      const response = await axios.get(
        `${API_URL}?projectId=${projectId}&deviceType=${deviceType}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { devices } = response.data.managementPageData;
      processDeviceData(devices[0]);
    } catch (error) {
      setError("Error fetching device type data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = deviceData.filter((device) => {
    if (statusFilter === "All") {
      return true;
    } else if (statusFilter === "Online") {
      return device.status === "1";
    } else if (statusFilter === "Offline") {
      return device.status === "0";
    }
    return false;
  });

  const filteredDevicesByModel = filteredDevices.filter((device) => {
    if (modelFilter === "All Model") {
      return true;
    } else {
      return device.type === modelFilter;
    }
  });

  const filteredDevicesBySearch = filteredDevicesByModel.filter((device) => {
    return (
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.dev_mac.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredDevicesByGroup = filteredDevicesBySearch.filter((device) => {
    if (selectedProject) {
      return device.group_id === selectedProject.gid;
    } else if (selectedChildProject) {
      return device.group_id === selectedChildProject.gid;
    }
    return true;
  });

  return (
    <div className={`min-h-screen mt-5`}>
      <div className="max-w-md mx-auto space-y-4">
        {/* Header Section */}
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          } mb-6`}
        >
          Devices
        </h1>

        {/* Dropdowns Section */}
        <div className="space-y-4">
          {/* Project Dropdown */}
          <div className="flex space-x-2">
            {/* Project Dropdown */}
            <div ref={projectDropdownRef} className="relative flex-1">
              <button
                className={`w-full px-4 py-3 ${
                  isDarkMode
                    ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                    : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                } rounded-lg text-left flex justify-between items-center`}
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              >
                <span
                  className={`truncate ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {selectedProject ? selectedProject.name : "Select Project"}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {isProjectDropdownOpen && (
                <div
                  className={`absolute z-10 mt-1 w-full ${
                    isDarkMode
                      ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                      : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                  } rounded-lg shadow-lg max-h-60 overflow-y-auto`}
                >
                  <ul className="py-2">
                    {projects.map((project) => (
                      <li
                        key={project.gid}
                        className={`px-4 py-2 hover:bg-white hover:bg-opacity-30 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        <button
                          onClick={() => handleProjectClick(project)}
                          className={`w-full text-left flex items-center ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faLayerGroup}
                            className="mr-2"
                          />
                          <span className="truncate flex-grow">
                            {project.name}
                          </span>
                          <span className="ml-2">({project.device_nums})</span>
                        </button>
                        {project.child && project.child.length > 0 && (
                          <ul className="ml-4 mt-2">
                            {project.child.map((child) => (
                              <li key={child.gid} className="py-1">
                                <button
                                  onClick={() => handleChildProjectClick(child)}
                                  className={`w-full text-left text-sm flex items-center ${
                                    isDarkMode ? "text-white" : "text-black"
                                  }`}
                                >
                                  <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="mr-2"
                                  />
                                  <span className="truncate flex-grow">
                                    {child.name}
                                  </span>
                                  <span className="ml-2">
                                    ({child.device_nums})
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Device Type Dropdown */}
            <div ref={deviceTypeDropdownRef} className="relative flex-1">
              <button
                className={`w-full px-4 py-3 ${
                  isDarkMode
                    ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                    : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                } rounded-lg text-left flex justify-between items-center`}
                onClick={() =>
                  setIsDeviceTypeDropdownOpen(!isDeviceTypeDropdownOpen)
                }
              >
                <span
                  className={`truncate ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {contentMapNumbers[activeIndex].label}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {isDeviceTypeDropdownOpen && (
                <div
                  className={`absolute z-10 mt-1 w-full ${
                    isDarkMode
                      ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                      : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                  } rounded-lg shadow-lg`}
                >
                  <ul className="py-2">
                    {contentMapNumbers.map((item, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 hover:bg-white hover:bg-opacity-30 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        <button
                          onClick={() => handleDeviceTypeClick(index)}
                          className={`w-full text-left ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center space-x-1 sm:space-x-4 mb-4 overflow-x-auto w-full gap-4 ">
            {/* Device List Title */}
            <h1
              className={`text-xs sm:text-sm font-medium ${
                isDarkMode ? "text-white" : "text-black"
              } whitespace-nowrap mr-1 sm:mr-2`}
            >
              Device List
            </h1>

            {/* Control Buttons */}
            <div className="flex space-x-1">
              <button
                className={`w-6 h-6 sm:w-7 sm:h-7 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } flex items-center justify-center rounded-md`}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className={`text-white text-xs sm:text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                />
              </button>
              <button
                className={`w-6 h-6 sm:w-7 sm:h-7 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } flex items-center justify-center rounded-md`}
              >
                <FontAwesomeIcon
                  icon={faSitemap}
                  className={`text-white text-xs sm:text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                />
              </button>
            </div>

            {/* Status Dropdown */}
            <div ref={statusDropdownRef} className="flex-shrink-0">
              <button
                className={`px-2 py-1 sm:px-3 sm:py-2 ${
                  isDarkMode
                    ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                    : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                } rounded-lg text-xs sm:text-sm flex items-center`}
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                <span
                  className={`truncate max-w-[80px] sm:max-w-[100px] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {statusFilter}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-1 text-xs sm:text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                />
              </button>
              {isStatusDropdownOpen && (
                <div
                  className={`absolute z-10 mt-1 w-[80px] ${
                    isDarkMode
                      ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                      : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                  } rounded-lg shadow-lg`}
                >
                  <ul className="py-1">
                    {["All", "Online", "Offline"].map((option) => (
                      <li
                        key={option}
                        className={`px-2 py-1 hover:bg-white hover:bg-opacity-30 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        <button
                          onClick={() => setStatusFilter(option)}
                          className={`w-full text-left text-xs sm:text-sm ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Model Dropdown */}
            <div ref={modelDropdownRef} className=" flex-shrink-0">
              <button
                className={`px-2 py-1 sm:px-3 sm:py-2 ${
                  isDarkMode
                    ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                    : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                } rounded-lg text-xs sm:text-sm flex items-center`}
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              >
                <span
                  className={`truncate max-w-[80px] sm:max-w-[100px] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {modelFilter}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-1 text-xs sm:text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                />
              </button>
              {isModelDropdownOpen && (
                <div
                  className={`absolute z-10 mt-1 w-[80px] ${
                    isDarkMode
                      ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                      : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
                  } rounded-lg shadow-lg`}
                >
                  <ul className="py-1">
                    {["All Model", "EAP520"].map((option) => (
                      <li
                        key={option}
                        className={`px-2 py-1 hover:bg-white hover:bg-opacity-30 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        <button
                          onClick={() => setModelFilter(option)}
                          className={`w-full text-left text-xs sm:text-sm ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Model Dropdown */}
        </div>

        {/* Controls Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div
              className={`flex-1 flex items-center ${
                isDarkMode
                  ? "bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg"
                  : "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
              } rounded-md px-1`}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`flex-1 bg-transparent ${
                  isDarkMode ? "text-white" : "text-black"
                } py-2 px-2 focus:outline-none text-sm`}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className={`text-white ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Device List Table */}
        <div className="overflow-x-auto">
          <table
            className={`w-full rounded-md overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <thead>
              <tr
                className={`bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <th
                  className={`p-2 text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <input type="checkbox" />
                </th>
                <th
                  className={`p-2 text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  SN
                </th>
                <th
                  className={`p-2 text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  MAC
                </th>
                <th
                  className={`p-2 text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  IP
                </th>
                <th
                  className={`p-2 text-sm ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDevicesByGroup.length > 0 ? (
                filteredDevicesByGroup.map((device, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-300 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <td
                      className={`p-2 text-center text-sm ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      <input type="checkbox" />
                    </td>
                    <td
                      className={`p-2 text-center text-sm ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={`p-2 text-center text-sm ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {device.dev_mac}
                    </td>
                    <td
                      className={`p-2 text-center text-sm ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {device.dev_ip}
                    </td>
                    <td
                      className={`p-2 text-center text-sm flex items-center justify-center ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {device.name}
                      <span
                        className={`text-green-500 ml-1 text-xs ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        More
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className={`text-center py-4 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    No devices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevicesMobileView;
