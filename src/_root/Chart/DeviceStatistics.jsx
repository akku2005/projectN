import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies here
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";
import Icons from "../constants/Icons";
import { ThemeContext } from "../../components/context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const DeviceStatistics = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [productData, setProductData] = useState({ 1: 0, 2: 0 }); // Default values

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("userToken"); // Get token from cookies
        const response = await axios.get(
          "http://13.233.36.198:5000/api/cloudnet/portal/dashboard/info",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const productStats =
          response.data.dashboardData.deviceStatistics.product;
        setProductData(productStats);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Gateway", "AP"],
    datasets: [
      {
        data: [productData[1], productData[2]],
        backgroundColor: isDarkMode
          ? ["#8BC34A", "#2196F3"]
          : ["#4CAF50", "#2196F3"],
        borderColor: isDarkMode
          ? ["#8BC34A", "#2196F3"]
          : ["#4CAF50", "#2196F3"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="DeviceStatistics bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 border border-gray-100 border-opacity-50 w-full h-auto sm:h-[380px] lg:h-[390px] sm:w-auto mt-4">
      <div className="flex justify-between items-center mb-0">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              className="w-[48px] h-[48px]"
              src={Icons.Maskgroup}
              alt="Project Icon"
            />
          </div>
        </div>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } text-sm sm:text-base`}
        >
          8th September 2024
        </p>
      </div>

      <div className="mt-5">
        <h2
          className={`${
            isDarkMode ? "text-white" : "text-black"
          } text-xl sm:text-2xl font-semibold`}
        >
          My Project
        </h2>
        <p className="text-green-400 text-sm sm:text-base">Mall Area</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-16">
        <div className="flex gap-9">
          <div className="text-center mb-4 sm:mb-0">
            <p
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } text-3xl sm:text-4xl font-semibold`}
            >
              {productData[1] || 0}
            </p>
            <p className="text-green-400 text-base sm:text-lg">Gateway</p>
          </div>

          <div className="h-2 sm:h-16 w-full sm:w-2 bg-green-500 border border-green-500 mx-2 my-4 sm:my-0"></div>

          <div className="text-center mb-4 sm:mb-0">
            <p
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } text-3xl sm:text-4xl font-semibold`}
            >
              {productData[2] || 0}
            </p>
            <p className="text-green-400 text-base sm:text-lg">AP</p>
          </div>
        </div>

        <div className="w-28 h-28 sm:w-36 sm:h-36">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DeviceStatistics;
