import React from "react";

const PayoutTable = ({ articles, payoutRate }) => {
  const authorData = {};
  articles.forEach((article) => {
    const author = article.author || "Unknown";
    authorData[author] = (authorData[author] || 0) + 1;
  });

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          <tr>
            <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600 text-left">Author</th>
            <th className="px-4 py-2 border-r border-gray-300 dark:border-gray-600 text-left">Articles</th>
            <th className="px-4 py-2 text-left">Payout</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(authorData).map(([author, count]) => (
            <tr key={author} className="border-t border-gray-300 dark:border-gray-700">
              <td className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">{author}</td>
              <td className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">{count}</td>
              <td className="px-4 py-2">₹{(count * payoutRate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutTable;
