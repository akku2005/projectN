import React, { Suspense } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faSearch,
  faPrint,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../../_root/styles/Dashboard.scss";
import { ThemeContext } from "../../../components/context/ThemeContext";
import "tailwindcss/tailwind.css";

// Fallback Loader Component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">Loading...</div>
  </div>
);

const DeviceList = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className="p-5">
      <div className="flex space-x-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg justify-between">
        <div className="px-4 py-2 border-2 border-green-500 rounded-md text-green-500 w-[263px] text-center">
          Upgrade
        </div>
        <div className="px-4 py-2 w-[263px] text-center">Upgrade</div>
        <div className="px-4 py-2 w-[263px] text-center">Upgrade</div>
        <div className="px-4 py-2 w-[263px] text-center">Upgrade</div>
      </div>

      <div className="flex items-center mt-10 mb-10">
        <div className="text-lg font-semibold">Device List</div>
        <div className="flex items-center ml-auto space-x-2">
          <div className="relative h-12 flex items-center">
            <button className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded space-x-2">
              <p className="text-white">EAP520</p>
              <FontAwesomeIcon icon={faChevronDown} className="text-white" />
            </button>
          </div>
          <div className="relative h-12">
            <input
              type="text"
              placeholder="Search"
              className="bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            />
          </div>
          <div className="relative h-12 flex items-center">
            <button className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded space-x-2">
              <FontAwesomeIcon icon={faPrint} className="text-white" />
              <FontAwesomeIcon icon={faChevronDown} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div>
          <table
            className={`min-w-full ${isDarkMode ? "text-white" : "text-black"}`}
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
              {[
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
              ].map((row, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SecurityPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
        <Sidebar /> {/* Sidebar */}
        <div className="dashboard-content">
          <Header /> {/* Header */}
          <div className="statistics flex items-start">
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
                  {[
                    { name: "My Project 1", count: 2, link: "#" },
                    { name: "My Project 2", count: 3, link: "#" },
                    { name: "My Project 3", count: 5, link: "#" },
                    { name: "My Project 4", count: 1, link: "#" },
                    { name: "My Project 5", count: 4, link: "#" },
                  ].map((project, index) => (
                    <div key={index} className="mb-4">
                      <a
                        href={project.link}
                        className={`flex items-center border-[3px] border-transparent hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-auto ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                        {project.name} ({project.count})
                      </a>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            {/* Device List */}
            <DeviceList />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SecurityPage;

// import React, { Suspense } from "react";
// import Header from "../../../components/Header";
// import Sidebar from "../../../components/sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLayerGroup,
//   faSearch,
//   faPrint,
//   faChevronDown,
// } from "@fortawesome/free-solid-svg-icons";
// import "../../../_root/styles/Dashboard.scss";
// import { ThemeContext } from "../../../components/context/ThemeContext";
// import "tailwindcss/tailwind.css";

// // Fallback Loader Component
// const LoadingFallback = () => (
//   <div className="loading-container">
//     <div className="loading-spinner">Loading...</div>
//   </div>
// );

// const DeviceList = () => {
//   const { isDarkMode } = React.useContext(ThemeContext);

//   return (
//     <div className=" p-5 ml-5 mt-5">
//       <div className="PendingInfo flex space-x-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg justify-between">
//         <div className="px-4 py-2 border-2 border-green-500 rounded-md text-green-500 w-[263px] text-center">
//           Upgrade
//         </div>
//         <div className="px-4 py-2 w-[263px] text-center">Upgrade</div>
//         <div className="px-4 py-2 w-[263px] text-center">Upgrade</div>
//         <div className="px-4 py-2 w-[263px] text-center">Upgrade</div>
//       </div>

//       <div className="PendingInfo flex items-center mt-10 mb-10 p-1">
//         <div className="text-lg font-semibold">Device List</div>
//         <div className="flex items-center ml-auto space-x-2">
//           <div className="relative h-12 flex items-center">
//             <button className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded space-x-2">
//               <p>EAP520</p>
//               <FontAwesomeIcon icon={faChevronDown} />
//             </button>
//           </div>
//           <div className="relative h-12">
//             <input
//               type="text"
//               placeholder="Search"
//               className="bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded"
//             />
//             <FontAwesomeIcon
//               icon={faSearch}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2"
//             />
//           </div>
//           <div className="relative h-12 flex items-center">
//             <button className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg h-full py-1 px-4 rounded space-x-2">
//               <FontAwesomeIcon icon={faPrint} />
//               <FontAwesomeIcon icon={faChevronDown} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="PendingInfo mt-4">
//         <div>
//           <table
//             className={`min-w-full ${isDarkMode ? "text-white" : "text-black"}`}
//           >
//             <thead>
//               <tr className="bg-white bg-opacity-10 backdrop-blur-lg border-gray-300 border-opacity-40">
//                 <th className="py-2 px-4 text-left">
//                   <input
//                     type="checkbox"
//                     style={{
//                       width: "21px",
//                       height: "20px",
//                       borderRadius: "10px",
//                     }}
//                   />
//                 </th>
//                 <th className="py-2 px-4 text-left">SN</th>
//                 <th className="py-2 px-4 text-left">MAC</th>
//                 <th className="py-2 px-4 text-left">IP</th>
//                 <th className="py-2 px-4 text-left">Name</th>
//                 <th className="py-2 px-4 text-left">Type</th>
//                 <th className="py-2 px-4 text-left">Mode</th>
//                 <th className="py-2 px-4 text-left">Version</th>
//                 <th className="py-2 px-4 text-left">Access Time</th>
//                 <th className="py-2 px-4 text-left">Status</th>
//                 <th className="py-2 px-4 text-left">Config</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 {
//                   sn: 1,
//                   mac: "44:D1:FA:EF:58:FC",
//                   ip: "172.16.100.2",
//                   name: "Gateways",
//                   type: "EAP520",
//                   mode: "AP",
//                   version: "WIS-EAP520-V3...",
//                   accessTime: "2024-08-22 20:07:0",
//                   statusIcon: "fas fa-check-circle",
//                 },
//                 {
//                   sn: 2,
//                   mac: "44:D1:FA:EF:58:FC",
//                   ip: "172.16.100.2",
//                   name: "Gateways",
//                   type: "EAP520",
//                   mode: "AP",
//                   version: "WIS-EAP520-V3...",
//                   accessTime: "2024-08-22 20:07:0",
//                   statusIcon: "fas fa-check-circle",
//                 },
//               ].map((row, index) => (
//                 <tr key={index} className="bg-transparent">
//                   <td className="py-2 px-4">
//                     <input
//                       type="checkbox"
//                       style={{
//                         width: "21px",
//                         height: "20px",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   </td>
//                   <td className="py-2 px-4">{row.sn}</td>
//                   <td className="py-2 px-4">{row.mac}</td>
//                   <td className="py-2 px-4">{row.ip}</td>
//                   <td className="py-2 px-4">{row.name}</td>
//                   <td className="py-2 px-4">{row.type}</td>
//                   <td className="py-2 px-4">{row.mode}</td>
//                   <td className="py-2 px-4">{row.version}</td>
//                   <td className="py-2 px-4">{row.accessTime}</td>
//                   <td className="py-2 px-4">
//                     <i className={row.statusIcon}></i>
//                   </td>
//                   <td className="py-2 px-4">...</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SecurityPage = () => {
//   const { isDarkMode } = React.useContext(ThemeContext);

//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
//         <Sidebar /> {/* Sidebar */}
//         <div className="dashboard-content">
//           <Header /> {/* Header */}
//           <div className="statistics flex items-start">
//             {/* Left Box */}
//             <div
//               className={`ProjectListItem bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-tr-lg rounded-br-lg p-1 border-t border-r border-gray-100 w-full h-auto sm:h-[380px] mt-4 lg:h-screen lg:w-[240px] ${
//                 isDarkMode ? "dark" : "light"
//               }`}
//             >
//               <div className="p-5 w-50">
//                 <h2
//                   className={`text-2xl mb-5 ${
//                     isDarkMode ? "text-white" : "text-black"
//                   }`}
//                 >
//                   Project List
//                 </h2>
//                 <ul className="list-none p-2">
//                   {[
//                     { name: "My Project 1", count: 2, link: "#" },
//                     { name: "My Project 2", count: 3, link: "#" },
//                     { name: "My Project 3", count: 5, link: "#" },
//                     { name: "My Project 4", count: 1, link: "#" },
//                     { name: "My Project 5", count: 4, link: "#" },
//                   ].map((project, index) => (
//                     <div key={index} className="mb-4">
//                       <a
//                         href={project.link}
//                         className={`flex items-center border-[3px] border-transparent hover:border-green-500 p-2 rounded-lg transition-all duration-200 w-auto ${
//                           isDarkMode ? "text-white" : "text-black"
//                         }`}
//                       >
//                         <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
//                         {project.name} ({project.count})
//                       </a>
//                     </div>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             {/* Device List */}
//             <DeviceList />
//           </div>
//         </div>
//       </div>
//     </Suspense>
//   );
// };

// export default SecurityPage;
