import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../redux/action/news";
import { categoriesArr } from "../data/news";

const FilterBar = ({ page }) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    from: "",
    to: "",
    type: "",
    author: "",
  });

  useEffect(() => {
    const convertToISOString = (dateStr, isEndOfDay = false) => {
      if (!dateStr) return "";
      const [year, month, day] = dateStr.split("-");
      const date = new Date(`${year}-${month}-${day}T${isEndOfDay ? "23:59:59.999" : "00:00:00.000"}`);
      return date.toISOString(); // UTC ISO string for NewsAPI
    };

    const payload = {
      ...filters,
      from: convertToISOString(filters.from, false),
      to: convertToISOString(filters.to, true),
      page,
    };

    dispatch(fetchNews(payload));
  }, [filters, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 space-y-4 bg-white dark:bg-gray-900 rounded-lg">
      <input
        type="text"
        name="keyword"
        placeholder="Search by keyword"
        value={filters.keyword}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-white px-3 py-2 w-full rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-white px-3 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categoriesArr.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            From Date
          </label>
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-white px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            To Date
          </label>
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-white px-3 py-2 rounded"
          />
        </div>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-white px-3 py-2 rounded"
        >
          <option value="">Select Type</option>
          <option value="article">Article</option>
          <option value="blog">Blog</option>
        </select>

        <input
          type="text"
          name="author"
          placeholder="Search by author"
          value={filters.author}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-white px-3 py-2 rounded"
        />
      </div>
    </div>
  );
};

export default FilterBar;
