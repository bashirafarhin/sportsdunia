import React, { useState } from "react";
import { useSelector } from "react-redux";
import FilterBar from "../components/FilterBar";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

const Home = () => {
  const { loading, error, data } = useSelector((state) => state.news);
  const [page, setPage] = useState(1);
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Filter bar always visible */}
      <FilterBar page={page} />

      {/* Total Results (only when data is available) */}
      {!loading && !error && data?.totalResults !== undefined && (
        <div className="pt-4 pb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Results: {data.totalResults}
          </h2>
        </div>
      )}

      {/* Conditional Content */}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="p-4 text-red-500 dark:text-red-400">
          Error fetching news.
        </div>
      ) : data?.articles?.length > 0 ? (
        <div className="space-y-4">
          {data.articles.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-accent-color dark:focus:ring-gray-600 ${
                page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            {data?.articles?.length > 10 && (
              <button
                onClick={handleNextPage}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-accent-color dark:focus:ring-gray-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 text-gray-500 dark:text-gray-400">
          No news exists currently.
        </div>
      )}
    </div>
  );
};

export default Home;
