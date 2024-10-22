import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLayerGroup,
  faSearch,
  faFilter,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const DevicesMobileView = ({
  deviceData,
  projects,
  selectedProject,
  selectedChildProject,
  contentMapNumbers,
  loading,
  error,
  statusFilter,
  modelFilter,
  searchTerm,
  handleProjectClick,
  handleChildProjectClick,
  handleDeviceTypeClick,
  toggleDropdown,
  handleSelection,
  handleCheckboxChange,
  handleApplyFilters,
  setSearchTerm,
  setStatusFilter,
  setModelFilter,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const formRef = useRef();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle new project creation
    setIsFormOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 mb-10">
      {/* ... (rest of the component remains the same) ... */}

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg mt-4 mb-10">
        <p className="text-lg mb-2">Device List</p>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="border p-2 rounded-md w-full"
          />
        </div>

        <div className="flex gap-5 mb-4">
          {contentMapNumbers.map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center w-[100px] h-[100px] p-2 transition duration-200 ${
                activeIndex === index
                  ? "text-green-500 font-semibold"
                  : "text-gray-400"
              }`}
              onClick={() => handleDeviceTypeClick(index)}
            >
              <div className="flex items-center">
                <h2 className="text-5xl">{item.number}</h2>
                <p className="text-xl ml-2">{item.label}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">Filters</h1>
          <div className="flex gap-4">
            <div className="flex relative">
              <button
                className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                onClick={() => toggleDropdown(0)}
              >
                <span>{statusFilter}</span>
                <FontAwesomeIcon icon={faChevronDown} />
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

            <div className="flex relative">
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

            <div className="flex relative">
              <button
                className="px-4 py-2 bg-white bg-opacity-10 border border-gray-300 border-opacity-50 rounded-lg flex items-center space-x-2"
                onClick={() => toggleDropdown(2)}
              >
                <FontAwesomeIcon icon={faFilter} />
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {openIndex === 2 && (
                <ul className="absolute mt-12 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border border-gray-100 z-10 w-full text-start">
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
                        className="mr-2"
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

        {loading ? (
          <div className="text-center py-4 text-gray-400">
            Loading devices...
          </div>
        ) : (
          <table className="table-auto w-full h-full">
            <thead>
              <tr className="bg-white bg-opacity-10">
                <th className="py-3 px-4 w-[5%]">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                </th>
                <th className="py-3 px-4 text-left w-[10%]">SN</th>
                <th className="py-3 px-4 text-left w-[25%]">Device MAC</th>
                <th className="py-3 px-4 text-left w-[25%]">Access Time</th>
                <th className="py-3 px-4 text-left w-[15%]">Status</th>
                <th className="py-3 px-4 text-left w-[20%]">Config</th>
              </tr>
            </thead>
            <tbody>
              {deviceData.length > 0 ? (
                deviceData.map((device, index) => (
                  <tr key={device.id}>
                    <td className="py-3 px-4">
                      <input type="checkbox" className="w-5 h-5 rounded" />
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
  );
};

export default DevicesMobileView;
