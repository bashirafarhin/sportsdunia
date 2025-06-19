// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// const ChartLine = ({ articles }) => {
//   const counts = {};
//   articles.forEach((article) => {
//     const author = article.author || "Unknown";
//     counts[author] = (counts[author] || 0) + 1;
//   });

//   const data = {
//     labels: Object.keys(counts),
//     datasets: [
//       {
//         label: "Articles per Author",
//         data: Object.values(counts),
//         borderColor: "#3b82f6",
//         fill: false,
//       },
//     ],
//   };

//   return <Line data={data} options={{ responsive: true }} />;
// };

// export default ChartLine;
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ChartLine = ({ articles }) => {
  const counts = {};
  articles.forEach((article) => {
    const author = article.author || "Unknown";
    counts[author] = (counts[author] || 0) + 1;
  });

  const data = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Articles per Author",
        data: Object.values(counts),
        borderColor: "#3b82f6",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartLine;
