import React from "react";
import Link from "next/link";

interface UnauthorizedProps {
  message?: string;
  onLogin?: () => void;
}

const UnauthorizedComponent: React.FC<UnauthorizedProps> = ({
  message = "You need to be logged in to access this page.",
  onLogin,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Unauthorized Access
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-center space-x-4">
          {onLogin ? (
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </Link>
          )}

          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedComponent;
