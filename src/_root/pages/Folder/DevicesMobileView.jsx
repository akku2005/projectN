import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLayerGroup,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Dashboard.scss";

const DevicesMobileView = ({ projects, setProjects }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      name: projectName,
      notes: projectNotes,
      device_nums: 0,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setProjectName("");
    setProjectNotes("");
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Project</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 p-2 rounded-full w-10 h-10 flex justify-center items-center shadow-lg"
        >
          <FontAwesomeIcon icon={faPlus} className="text-white" />
        </button>
      </div>

      <div className="mb-6">
        <h2 className=" text-lg font-semibold mb-3">Projects</h2>
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="ProjectInfo bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className=" items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-green-400"
                  />
                  <span className="font-medium">{project.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  ({project.device_nums || 0} devices)
                </span>
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <button className="text-sm text-blue-500">Handover</button>
                <button className="text-sm text-green-500">Add</button>
                <button className="text-sm text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={formRef}
            className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg p-6 w-5/6 max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Project</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
                className="border p-2 rounded-md w-full mb-4"
                required
              />
              <textarea
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Project Notes"
                className="border p-2 rounded-md w-full mb-4"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md w-full"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="ProjectInfo bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg mt-4 mb-10">
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

// import React, { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
// import "../../styles/Dashboard.scss";

// const DevicesMobileView = ({ projects, setProjects }) => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [projectName, setProjectName] = useState("");
//   const [projectNotes, setProjectNotes] = useState("");
//   const formRef = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add the new project to the projects array
//     const newProject = {
//       name: projectName,
//       notes: projectNotes,
//       device_nums: 0, // Initialize with 0 devices
//     };
//     setProjects((prevProjects) => [...prevProjects, newProject]);
//     // Reset form fields
//     setProjectName("");
//     setProjectNotes("");
//     setIsFormOpen(false); // Close the form
//   };

//   // Close form if clicking outside of it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (formRef.current && !formRef.current.contains(event.target)) {
//         setIsFormOpen(false);
//       }
//     };

//     // Attach event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Clean up the event listener
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="p-4 sm:p-6 md:p-8 mb-10">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl">Project</h1>
//         <button
//           onClick={() => setIsFormOpen(true)}
//           className="bg-green-500 p-2 rounded-md h-8 flex justify-center items-center"
//         >
//           <FontAwesomeIcon icon={faPlus} className="text-white" />
//         </button>
//       </div>

//       <div>
//         <h2 className="text-xl mb-2">Projects</h2>
//         <div className="space-y-4">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="PendingInfo bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start"
//             >
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faLayerGroup} className="" />
//                 <span>
//                   {project.name} ({project.device_nums || 0})
//                 </span>
//               </div>
//               <div className="flex space-x-6 mt-6 justify-center w-full">
//                 <span className="text-sm">Handover</span>
//                 <span className="text-sm">Add</span>
//                 <span className="text-sm text-red-500">Delete</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Popup for adding new project */}
//       {isFormOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div
//             ref={formRef}
//             className=" rounded-md shadow-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20 p-8"
//           >
//             <h2 className="text-2xl mb-4">Create New Project</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 placeholder="Project Name"
//                 className="border p-2 rounded-md w-full mb-4"
//                 required
//               />
//               <textarea
//                 value={projectNotes}
//                 onChange={(e) => setProjectNotes(e.target.value)}
//                 placeholder="Project Notes"
//                 className="border p-2 rounded-md w-full mb-4"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white p-2 rounded-md"
//               >
//                 Create Project
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="bg-white bg-opacity-10 backdrop-blur-lg border-white rounded-lg p-6 w-full shadow-lg mt-4 mb-10">
//         <p className="text-lg mb-2">Project Info</p>
//         <div className="flex items-center mb-4">
//           <i className="fas fa-layer-group text-3xl mr-3 text-green-400"></i>
//           <h1 className="text-2xl font-bold">My Project</h1>
//         </div>
//         <p className="text-md mb-4 text-gray-400">
//           Creation Time: 2024-08-22 17:56:59
//         </p>
//         <p className="text-md">
//           Project Notes: 1. This item is the system default and cannot be
//           modified or deleted. 2. Users can put new access or temporarily
//           unallocated devices into this item.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DevicesMobileView;
