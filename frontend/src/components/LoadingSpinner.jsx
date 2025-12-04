const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;