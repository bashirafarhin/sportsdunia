import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const ChartBar = ({ articles }) => {
  const authorData = articles.reduce((acc, article) => {
    const author = article.author || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(authorData);
  const dataCounts = Object.values(authorData);

  const data = {
    labels,
    datasets: [
  {
    label: "Articles per Author",
    data: dataCounts,
    backgroundColor: "#3B82F6",
    borderRadius: 6,
    categoryPercentage: 0.8, // default is 0.8 (category spacing)
    barPercentage: 0.6,      // reduce this for more space between bars
  },
],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw} article(s)`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6B7280",
        },
        grid: {
          color: "#F3F4F6",
        },
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: labels.length * 70 }} className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartBar;
