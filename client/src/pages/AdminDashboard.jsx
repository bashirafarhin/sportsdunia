import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/action/news";
import ChartLine from "../components/ChartLine";
import ChartBar from "../components/ChartBar";
import PayoutTable from "../components/PayoutTable";
import { exportToCSV, exportToPDF } from "../utils/utils";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.news);

  const [chartType, setChartType] = useState("line");
  const [payoutRate, setPayoutRate] = useState(
    () => Number(localStorage.getItem("payoutRate")) || 10
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("payoutRate", payoutRate);
  }, [payoutRate]);

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Error loading news.</div>;
  if (!data?.articles?.length)
    return <div className="p-4">No articles found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">News Summary</h1>

      {/* Payout Rate Input */}
      <div className="mb-4 space-y-2">
        <div>
          <label className="font-medium mr-2">Payout per Article:</label>
          <input
            type="number"
            value={payoutRate}
            onChange={(e) => setPayoutRate(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Dropdown to select chart */}
        <div>
          <label className="font-medium mr-2">Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      {chartType === "line" ? (
        <ChartLine articles={data.articles} />
      ) : (
        <ChartBar articles={data.articles} />
      )}

      {/* Payout Table */}
      <PayoutTable articles={data.articles} payoutRate={payoutRate} />

      {/* Export Buttons */}
      <div className="mt-6 space-x-4">
        <button
          onClick={() => exportToCSV(data.articles, payoutRate)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export to CSV
        </button>
        <button
          onClick={() => exportToPDF(data.articles, payoutRate)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default Home;
