import React, { useState } from "react";

const NewsCard = ({ article }) => {
  const {
    title,
    author,
    publishedAt,
    url,
    urlToImage,
    description,
    source,
  } = article;

  const [loaded, setLoaded] = useState(false);
  const type = source?.name?.toLowerCase().includes("blog") ? "Blog" : "Article";

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="block border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-white dark:bg-gray-900">
      {/* Image with blur-up effect */}
      {urlToImage && (
        <div className="relative w-full h-52 overflow-hidden rounded-md mb-4">
          <img
            src={urlToImage}
            alt={title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
            width="600"
            height="200"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {description}
        </p>
      )}

      {/* Metadata */}
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
        <p>
          <span className="font-medium dark:text-white">Author:</span>{" "}
          {author || source?.name || "Unknown"}
        </p>
        <p>
          <span className="font-medium dark:text-white">Published:</span>{" "}
          {formattedDate}
        </p>
        <p>
          <span className="font-medium dark:text-white">Type:</span> {type}
        </p>
      </div>

      {/* Read More Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
