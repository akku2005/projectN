import React, { Suspense, useEffect, useState, useRef } from "react";
import axios from "axios"; // Import Axios for making API calls
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import { ThemeContext } from "../../../components/context/ThemeContext";
import DevicesMobileView from "./DevicesMobileView"; // Import the mobile view component

// Fallback Loader Component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">Loading...</div>
  </div>
);

const Folder = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  // State to track mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // State for popup visibility and form data
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectNotes, setProjectNotes] = useState("");

  // State for projects and loading
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Ref for the popup element
  const popupRef = useRef(null);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch projects from the API
  const fetchProjects = async () => {
    try {
      setLoading(true); // Start loading

      const token = Cookies.get("userToken");
      if (!token) throw new Error("User token cookie not found");

      const response = await axios.get(
        "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/device",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedProjects = response.data.workgroupInfo[0]?.child || [];
      setProjects(fetchedProjects); // Set projects from the response
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Set dummy data on error
      setProjects([
        { name: "0", device_nums: 0 },
        { name: "0", device_nums: 0 },
        { name: "0", device_nums: 0 },
      ]); // Dummy data
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when component mounts
  }, []); // Empty dependency array to run only once

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Created:", projectName, projectNotes);
    // Reset form and close popup
    setProjectName("");
    setProjectNotes("");
    setIsPopupOpen(false);
  };

  // Close popup when clicking outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the popup
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        {isMobile ? (
          <DevicesMobileView projects={projects} /> // Pass projects data to mobile view
        ) : (
          <div className="flex flex-col w-full mt-4">
            {/* Top Box */}
            <div className="p-4 mb-2 flex justify-between items-center rounded-md">
              <div>
                <h2 className="text-xl font-semibold">Project</h2>
              </div>
              <div
                className="text-4xl cursor-pointer bg-green-500 w-10 h-10 flex items-center justify-center rounded-md"
                onClick={() => setIsPopupOpen(true)} // Open popup on click
              >
                +
              </div>
            </div>

            {/* Middle Box */}
            <div className="flex items-center mb-10 mt-5">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg">
                <h1 className="text-lg mb-4">Project List</h1>
                {loading ? (
                  <div>Loading projects...</div> // Loading message
                ) : (
                  <ul>
                    {projects.map((project, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        <div className="flex items-center">
                          <i className="fas fa-layer-group mr-2"></i>
                          <span>
                            {project.name} (Devices: {project.device_nums || 0})
                          </span>
                        </div>
                        <div className="flex space-x-10 font-medium">
                          <span className="text-green-500 cursor-pointer">
                            Handover
                          </span>
                          <span className="text-blue-500 cursor-pointer">
                            Add
                          </span>
                          <span className="text-red-500 cursor-pointer">
                            Delete
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Bottom Box */}
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
        )}

        {/* Popup for adding new project */}
        {isPopupOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsPopupOpen(false)} // Close popup on backdrop click
          >
            <div
              ref={popupRef}
              className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg  shadow-lg p-8"
              onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
            >
              <h2 className="text-2xl mb-4">Create New Project</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Project Name"
                  className="border p-2 rounded-md w-full mb-4 bg-white bg-opacity-20 backdrop-blur-md border-white border-opacity-20"
                  required
                />
                <textarea
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Project Notes"
                  className="border p-2 rounded-md w-full mb-4 bg-white bg-opacity-20 backdrop-blur-md border-white border-opacity-20"
                  required
                />

                <button
                  type="submit"
                  className="bg-green-500 text-black p-2 rounded-md"
                >
                  Create Project
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Folder;
