import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Please wait while we load the content...
      </p>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto"></div>
    </div>
  );
};

export default Loader;
