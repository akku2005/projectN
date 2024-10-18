import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faSitemap,
  faSearch,
  faFileAlt,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const DevicesMobileView = () => {
  const devices = [
    { sn: 1, mac: "44:D1:FA:EF:58:FC", ip: "172.16.100.2", name: "Gateways" },
    { sn: 2, mac: "44:D1:FA:EF:58:FC", ip: "172.16.100.2", name: "Gateways" },
    { sn: 3, mac: "44:D1:FA:EF:58:FC", ip: "172.16.100.2", name: "Gateways" },
  ];

  const [isMyProjectDropdownOpen, setIsMyProjectDropdownOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);

  // References for dropdown elements
  const myProjectRef = useRef(null);
  const allDropdownRef = useRef(null);

  // Sample projects and all items
  const projects = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
    "Project 5",
  ];

  const allItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        myProjectRef.current &&
        !myProjectRef.current.contains(event.target) &&
        isMyProjectDropdownOpen
      ) {
        setIsMyProjectDropdownOpen(false);
      }

      if (
        allDropdownRef.current &&
        !allDropdownRef.current.contains(event.target) &&
        isAllDropdownOpen
      ) {
        setIsAllDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMyProjectDropdownOpen, isAllDropdownOpen]);

  return (
    <div className="p-2 min-h-screen mt-5 overflow-hidden">
      {/* Header Section */}
      <div className="flex space-x-2 mb-3 ">
        {/* Myproject Button with Dropdown */}
        <div className="relative flex-1" ref={myProjectRef}>
          <button
            className="flex items-center justify-between w-full px-3 py-2 bg-white bg-opacity-10 backdrop-blur-lg border-2 border-green-500 rounded-md"
            onClick={() => {
              setIsMyProjectDropdownOpen(!isMyProjectDropdownOpen);
              setIsAllDropdownOpen(false); // Close the All dropdown if open
            }}
          >
            <span>Myproject (2)</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {isMyProjectDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white bg-opacity-10 backdrop-blur-lg border-2 border-green-500 rounded-md shadow-lg">
              <ul className="py-1">
                {projects.map((project, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-green-500 hover:text-white cursor-pointer"
                  >
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* All Button with Dropdown */}
        <div className="relative flex-1" ref={allDropdownRef}>
          <button
            className="flex items-center justify-between w-full px-3 py-2 bg-white bg-opacity-10 backdrop-blur-lg border-2 border-green-500 rounded-md"
            onClick={() => {
              setIsAllDropdownOpen(!isAllDropdownOpen);
              setIsMyProjectDropdownOpen(false); // Close the Myproject dropdown if open
            }}
          >
            <span>All (2)</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {isAllDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white bg-opacity-10 backdrop-blur-lg border-2 border-green-500 rounded-md shadow-lg">
              <ul className="py-1">
                {allItems.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-green-500 hover:text-white cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col space-y-3 mb-4">
        <div className="flex justify-between items-center gap-2">
          <h1 className="font-medium">Device List</h1>
          <div className="flex space-x-1">
            <button className="w-8 h-8 bg-green-600 flex items-center justify-center rounded-md">
              <FontAwesomeIcon icon={faBars} />
            </button>
            <button className="w-8 h-8 bg-white bg-opacity-20 flex items-center justify-center rounded-md">
              <FontAwesomeIcon icon={faSitemap} />
            </button>
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-white bg-opacity-10 rounded-md text-sm">
              All
            </button>
            <button className="px-3 py-2 bg-white bg-opacity-10 flex items-center space-x-1 rounded-md text-sm">
              <span>All Model</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center bg-white bg-opacity-10 rounded-md px-1">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-white py-2 px-2 focus:outline-none text-sm"
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <div className="flex gap-1">
            <button className="w-12 h-10 bg-white bg-opacity-10 border-[2px] border-green-500 border-opacity-50 rounded-lg flex items-center justify-between">
              <FontAwesomeIcon icon={faFileAlt} className="m-1" />
              <FontAwesomeIcon icon={faChevronDown} className="m-1" />
            </button>

            <button className="w-12 h-10 bg-white bg-opacity-10 border-[2px] border-green-500 border-opacity-50 rounded-lg flex items-center justify-between">
              <FontAwesomeIcon icon={faFilter} className="m-1" />
              <FontAwesomeIcon icon={faChevronDown} className="m-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Device List Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-md overflow-hidden">
          <thead>
            <tr className="bg-white bg-opacity-10 border-opacity-50 rounded-lg">
              <th className="p-2 text-sm">
                <input type="checkbox" />
              </th>
              <th className="p-2 text-sm">SN</th>
              <th className="p-2 text-sm">MAC</th>
              <th className="p-2 text-sm">IP</th>
              <th className="p-2 text-sm">Name</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-2 text-center text-sm">
                  <input type="checkbox" />
                </td>
                <td className="p-2 text-center text-sm">{device.sn}</td>
                <td className="p-2 text-center text-sm">{device.mac}</td>
                <td className="p-2 text-center text-sm">{device.ip}</td>
                <td className="p-2 text-center text-sm flex items-center justify-center">
                  {device.name}
                  <span className="text-green-500 ml-1 text-xs">More</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevicesMobileView;
