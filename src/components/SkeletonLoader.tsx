
import React from "react";

export const SkeletonLoader: React.FC = () => {
    return (
        <div className="border p-4 rounded-lg animate-pulse">
            <div className="h-24 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
    );
};

