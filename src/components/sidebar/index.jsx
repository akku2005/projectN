// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { RiDashboardHorizontalLine } from "react-icons/ri";
// import { IoWifiOutline, IoSettingsOutline } from "react-icons/io5";
// import { FaRegFolder } from "react-icons/fa";
// import { MdOutlineSecurity } from "react-icons/md";
// import { CiLock } from "react-icons/ci";
// import { TbUsers } from "react-icons/tb";
// import { FiLogOut } from "react-icons/fi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import "../../_root/styles/Sidebar.scss";
// import Icons from "../../_root/constants/Icons";
// import Cookies from "js-cookie";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Set active page based on current location
//   const getActivePage = () => {
//     switch (location.pathname) {
//       case "/dashboard":
//         return "Present";
//       case "/devices":
//         return "Devices";
//       case "/folder":
//         return "Folder"; // Corrected this line
//       case "/security":
//         return "Security";
//       case "/lock":
//         return "Lock";
//       case "/users":
//         return "Users";
//       case "/settings":
//         return "Settings";
//       default:
//         return "";
//     }
//   };

//   const handleIconClick = (path) => {
//     setIsSidebarOpen(false); // Close the sidebar
//     navigate(path); // Navigate to the new route
//   };

//   const handleLogout = () => {
//     Cookies.remove("userToken");
//     navigate("/");
//   };

//   useEffect(() => {
//     // Close the sidebar when clicking outside
//     const handleOutsideClick = (e) => {
//       if (
//         isSidebarOpen &&
//         !document.querySelector(".sidebar").contains(e.target) &&
//         !document.querySelector(".hamburger-icon").contains(e.target)
//       ) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick);
//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, [isSidebarOpen]);

//   return (
//     <div className="sidebar-container relative">
//       {/* Hamburger Menu for Mobile */}
//       <div className="hamburger-icon md:hidden absolute top-4 left-4 z-50">
//         <GiHamburgerMenu
//           className="w-6 h-6 text-white"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         />
//       </div>

//       {/* Sidebar for large screens */}
//       <div
//         className={`sidebar flex-col justify-between h-full p-4 hidden md:flex ${
//           isSidebarOpen ? "open" : ""
//         }`}
//       >
//         <div className="logo mb-4">
//           <img src={Icons.Logo} alt="Logo" className="w-16 h-16" />
//         </div>

//         <div className="horizontal-line border-t-2 border-gray-300 my-5 mb-3 justify-center items-center" />

//         <div className="icons flex-grow flex flex-col items-center">
//           <Link
//             to="/dashboard"
//             className={`icon-container ${
//               getActivePage() === "Present" ? "active" : ""
//             }`}
//             onClick={() => handleIconClick("/dashboard")}
//           >
//             <RiDashboardHorizontalLine className="icon w-6 h-6 text-white" />
//           </Link>
//           <Link
//             to="/devices"
//             className={`icon-container ${
//               getActivePage() === "Devices" ? "active" : ""
//             }`}
//             onClick={() => handleIconClick("/devices")}
//           >
//             <IoWifiOutline className="icon w-6 h-6 text-white" />
//           </Link>
//           <Link
//             to="/folder"
//             className={`icon-container ${
//               getActivePage() === "Folder" ? "active" : "" // Corrected this line
//             }`}
//             onClick={() => handleIconClick("/folder")}
//           >
//             <FaRegFolder className="icon w-6 h-6 text-white" />
//           </Link>
//           <Link
//             to="/security"
//             className={`icon-container ${
//               getActivePage() === "Security" ? "active" : ""
//             }`}
//             onClick={() => handleIconClick("/security")}
//           >
//             <MdOutlineSecurity className="icon w-6 h-6 text-white" />
//           </Link>
//           <Link
//             to="/lock"
//             className={`icon-container ${
//               getActivePage() === "Lock" ? "active" : ""
//             }`}
//             onClick={() => handleIconClick("/lock")}
//           >
//             <CiLock className="icon w-6 h-6 text-white" />
//           </Link>
//           <Link
//             to="/users"
//             className={`icon-container ${
//               getActivePage() === "Users" ? "active" : ""
//             }`}
//             onClick={() => handleIconClick("/users")}
//           >
//             <TbUsers className="icon w-6 h-6 text-white" />
//           </Link>
//         </div>

//         <div className="settings mt-4 flex flex-col items-center space-y-4">
//           <Link
//             to="/settings"
//             className={`icon-container ${
//               getActivePage() === "Settings" ? "active" : ""
//             }`}
//             onClick={() => handleIconClick("/settings")}
//           >
//             <IoSettingsOutline className="icon w-6 h-6 text-white" />
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="icon-container focus:outline-none"
//           >
//             <FiLogOut className="icon w-6 h-6 text-white" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>
//       )}

//       {/* Bottom Navigation for Mobile */}
//       <div className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] flex justify-around items-center p-2 z-50">
//         <Link
//           to="/dashboard"
//           className={`icon-container ${
//             getActivePage() === "Present" ? "active" : ""
//           }`}
//           onClick={() => handleIconClick("/dashboard")}
//         >
//           <RiDashboardHorizontalLine className="icon w-6 h-6 text-white" />
//         </Link>
//         <Link
//           to="/devices"
//           className={`icon-container ${
//             getActivePage() === "Devices" ? "active" : ""
//           }`}
//           onClick={() => handleIconClick("/devices")}
//         >
//           <IoWifiOutline className="icon w-6 h-6 text-white" />
//         </Link>
//         <Link
//           to="/folder"
//           className={`icon-container ${
//             getActivePage() === "Folder" ? "active" : "" // Corrected this line
//           }`}
//           onClick={() => handleIconClick("/folder")}
//         >
//           <FaRegFolder className="icon w-6 h-6 text-white" />
//         </Link>

//         <Link
//           to="/security"
//           className={`icon-container ${
//             getActivePage() === "Security" ? "active" : ""
//           }`}
//           onClick={() => handleIconClick("/security")}
//         >
//           <MdOutlineSecurity className="icon w-6 h-6 text-white" />
//         </Link>
//         <Link
//           to="/settings"
//           className={`icon-container ${
//             getActivePage() === "Settings" ? "active" : ""
//           }`}
//           onClick={() => handleIconClick("/settings")}
//         >
//           <IoSettingsOutline className="icon w-6 h-6 text-white" />
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="icon-container focus:outline-none"
//         >
//           <FiLogOut className="icon w-6 h-6 text-white" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { IoWifiOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { TbUsers } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../_root/styles/Sidebar.scss";
import Icons from "../../_root/constants/Icons";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getActivePage = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Present";
      case "/dashboard/devices":
        return "Devices";
      case "/dashboard/folder":
        return "Folder";
      case "/dashboard/security":
        return "Security";
      case "/lock":
        return "Lock";
      case "/users":
        return "Users";
      case "/settings":
        return "Settings";
      default:
        return "";
    }
  };

  const handleIconClick = (path) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove("userToken");
    navigate("/");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isSidebarOpen &&
        !document.querySelector(".sidebar").contains(e.target) &&
        !document.querySelector(".hamburger-icon").contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="sidebar-container relative">
      {/* Hamburger Menu for Mobile */}
      <div className="hamburger-icon md:hidden absolute top-4 left-4 z-50">
        <GiHamburgerMenu
          className="w-6 h-6 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Sidebar for large screens */}
      <div
        className={`sidebar flex-col justify-between h-full p-4 hidden md:flex ${
          isSidebarOpen ? "open" : ""
        }`}
      >
        <div className="logo mb-4">
          <img src={Icons.Logo} alt="Logo" className="w-16 h-16" />
        </div>

        <div className="horizontal-line border-t-2 border-gray-300 my-5 mb-3 justify-center items-center" />

        <div className="icons flex-grow flex flex-col items-center">
          <Link
            to="/dashboard"
            className={`icon-container ${
              getActivePage() === "Present" ? "active" : ""
            }`}
            onClick={() => handleIconClick("/dashboard")}
          >
            <RiDashboardHorizontalLine className="icon w-6 h-6 text-white" />
          </Link>
          <Link
            to="/dashboard/devices"
            className={`icon-container ${
              getActivePage() === "Devices" ? "active" : ""
            }`}
            onClick={() => handleIconClick("/dashboard/devices")}
          >
            <IoWifiOutline className="icon w-6 h-6 text-white" />
          </Link>
          <Link
            to="/dashboard/folder"
            className={`icon-container ${
              getActivePage() === "Folder" ? "active" : "" // Corrected this line
            }`}
            onClick={() => handleIconClick("/dashboard/folder")}
          >
            <FaRegFolder className="icon w-6 h-6 text-white" />
          </Link>
          <Link
            to="/dashboard/security"
            className={`icon-container ${
              getActivePage() === "Security" ? "active" : ""
            }`}
            onClick={() => handleIconClick("/dashboard/security")}
          >
            <MdOutlineSecurity className="icon w-6 h-6 text-white" />
          </Link>
          <Link
            to="/lock"
            className={`icon-container ${
              getActivePage() === "Lock" ? "active" : ""
            }`}
            onClick={() => handleIconClick("/lock")}
          >
            <CiLock className="icon w-6 h-6 text-white" />
          </Link>
          <Link
            to="/users"
            className={`icon-container ${
              getActivePage() === "Users" ? "active" : ""
            }`}
            onClick={() => handleIconClick("/users")}
          >
            <TbUsers className="icon w-6 h-6 text-white" />
          </Link>
        </div>

        <div className="settings mt-4 flex flex-col items-center space-y-4">
          <Link
            to="/settings"
            className={`icon-container ${
              getActivePage() === "Settings" ? "active" : ""
            }`}
            onClick={() => handleIconClick("/settings")}
          >
            <IoSettingsOutline className="icon w-6 h-6 text-white" />
          </Link>
          <button
            onClick={handleLogout}
            className="icon-container focus:outline-none"
          >
            <FiLogOut className="icon w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>
      )}

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] flex justify-around items-center p-2 z-50">
        <Link
          to="/dashboard"
          className={`icon-container ${
            getActivePage() === "Present" ? "active" : ""
          }`}
          onClick={() => handleIconClick("/dashboard")}
        >
          <RiDashboardHorizontalLine className="icon w-6 h-6 text-white" />
        </Link>
        <Link
          to="/devices"
          className={`icon-container ${
            getActivePage() === "Devices" ? "active" : ""
          }`}
          onClick={() => handleIconClick("/devices")}
        >
          <IoWifiOutline className="icon w-6 h-6 text-white" />
        </Link>
        <Link
          to="/folder"
          className={`icon-container ${
            getActivePage() === "Folder" ? "active" : "" // Corrected this line
          }`}
          onClick={() => handleIconClick("/folder")}
        >
          <FaRegFolder className="icon w-6 h-6 text-white" />
        </Link>

        <Link
          to="/security"
          className={`icon-container ${
            getActivePage() === "Security" ? "active" : ""
          }`}
          onClick={() => handleIconClick("/security")}
        >
          <MdOutlineSecurity className="icon w-6 h-6 text-white" />
        </Link>
        <Link
          to="/settings"
          className={`icon-container ${
            getActivePage() === "Settings" ? "active" : ""
          }`}
          onClick={() => handleIconClick("/settings")}
        >
          <IoSettingsOutline className="icon w-6 h-6 text-white" />
        </Link>
        <button
          onClick={handleLogout}
          className="icon-container focus:outline-none"
        >
          <FiLogOut className="icon w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
