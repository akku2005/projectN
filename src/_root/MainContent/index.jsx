import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MainContent.scss";
import Icons from "../constants/Icons";
import ChatPage from "../Chart/ChatPage";
import DeviceStatistics from "../Chart/DeviceStatistics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { FaWifi, FaInfoCircle } from "react-icons/fa";
import ResourceStatistics from "../ResourceStatistics";
import PendingInfoBox from "../ResourceStatistics/PendingInfoBox";
import MobilePendingInfoSection from "../ResourceStatistics/PendingInfoSection";
import MobileProjectInfo from "../ResourceStatistics/ProjectInfo";
import Cookies from "js-cookie";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MainContent = ({ isDarkMode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [deviceStats, setDeviceStats] = useState({
    totalDevices: 0,
    onlineTotal: 0,
    alarmTotal: 0,
    offlineTotal: 0,
    inspectionReport: 0,
  });

  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [workgroupTop, setWorkgroupTop] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchDeviceStatistics = async () => {
    try {
      setLoading(true); // Start loading

      const token = Cookies.get("userToken");
      if (!token) throw new Error("User token cookie not found");

      const response = await axios.get(
        "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/info",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const deviceStatistics = response.data.dashboardData.deviceStatistics;
      if (!deviceStatistics) throw new Error("No device statistics found");

      setDeviceStats({
        totalDevices: deviceStatistics.all || 0,
        onlineTotal: deviceStatistics.online || 0,
        alarmTotal: deviceStatistics.alarm || 0,
        offlineTotal: deviceStatistics.offline || 0,
        inspectionReport: Object.values(deviceStatistics.product || {}).reduce(
          (a, b) => a + b,
          0
        ),
      });

      const workgroupData = response.data.dashboardData.workgroupTop;
      setWorkgroupTop(workgroupData || []);
    } catch (err) {
      // setError("Failed to fetch device statistics");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchDeviceStatistics();
  }, []);

  // Sample data for charts
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  const textColorClass = isDarkMode ? "text-white" : "text-[#616161]";

  return (
    <section className="main-content mt-6 mb-14">
      <div>
        {/* Resource Section for Mobile */}
        <div className="w-full">
          <ResourceStatistics />
        </div>

        {/* Resource Section for Large Screens */}
        <div className="hidden md:flex flex-row gap-8 w-full h-auto">
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between text-xl mb-2 w-[405px] h-[28px]">
              <p>Resource Statistics</p>
            </div>

            <div className="flex flex-col md:flex-row gap-14 mt-3 w-full md:flex-wrap">
              {[
                { count: deviceStats.totalDevices, label: "Total Devices" },
                { count: deviceStats.onlineTotal, label: "Online Total" },
                { count: deviceStats.alarmTotal, label: "Alarm Total" },
                { count: deviceStats.offlineTotal, label: "Offline Total" },
                {
                  count: deviceStats.inspectionReport,
                  label: "Inspection Report",
                },
              ].map(({ count, label }, index) => (
                <div
                  key={index}
                  className="font-bold flex items-end gap-2 md:gap-4 w-full md:w-[150px]"
                >
                  <span className="font-semibold text-[40px] md:text-[50px] leading-none text-center">
                    {count}
                  </span>
                  <div className="text-[16px] md:text-[20px] leading-[24px] font-medium text-start">
                    {label.split(" ").map((word, idx) => (
                      <div key={idx}>{word}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="ml-auto flex items-center">
                <img
                  src={Icons.wifiIcon}
                  alt="WiFi Icon"
                  className="w-[80px] h-[80px] object-contain md:block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 mt-1">
          <h1 className="text-3xl font-medium mb-14">Project Info</h1>

          <div className="flex flex-wrap gap-4">
            {/* Conditional Rendering: Show loading card or data */}
            {loading ? (
              <div
                className="ProjectInfo bg-white bg-opacity-10 backdrop-blur-lg 
        rounded-lg shadow-lg flex items-center justify-center 
        w-full md:w-[calc(50%-1rem)] h-[200px] border border-gray-100 
        border-opacity-30 p-5"
              >
                <p className="text-xl text-gray-500">Loading...</p>
              </div>
            ) : workgroupTop.length > 0 ? (
              workgroupTop.map((project) => (
                <div
                  key={project.gid}
                  className="ProjectInfo bg-white bg-opacity-10 backdrop-blur-lg 
          rounded-lg shadow-lg flex flex-col justify-between 
          w-full md:w-[calc(50%-1rem)] h-[200px] gap-4 border 
          border-gray-100 border-opacity-30 p-5 md:h-auto"
                >
                  <div className="flex items-center mb-2 gap-4">
                    <FaWifi className="h-[24px] w-[24px] text-[rgb(86,238,104)]" />
                    <h2 className="text-xl">
                      {project.name.replace(/[^\x00-\x7F]/g, "").trim()}
                    </h2>
                  </div>
                  <p className="text-sm md:text-base mb-4">
                    Creation Time: {project.created_at}
                  </p>
                  <div className="flex justify-between">
                    {project.dev_statistic.map((stat, index) => (
                      <div
                        key={index}
                        className="text-center flex items-center gap-4"
                      >
                        <p className="text-3xl font-bold">{stat.devnums}</p>
                        <p className="text-sm md:text-base">
                          {stat.type === "1" ? "AP" : "Gateway"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="ProjectInfo bg-white bg-opacity-10 backdrop-blur-lg 
        rounded-lg shadow-lg flex items-center justify-center 
        w-full md:w-[calc(50%-1rem)] h-[200px] border border-gray-100 
        border-opacity-30 p-5"
              >
                <p className="text-xl text-gray-500">No projects found...</p>
              </div>
            )}

            {/* Always Rendered "No Project Info" Card */}
            <div className="ProjectInfo bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg w-full h-[200px] gap-4 border border-gray-100 border-opacity-30 flex flex-col justify-center items-center flex-1">
              <div className="text-center flex justify-center">
                <FaWifi className="text-xl mb-2 mx-auto" />
              </div>
              <h2 className="text-base md:text-3xl font-medium">
                No Project Info
              </h2>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Pending Info */}
          <div className="text-center">
            <div className="flex justify-between items-center mb-9">
              <h1 className="text-3xl font-medium mb-6">Pending Info</h1>
              <FaInfoCircle className="w-[24px] h-[24px]" />
            </div>

            {/* Conditional Rendering for Mobile and Large Screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl :grid-cols-2 gap-4">
              <div className="PendingInfo flex-1 rounded-lg">
                <PendingInfoBox count={"02"} label="Pending Project" />
              </div>
              <div className="PendingInfo flex-1 rounded-lg">
                <PendingInfoBox count={"03"} label="Account Change" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col md:flex-row justify-between mt-8 w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className=" w-full md:w-1/2 inline-block mt-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-2xl md:text-3xl font-[500]`}>User Activity</h1>
          </div>
          {/* Chart for User Activity */}
          <ChatPage chartData={lineChartData} />
        </div>
        <div className=" w-full md:w-1/2">
          <div className="flex justify-between">
            <h1 className={`text-2xl md:text-3xl font-[500]`}>
              Device Statistics
            </h1>
            <FaInfoCircle className="w-[24px] h-[24px]" />
          </div>
          <DeviceStatistics chartData={pieChartData} />
        </div>
      </div>
    </section>
  );
};

export default MainContent;
