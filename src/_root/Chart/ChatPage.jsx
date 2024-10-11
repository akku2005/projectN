// UserActivity.js
import React, { useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import "../styles/Dashboard.scss";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ThemeContext } from "../../components/context/ThemeContext";

// Register necessary components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const UserActivity = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  // State to track visibility of each dataset
  const [visibleDatasets, setVisibleDatasets] = useState({
    "2024-09-09": true,
    "2024-09-03": true,
    "2024-10-01": true,
  });

  // Function to toggle visibility of the datasets
  const toggleDatasetVisibility = (label) => {
    setVisibleDatasets((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  // Data for the line chart with multiple datasets
  const chartData = {
    labels: ["0", "0.2", "0.4", "0.6", "0.8", "1"],
    datasets: [
      {
        label: "2024-09-09",
        data: [0.1, 0.3, 0.5, 0.7, 0.9, 1],
        borderColor: "rgba(168, 85, 247, 0.8)",
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        borderWidth: 2, // Line thickness
        pointRadius: 3, // Size of data points
        pointBackgroundColor: "rgba(168, 85, 247, 1)", // Point color
        fill: true, // Fill the area under the line
        hidden: !visibleDatasets["2024-09-09"], // Control dataset visibility
      },
      {
        label: "2024-09-03",
        data: [0.2, 0.4, 0.6, 0.8, 1, 1.2], // Data points for the second date
        borderColor: "rgba(252, 211, 77, 0.8)", // Yellow color for the line
        backgroundColor: "rgba(252, 211, 77, 0.3)", // Lighter fill
        borderWidth: 2, // Line thickness
        pointRadius: 3, // Size of data points
        pointBackgroundColor: "rgba(252, 211, 77, 1)", // Point color
        fill: true, // Fill the area under the line
        hidden: !visibleDatasets["2024-09-03"], // Control dataset visibility
      },
      {
        label: "2024-10-01",
        data: [0.3, 0.5, 0.7, 0.9, 1.1, 1.3], // Data points for the third date
        borderColor: "rgba(34, 197, 94, 0.8)", // Green color for the line
        backgroundColor: "rgba(34, 197, 94, 0.3)", // Lighter fill
        borderWidth: 2, // Line thickness
        pointRadius: 3, // Size of data points
        pointBackgroundColor: "rgba(34, 197, 94, 1)", // Point color
        fill: true, // Fill the area under the line
        hidden: !visibleDatasets["2024-10-01"], // Control dataset visibility
      },
    ],
  };

  // Chart options for better visualization
  const chartOptions = {
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false, // Allows better scaling
    scales: {
      x: {
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", // Light color for dark mode, dark color for light mode
        },
        ticks: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)", // Light for dark mode, dark for light mode
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", // Same logic for Y-axis grid
        },
        ticks: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)", // Light for dark mode, dark for light mode
          beginAtZero: true, // Ensures Y-axis starts from 0
        },
      },
    },

    plugins: {
      legend: {
        display: true, // Shows the default legend
        labels: {
          color: isDarkMode ? "white" : "black", // Choose 'white' for dark mode and 'black' for light mode
        },
      },
      tooltip: {
        enabled: true, // Enables hover tooltips to show data points
      },
    },
  };

  return (
    <div>
      <div className="userActivityChart bg-white bg-opacity-10 rounded-lg p-4 md:p-6 border border-gray-100 border-opacity-30">
        {/* Custom legend for the chart */}
        <div className=" flex items-center mb-4 justify-between">
          <div className=" flex flex-wrap flex-col md:flex-row items-start">
            {/* Date Entry 1 */}
            <div
              className="flex items-center mr-4 cursor-pointer mb-2 md:mb-0"
              onClick={() => toggleDatasetVisibility("2024-09-09")}
            >
              <div className="w-[40px] h-[17px] bg-purple-300 mr-2 rounded-[5px]"></div>
              <span className="chartText text-white">2024-09-09</span>
            </div>

            {/* Date Entry 2 */}
            <div
              className="flex items-center mr-4 cursor-pointer mb-2 md:mb-0"
              onClick={() => toggleDatasetVisibility("2024-09-03")}
            >
              <div className="w-[40px] h-[17px] bg-yellow-300 mr-2 rounded-[5px]"></div>
              <span className="chartText text-white">2024-09-03</span>
            </div>

            {/* Date Entry 3 */}
            <div
              className="flex items-center mb-2 md:mb-0"
              onClick={() => toggleDatasetVisibility("2024-10-01")}
            >
              <div className="w-[40px] h-[17px] bg-green-300 mr-2 rounded-[5px]"></div>
              <span className="chartText text-white">2024-10-01</span>
            </div>
          </div>

          {/* Button aligned to the right */}
          <div className="mt-4 md:mt-0">
            <button className="disposeButton bg-[#56EE6830] text-[#56EE68] font-medium rounded-full border border-[#56EE68] opacity-100 w-[140px] md:w-[143px] h-[37px] flex justify-center items-center text-sm md:text-base">
              Nearly 3 Days
            </button>
          </div>
        </div>

        {/* Chart container with dynamic height */}
        <div className="h-64 md:h-72">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
