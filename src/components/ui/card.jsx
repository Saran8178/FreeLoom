import React from "react";

// Card component
export function Card({ children, className }) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

// CardContent component
export function CardContent({ children }) {
  return <div className="text-gray-700">{children}</div>;
}
