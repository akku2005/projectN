import React, { useState, useEffect, useContext, useRef } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/Devices.scss";
import "../../styles/Dashboard.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";

const Devices = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [devices, setDevices] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true); // Start loading
        const token = Cookies.get("userToken");
        if (!token) throw new Error("User token cookie not found");

        const response = await axios.get(
          "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/device",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Assuming response.data is an array of devices
        setDevices(response.data); // Set devices from API response
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDevices();
  }, []);
  const [openIndex, setOpenIndex] = useState(null); // State to track the currently open dropdown
  const dropdownRefs = useRef([]); // Create a ref array for the dropdowns
  const [checkedItems, setCheckedItems] = useState([]); // State to manage checked items

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the dropdown for the clicked index
  };

  const handleSelection = (option) => {
    console.log(option); // Handle selection logic here
    // Do not close dropdown on selection
  };

  const handleCheckboxChange = (option) => {
    setCheckedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    ); // Toggle checkbox selection
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", checkedItems); // Logic for applying selected filters
    setOpenIndex(null); // Close the dropdown after applying
  };

  const handleClickOutside = (event) => {
    if (dropdownRefs.current.some((ref) => ref && ref.contains(event.target))) {
      return; // If clicked inside any dropdown, do nothing
    }
    setOpenIndex(null); // Close dropdown if clicked outside
  };

  // Add event listener on mount and cleanup on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const projects = [
    { name: "My Project 1", count: 2, link: "#" },
    { name: "My Project 2", count: 3, link: "#" },
    { name: "My Project 3", count: 5, link: "#" },
    { name: "My Project 4", count: 1, link: "#" },
    { name: "My Project 5", count: 4, link: "#" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const contentMap = [
    <div className="flex-1 rounded-lg mt-0 w-full h-[400px]">
      <div className="ProjectInfo flex items-center  justify-between xl:gap-16 w-full flex-wrap sm:gap-0 mt-2 ">
        {/* Left Side: Device List */}
        <h1 className="text-xl font-semibold w-auto">Device List</h1>

        {/* Right Side: Controls */}
        <div className="flex flex-wrap items-center space-x-2 gap-2 justify-end w-full md:w-auto">
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
                {/* Dropdown Button */}
                <button
                  className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                  onClick={() => toggleDropdown(0)}
                >
                  <span>All</span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                </button>

                {openIndex === 0 && (
                  <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                    {["All", "Online", "Offline"].map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                        onClick={() => handleSelection(option)}
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
                {/* Dropdown Button */}
                <button
                  className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                  onClick={() => toggleDropdown(1)}
                >
                  <span>All Model</span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>

                {openIndex === 1 && (
                  <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                    {["All", "Online", "Offline"].map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                        onClick={() => handleSelection(option)}
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
                className="px-4 py-2 bg-transparent text-white focus:outline-none w-full sm:w-auto"
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
                <FontAwesomeIcon icon={faChevronDown} className="mx-1" />
              </button>

              {openIndex === 2 && (
                <ul className="absolute mt-2 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start ">
                  {["Template", "Reboot", "Allocation", "Export", "Unbind"].map(
                    (option) => (
                      <li
                        key={option}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black text-sm"
                        onClick={() => handleSelection(option)}
                      >
                        {option}
                      </li>
                    )
                  )}
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
                  <ul className="absolute mt-2 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-[120px] text-start">
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
                        className="w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600"
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

      <div className="ProjectInfo mt-5 overflow-x-auto">
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
            {loading ? (
              <tr>
                <td colSpan="11" className="py-2 px-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : Array.isArray(devices) && devices.length > 0 ? (
              devices.map((row, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-2 px-4 text-center">
                  No devices found or invalid data format.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>,
    // Placeholder for additional content for other buttons
    <div>
      <div className="ProjectInfo mt-5 overflow-x-auto">
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
            {loading ? (
              <tr>
                <td colSpan="11" className="py-2 px-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : Array.isArray(devices) && devices.length > 0 ? (
              devices.map((row, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-2 px-4 text-center">
                  No devices found or invalid data format.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>,
    <div>Empty Data</div>,
    <div>Empty Data</div>,
    <div>Empty Data</div>,
    <div>Empty Data</div>,
  ];

  const handleButtonClick = (index) => {
    setActiveIndex(index); // Update active index on button click
  };

  const contentMapNumbers = [
    { number: 1, label: "All" },
    { number: 2, label: "Gateway" },
    { number: 3, label: "Ap" },
    { number: 4, label: "CPE" },
    { number: 5, label: "4G" },
    { number: 6, label: "5G" },
  ];
  return (
    <div>
      {isMobile ? (
        <DevicesMobileView />
      ) : (
        <div>
          <div className="flex">
            {/* Left Box */}
            <div
              className={`projectList ProjectInfo bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-1 border-t border-r border-gray-100 w-full sm:w-[240px] mt-4 lg:h-screen lg:w-[240px] ${
                isDarkMode ? "dark" : "light"
              }`}
            >
              <div className="p-5">
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

            {/* Right Content */}
            <div className="flex flex-col h-full p-5 overflow-hidden">
              <div className="w-full px-4 py-6">
                <div className="flex justify-start gap-10 overflow-auto">
                  {contentMapNumbers.map((item, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center w-[100px] h-[100px] p-2 transition duration-200 ${
                        activeIndex === index
                          ? "text-green-500 font-semibold"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleButtonClick(index)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div className="flex items-center">
                        <h2 className="text-5xl">
                          {item.number < 10 ? `0${item.number}` : item.number}
                        </h2>
                        <p className="text-xl ml-2">{item.label}</p>{" "}
                        {/* Render the dynamic label */}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Full-width content section */}
                <div className="mt-4 text-lg w-full">
                  <div className="w-full h-full p-4 rounded-lg ">
                    {contentMap[activeIndex]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;


import React, { useState, useEffect, useContext, useRef } from "react";
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
import "../../styles/Dashboard.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";
import axios from "axios";
import Cookies from "js-cookie"; // Ensure you have js-cookie installed

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
  const [loading, setLoading] = useState(false); // Add loading state

  // Adjust view on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true); // Start loading

        const token = Cookies.get("userToken");
        if (!token) throw new Error("User token cookie not found");

        const response = await axios.get(
          "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/management",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const projectData = response.data.managementPageData.workgroups.map(
          (item) => ({
            id: item.gid,
            name: item.name,
            count: item.device_nums,
            children: item.child,
          })
        );

        setProjects(projectData);

        // Automatically select the first project if available
        if (projectData.length > 0) {
          setSelectedProject(projectData[0]);
          fetchDeviceData(projectData[0]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProjects();
  }, []);

  // Function to fetch devices based on selected project or child project
  const fetchDeviceData = async (project) => {
    try {
      setLoading(true); // Start loading

      const token = Cookies.get("userToken");
      if (!token) throw new Error("User token cookie not found");

      const response = await axios.get(
        "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/management",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const devices = response.data.managementPageData.devices.find(
        (device) => device.gid === project.id
      );

      // Format device data accordingly
      const formattedDeviceData = devices
        ? devices.deviceList.list.map((device) => ({
            id: device.user_id, // Using user_id as a unique identifier
            mac: device.dev_mac,
            accessTime: device.join_time,
            status: device.status === "1" ? "Active" : "Inactive",
          }))
        : [];

      setDeviceData(formattedDeviceData);

      // Randomly update contentMapNumbers for the demo
      const updatedNumbers = contentMapNumbers.map((item) => ({
        ...item,
        number: Math.floor(Math.random() * 10) + 1,
      }));
      setContentMapNumbers(updatedNumbers);
    } catch (error) {
      console.error("Error fetching device data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedChildProject(null); // Reset selected child project
    fetchDeviceData(project);
  };

  // Handle child project click
  const handleChildProjectClick = (child) => {
    setSelectedChildProject(child);
    fetchDeviceData(child); // Fetch device data for the selected child project
  };
  const [openIndex, setOpenIndex] = useState(null); // State to track the currently open dropdown
  const dropdownRefs = useRef([]); // Create a ref array for the dropdowns
  const [checkedItems, setCheckedItems] = useState([]); // State to manage checked items

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the dropdown for the clicked index
  };

  const handleSelection = (option) => {
    console.log(option); // Handle selection logic here
    // Do not close dropdown on selection
  };

  const handleCheckboxChange = (option) => {
    setCheckedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    ); // Toggle checkbox selection
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", checkedItems); // Logic for applying selected filters
    setOpenIndex(null); // Close the dropdown after applying
  };

  const handleClickOutside = (event) => {
    if (dropdownRefs.current.some((ref) => ref && ref.contains(event.target))) {
      return; // If clicked inside any dropdown, do nothing
    }
    setOpenIndex(null); // Close dropdown if clicked outside
  };

  // Add event listener on mount and cleanup on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <DevicesMobileView />
      ) : (
        <div className="flex">
          {/* Sidebar - Project List */}
          <div
            className={`projectList bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-5 border-t border-r border-gray-100 w-full sm:w-[240px] lg:h-screen ${
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
              {projects.map((project) => (
                <li key={project.id} className="mb-4">
                  <button
                    onClick={() => handleProjectClick(project)}
                    className={`flex items-center border-[3px] ${
                      selectedProject?.id === project.id
                        ? "border-green-500"
                        : "border-transparent"
                    } hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-full h-14 justify-start ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                    {project.name} ({project.count})
                  </button>

                  {project.children && project.children.length > 0 && (
                    <ul className="mt-2">
                      {project.children.map((child) => (
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
            <div className="flex justify-between items-center px-4 py-6">
              <div className="flex space-x-4">
                {contentMapNumbers.map((item) => (
                  <button
                    key={item.label}
                    className={`flex items-center text-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      isDarkMode
                        ? "text-white hover:bg-gray-700"
                        : "text-black hover:bg-gray-300"
                    }`}
                  >
                    <span className={`text-5xl font-semibold`}>
                      {item.number}
                    </span>
                    <span
                      className={`text-xl ml-2 ${
                        isDarkMode ? "text-green-500" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Info Section */}
            <div className="ProjectInfo flex items-center  justify-between xl:gap-16 w-full flex-wrap sm:gap-0 mt-2 ">
              {/* Left Side: Device List */}
              <h1 className="text-xl font-semibold w-auto">Device List</h1>

              {/* Right Side: Controls */}
              <div className="flex flex-wrap items-center space-x-2 gap-2 justify-end w-full md:w-auto">
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
                      {/* Dropdown Button */}
                      <button
                        className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                        onClick={() => toggleDropdown(0)}
                      >
                        <span>All</span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="ml-2"
                        />
                      </button>

                      {openIndex === 0 && (
                        <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                          {["All", "Online", "Offline"].map((option) => (
                            <li
                              key={option}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                              onClick={() => handleSelection(option)}
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
                      {/* Dropdown Button */}
                      <button
                        className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                        onClick={() => toggleDropdown(1)}
                      >
                        <span>All Model</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>

                      {openIndex === 1 && (
                        <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                          {["All", "Online", "Offline"].map((option) => (
                            <li
                              key={option}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                              onClick={() => handleSelection(option)}
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
                      className="px-4 py-2 bg-transparent text-white focus:outline-none w-full sm:w-auto"
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
                      <FontAwesomeIcon icon={faChevronDown} className="mx-1" />
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
                        <ul className="absolute mt-2 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-[120px] text-start">
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
                              className="w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600"
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

            {/* Device Table or List goes here */}
            <div className="mt-4 overflow-x-auto">
              {loading ? (
                <div className="text-center py-4 text-gray-400">
                  Loading devices...
                </div>
              ) : (
                <table
                  className={`min-w-full table-auto ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <thead>
                    <tr className="bg-white bg-opacity-10 backdrop-blur-lg border-gray-300">
                      <th className="py-2 px-4 text-left">SN</th>
                      <th className="py-2 px-4 text-left">Device MAC</th>
                      <th className="py-2 px-4 text-left">Access Time</th>
                      <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceData.length > 0 ? (
                      deviceData.map((device, index) => (
                        <tr key={device.id} className="hover:bg-gray-200">
                          <td className="py-2 px-4">{index + 1}</td>
                          <td className="py-2 px-4">{device.mac}</td>
                          <td className="py-2 px-4">{device.accessTime}</td>
                          <td className="py-2 px-4">{device.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
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
      )}
    </div>
  );
};

export default Devices;



import React, { useState, useEffect, useContext, useRef } from "react";
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    const deviceGroup = devices.find((group) => group.gid === project.gid);
    processDeviceData(deviceGroup);
  };

  return (
    <div className="mt-14">
      {isMobile ? (
        <DevicesMobileView />
      ) : (
        <div className="flex">
          {/* Sidebar - Project List */}
          <div
            className={`projectList bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-5 border-t border-r border-gray-100 w-full sm:w-[240px] lg:h-screen ${
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
              {projects.map((project) => (
                <li key={project.id} className="mb-4">
                  <button
                    onClick={() => handleProjectClick(project)}
                    className={`flex items-center border-[3px] ${
                      selectedProject?.id === project.id
                        ? "border-green-500"
                        : "border-transparent"
                    } hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-full h-14 justify-start ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                    {project.name} ({project.count})
                  </button>

                  {project.children && project.children.length > 0 && (
                    <ul className="mt-2">
                      {project.children.map((child) => (
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
            <div className="flex justify-between items-center px-6 py-6">
              <div className="flex space-x-4 overflow-auto">
                {contentMapNumbers.map((item, index) => (
                  <button
                    key={index} // Use index as the key since items are not expected to change
                    className={`flex flex-col items-center w-[100px] h-[100px] p-2 transition duration-200 ${
                      activeIndex === index
                        ? "text-green-500 font-semibold"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleButtonClick(index)}
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
              <div className="flex flex-wrap items-center space-x-2 gap-2 justify-end w-full md:w-auto">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-gray-300 border-opacity-40 rounded-lg flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    className="px-4 py-2 bg-transparent text-white focus:outline-none w-full sm:w-auto"
                  />
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                </div>

                {/* First Dropdown Button */}
                <div
                  className="flex relative"
                  ref={(el) => (dropdownRefs.current[0] = el)}
                >
                  {/* Dropdown Button */}
                  <button
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                    onClick={() => toggleDropdown(0)}
                  >
                    <span>All</span>
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  </button>

                  {openIndex === 0 && (
                    <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                      {["All", "Online", "Offline"].map((option) => (
                        <li
                          key={option}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                          onClick={() => handleSelection(option)}
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
                  {/* Dropdown Button */}
                  <button
                    className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                    onClick={() => toggleDropdown(1)}
                  >
                    <span>All Model</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>

                  {openIndex === 1 && (
                    <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
                      {["All", " Online", "Offline"].map((option) => (
                        <li
                          key={option}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md hover:text-black"
                          onClick={() => handleSelection(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
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
                    <FontAwesomeIcon icon={faChevronDown} className="mx-1" />
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

            {/* Project Info Section */}
            <div className="ProjectInfo flex items-center  justify-between xl:gap-16 w-full flex-wrap sm:gap-0 mt-2 ">
              {/* Left Side: Device List */}
              <h1 className="text-xl font-semibold w-auto">Device List</h1>

              {/* Device Table or List */}
              <div className="mt-4 overflow-x-auto h-[500px]">
                {loading ? (
                  <div className="text-center py-4 text-gray-400">
                    Loading devices...
                  </div>
                ) : (
                  <table
                    className={`min-w-full table-auto ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <thead>
                      <tr className="bg-white bg-opacity-10 backdrop-blur-lg border-gray-300">
                        <th className="py-2 px-4">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded mr-20"
                          />
                        </th>
                        <th className="py-2 px-4 text-left">SN</th>
                        <th className="py-2 px-4 text-left">Device MAC</th>
                        <th className="py-2 px-4 text-left">Access Time</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Config</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deviceData.length > 0 ? (
                        deviceData.map((device, index) => (
                          <tr
                            key={`${device.id}-${index}`}
                            className="hover:bg-green-500"
                          >
                            <td className="py-2 px-4">
                              <input
                                type="checkbox"
                                className="w-5 h-5 rounded ml-10"
                              />
                            </td>
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{device.mac}</td>
                            <td className="py-2 px-4">{device.joinTime}</td>
                            <td className="py-2 px-4">{device.status}</td>
                            <td className="py-2 px-4">...</td>
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
