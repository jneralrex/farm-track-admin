import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const processData = (data) => {
  const counts = {};
  data.forEach((item) => {
    const year = new Date(item.createdAt).getFullYear();
    counts[year] = (counts[year] || 0) + 1;
  });

  const sortedYears = Object.keys(counts).sort();
  return {
    labels: sortedYears,
    datasets: [
      {
        label: "Total Farmers",
        data: sortedYears.map((year) => counts[year]),
        backgroundColor: "#4F46E5",
      },
    ],
  };
};

const BarChart = ({ farmersData }) => {
  if (!farmersData || farmersData.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  const chartData = processData(farmersData);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Total Farmers Per Year
      </h2>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default BarChart;
