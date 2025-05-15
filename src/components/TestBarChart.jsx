import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TestBarChart = ({ testData }) => {
    const statusCounts = testData.reduce((acc, test) => {
        const state = test?.status || "Unknown"; 
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {});

  const chartData = {
    labels: Object.keys(statusCounts), 
    datasets: [
      {
        label: "Number of Tests",
        data: Object.values(statusCounts), 
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
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
        text: "Test by Status",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default TestBarChart;
