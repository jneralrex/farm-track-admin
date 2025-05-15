import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LandBarChart = ({ landData }) => {
    const stateCounts = landData.reduce((acc, land) => {
        const state = land?.location?.state || "Unknown"; 
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {});

  const chartData = {
    labels: Object.keys(stateCounts), 
    datasets: [
      {
        label: "Number of Lands",
        data: Object.values(stateCounts), 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Lands by State",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default LandBarChart;
