// ResourceStatistics.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaWifi } from "react-icons/fa"; // Import WiFi icon from react-icons

const ResourceStatistics = () => {
  const [deviceStats, setDeviceStats] = useState({
    totalDevices: 0,
    onlineTotal: 0,
    alarmTotal: 0,
    offlineTotal: 0,
    inspectionReport: 0,
  });

  const [error, setError] = useState(null);
  const [selectedStat, setSelectedStat] = useState(0); // Track selected statistic

  useEffect(() => {
    const fetchDeviceStatistics = async () => {
      try {
        const token = Cookies.get("userToken");
        if (!token) {
          throw new Error("User token cookie not found");
        }

        const response = await axios.get(
          "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const deviceStatistics = response.data.dashboardData.deviceStatistics;

        if (!deviceStatistics) {
          throw new Error("No device statistics found in the response");
        }

        setDeviceStats({
          totalDevices: deviceStatistics.all || 0,
          onlineTotal: deviceStatistics.online || 0,
          alarmTotal: deviceStatistics.alarm || 0,
          offlineTotal: deviceStatistics.offline || 0,
          inspectionReport: Object.values(
            deviceStatistics.product || {}
          ).reduce((a, b) => a + b, 0),
        });
      } catch (err) {
        setError("Failed to fetch device statistics");
        console.error(err);
      }
    };

    fetchDeviceStatistics();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  // Statistics data for display
  const statistics = [
    { count: deviceStats.totalDevices, label: "Total Devices" },
    { count: deviceStats.onlineTotal, label: "Online Total" },
    { count: deviceStats.alarmTotal, label: "Alarm Total" },
    { count: deviceStats.offlineTotal, label: "Offline Total" },
    { count: deviceStats.inspectionReport, label: "Inspection Report" },
  ];

  // Function to handle dot click and update selectedStat
  const handleDotClick = (index) => {
    setSelectedStat(index);
  };

  return (
    <div className="  flex flex-col w-full md:hidden">
      <h2 className="text-lg md:text-xl mb-4 flex items-center gap-2">
        Resource Statistics <FaWifi className="text-green-500" />
      </h2>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg flex flex-col justify-between w-full h-[200px] gap-4 border border-gray-100 border-opacity-30 flex-1">
        {/* Current Statistic Display */}
        <div className="flex flex-row gap-24 items-center mb-4 w-full justify-center">
          <div className="flex flex-row items-center gap-2">
            <span className="text-4xl font-bold">
              {statistics[selectedStat].count}
            </span>
            <span className="text-sm">{statistics[selectedStat].label}</span>
          </div>
          {selectedStat + 1 < statistics.length && (
            <div className="flex flex-row items-center gap-2 mt-2">
              <span className="text-4xl font-bold">
                {statistics[selectedStat + 1].count}
              </span>
              <span className="text-sm">
                {statistics[selectedStat + 1].label}
              </span>
            </div>
          )}
        </div>

        {/* Dots section */}
        <div className="flex justify-center mt-4">
          {statistics.map((_, index) => (
            <span
              key={index}
              className={`rounded-full w-3 h-3 mx-1 cursor-pointer ${
                selectedStat === index
                  ? "bg-green-400"
                  : "border-[2px] border-green-500"
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceStatistics;
