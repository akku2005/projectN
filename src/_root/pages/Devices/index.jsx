import React, { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../../../components/context/ThemeContext";
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
import "../../styles/Dashboard.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/management";

const Devices = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
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
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRefs = useRef([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [modelFilter, setModelFilter] = useState("All Model");
  const [searchTerm, setSearchTerm] = useState("");

  // Mobile-specific state
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
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        return;
      }
      setOpenIndex(null);
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

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSelection = (option) => {
    console.log(option);
  };

  const handleCheckboxChange = (option) => {
    setCheckedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", checkedItems);
    setOpenIndex(null);
  };

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div>
      {isMobile ? (
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
                    onClick={() =>
                      setIsProjectDropdownOpen(!isProjectDropdownOpen)
                    }
                  >
                    <span
                      className={`truncate ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {selectedProject
                        ? selectedProject.name
                        : "Select Project"}
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
                              <span className="ml-2">
                                ({project.device_nums})
                              </span>
                            </button>
                            {project.child && project.child.length > 0 && (
                              <ul className="ml-4 mt-2">
                                {project.child.map((child) => (
                                  <li key={child.gid} className="py-1">
                                    <button
                                      onClick={() =>
                                        handleChildProjectClick(child)
                                      }
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
                    onClick={() =>
                      setIsStatusDropdownOpen(!isStatusDropdownOpen)
                    }
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
                        ? "bg-gray-800 bg-opacity- 20 backdrop-filter backdrop-blur-lg"
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
                  isDarkMode ? "bg-white bg-opacity-10" : "bg-white"
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
      ) : (
        // Large screen content
        <div className="flex mt-12">
          {/* Sidebar - Project List */}
          <div
            className={`projectList PendingInfo bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-5 border-t border-r border-gray-100 w-full sm:w-[240px] lg:h-screen ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <h2
              className={`text-2xl mb-5 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Project List
            </h2>

            <ul className="list-none">
              {projects.map((project, index) => (
                <li key={project.gid} className="mb-4">
                  <button
                    onClick={() => handleProjectClick(project)}
                    className={`flex items-center border-[3px] ${
                      selectedProject?.gid === project.gid
                        ? "border-green-500"
                        : "border-transparent"
                    } hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-full h-14 justify-start ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                    {project.name
                      .replace(/#/g, "")
                      .replace(/[\u4e00-\u9fff]/g, "")}{" "}
                    ({project.device_nums})
                  </button>

                  {project.child && project.child.length > 0 && (
                    <ul className="mt-2">
                      {project.child.map((child) => (
                        <li key={child.gid} className="text-sm">
                          <button
                            onClick={() => handleChildProjectClick(child)}
                            className={`flex items-center border-[3px] ${
                              selectedChildProject?.gid === child.gid
                                ? "border-green-500"
                                : "border-transparent"
                            } hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-full h-10 justify-start ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faLayerGroup}
                              className="mr-2"
                            />
                            {child.name} ({child.device_nums})
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex flex-col h-full p-5 overflow-hidden w-full">
            {/* Header Section */}
            <div className="flex-1 justify-between items-center px-4 py-6">
              <div className="flex space-x-4">
                {contentMapNumbers.map((item, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center w-[100px] h-[100px] p-2 transition duration-200 ${
                      activeIndex === index
                        ? "text-green-500 font-semibold"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleDeviceTypeClick(index)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex items-center">
                      <h2 className="text-5xl">
                        {item.number !== undefined ? `0${item.number}` : "00"}
                      </h2>
                      <p className="text-xl ml-2">{item.label}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Side: Controls */}
              <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-semibold">Device List</h1>

                <div className="flex flex-wrap items-center space-x-2 gap-2">
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-gray-300 border-opacity-40 rounded-lg flex items-center">
                    <button className="w-7 h-7 bg-green-600 rounded ml-[3px] flex justify-center items-center">
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                    <button className="w-10 h-10 rounded flex justify-center items-center">
                      <FontAwesomeIcon icon={faSitemap} />
                    </button>
                  </div>
                  <div className="flex gap-5">
                    {/* First Dropdown Button */}
                    <div className="flex gap-4">
                      {/* First Dropdown */}
                      <div
                        className="flex relative"
                        ref={(el) => (dropdownRefs.current[0] = el)}
                      >
                        <button
                          className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                          onClick={() => toggleDropdown(0)}
                        >
                          <span>{statusFilter}</span>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="ml - 2"
                          />
                        </button>

                        {openIndex === 0 && (
                          <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                            {["All", "Online", "Offline"].map((option) => (
                              <li
                                key={option}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                                onClick={() => setStatusFilter(option)}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Second Dropdown */}
                      <div
                        className="flex relative"
                        ref={(el) => (dropdownRefs.current[1] = el)}
                      >
                        <button
                          className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                          onClick={() => toggleDropdown(1)}
                        >
                          <span>{modelFilter}</span>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </button>

                        {openIndex === 1 && (
                          <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                            {["All Model", "EAP520"].map((option) => (
                              <li
                                key={option}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                                onClick={() => setModelFilter(option)}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 bg-transparent focus:outline-none w-full sm:w-auto"
                      />
                      <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    </div>
                    {/* Third Dropdown Button */}
                    <div
                      className="relative"
                      ref={(el) => (dropdownRefs.current[2] = el)}
                    >
                      <button
                        className="w-20 h-11 bg-white bg-opacity-10 border-[2px] border-green-500 border-opacity-50 rounded-lg flex items-center justify-between px-2"
                        onClick={() => toggleDropdown(2)}
                      >
                        <FontAwesomeIcon icon={faFileAlt} className="mx-1" />
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="mx-1"
                        />
                      </button>

                      {openIndex === 2 && (
                        <ul className="absolute mt-2 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start ">
                          {[
                            "Template",
                            "Reboot",
                            "Allocation",
                            "Export",
                            "Unbind",
                          ].map((option) => (
                            <li
                              key={option}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black text-sm"
                              onClick={() => handleSelection(option)}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex gap-5">
                      {/* Other dropdowns ... */}

                      {/* Fourth Dropdown Button with Checkboxes */}
                      <div
                        className="relative"
                        ref={(el) => (dropdownRefs.current[3] = el)}
                      >
                        <button
                          className="w-20 h-11 bg-white bg-opacity-10 border-[2px] border-green-500 border-opacity-50 rounded-lg flex items-center justify-between px-2"
                          onClick={() => toggleDropdown(3)}
                        >
                          <FontAwesomeIcon icon={faFilter} />
                          <FontAwesomeIcon icon={faChevronDown} />
                        </button>

                        {openIndex === 3 && (
                          <ul className="absolute mt-2 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-[100px] text-start">
                            {[
                              "MAC",
                              "IP",
                              "Name",
                              "Type",
                              "Model",
                              "Version",
                              "Access Time",
                            ].map((option) => (
                              <li
                                key={option}
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                              >
                                <input
                                  type="checkbox"
                                  checked={checkedItems.includes(option)}
                                  onChange={() => handleCheckboxChange(option)}
                                  className="mr-2" // Margin to the right for spacing
                                />
                                <span>{option}</span>
                              </li>
                            ))}
                            <li className="px-4 py-2">
                              <button
                                onClick={handleApplyFilters}
                                className="w-full bg-green-800 text-white rounded-lg py-2 hover:bg-green-700"
                              >
                                Apply
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info Section */}
            <div className=" w-full mt-2 ">
              {/* Device Table or List */}
              <div className="mt-4 overflow-auto h-[500px]">
                {loading ? (
                  <div className="text-center py-4 text-gray-400">
                    Loading devices...
                  </div>
                ) : (
                  <table className="ProjectInfo table-auto w-full h-auto  ">
                    <thead>
                      <tr className="bg-white bg-opacity-10 ">
                        <th className="py-3 px-4 w-[5%]">
                          <input type="checkbox" className="w-5 h-5 rounded" />
                        </th>
                        <th className="py-3 px-4 text-left w-[10%]">SN</th>
                        <th className="py-3 px-4 text-left w-[25%]">
                          Device MAC
                        </th>
                        <th className="py-3 px-4 text-left w-[25%]">
                          Access Time
                        </th>
                        <th className="py-3 px-4 text-left w-[15%]">Status</th>
                        <th className="py-3 px-4 text-left w-[20%]">Config</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject?.device_nums === "0" ||
                      selectedChildProject?.device_nums === "0" ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No devices found in this project.
                          </td>
                        </tr>
                      ) : filteredDevicesByGroup.length > 0 ? (
                        filteredDevicesByGroup.map((device, index) => (
                          <tr
                            key={`${device.id}-${index}`}
                            className="hover:bg-green-500 "
                          >
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                className="w-5 h-5 rounded"
                              />
                            </td>
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{device.dev_mac}</td>
                            <td className="py-3 px-4">{device.join_time}</td>
                            <td className="py-3 px-4">
                              {device.status === "1" ? "Online" : "Offline"}
                            </td>
                            <td className="py-3 px-4">...</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No devices found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
