import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThemeContext } from "../../../components/context/ThemeContext";
import DevicesMobileView from "./DevicesMobileView";
import { motion, AnimatePresence } from "framer-motion";

const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">Loading...</div>
  </div>
);

const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded-md ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`}
  >
    {message}
    <button onClick={onClose} className="ml-2">
      ×
    </button>
  </div>
);

const Folder = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const popupRef = useRef(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("userToken");
      if (!token) throw new Error("User token cookie not found");

      const response = await axios.get(
        "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/device",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const fetchedProjects = response.data.workgroupInfo[0]?.child || [];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later.");
      setProjects([
        { id: 1, name: "Project 1", device_nums: 0 },
        { id: 2, name: "Project 2", device_nums: 0 },
        { id: 3, name: "Project 3", device_nums: 0 },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("userToken");
      if (!token) throw new Error("User token cookie not found");

      await axios.post(
        "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/create-project",
        { name: projectName, notes: projectNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjectName("");
      setProjectNotes("");
      setIsPopupOpen(false);
      fetchProjects();
      showToast("Project created successfully!", "success");
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.");
      showToast("Error creating project. Please try again.", "error");
    }
  };

  const handleProjectAction = async (action, projectId) => {
    try {
      const token = Cookies.get("userToken");
      if (!token) throw new Error("User token cookie not found");

      await axios.post(
        `http://13.233.36.198:5000/api/cloudnet/portal/dashboard/${action}-project`,
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchProjects();
      showToast(
        `${
          action.charAt(0).toUpperCase() + action.slice(1)
        } project successfully!`,
        "success"
      );
    } catch (error) {
      console.error(`Error ${action} project:`, error);
      setError(`Failed to ${action} project. Please try again.`);
      showToast(`Error ${action} project. Please try again.`, "error");
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setProjectName("");
    setProjectNotes("");
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        {isMobile ? (
          <DevicesMobileView projects={projects} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full mt-4"
          >
            {/* Top Box */}
            <div className="p-4 mb-2 flex justify-between items-center rounded-md">
              <div>
                <h2 className="text-xl font-semibold">Project</h2>
              </div>
              <div
                className="text-4xl cursor-pointer bg-green-500 w-10 h-10 flex items-center justify-center rounded-md"
                onClick={() => setIsPopupOpen(true)}
              >
                +
              </div>
            </div>

            {/* Middle Box */}
            <div className="flex items-center mb-10 mt-5">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg">
                <h1 className="text-lg mb-4">Project List</h1>
                {loading ? (
                  <div>Loading projects...</div>
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
                          <span
                            className="text-green-500 cursor-pointer"
                            onClick={() =>
                              handleProjectAction("handover", project.id)
                            }
                          >
                            Handover
                          </span>
                          <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() =>
                              handleProjectAction("add", project.id)
                            }
                          >
                            Add
                          </span>
                          <span
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              handleProjectAction("delete", project.id)
                            }
                          >
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

            {/* Popup for adding new project */}
            {isPopupOpen && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    ref={popupRef}
                    className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg shadow-lg p-8"
                    onClick={(e) => e.stopPropagation()}
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

                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="bg-green-500 text-black p-2 rounded-md "
                        >
                          Create Project
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 text-black p-2 rounded-md "
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
          </motion.div>
        )}
      </div>
    </Suspense>
  );
};

export default Folder;
