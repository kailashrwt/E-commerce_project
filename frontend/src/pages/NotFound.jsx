import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;