import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-[6.875rem] font-normal mb-8">404 Not Found</h1>
      <p className="text-gray-600 text-lg mb-12">
        Your visited page not found. You may go home page.
      </p>
      <Link
        href="/"
        className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-md text-sm font-medium"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFound;