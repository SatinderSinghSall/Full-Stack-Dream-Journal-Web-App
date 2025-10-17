import React from "react";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md ${className}`}
    />
  );
};

export default Skeleton;
