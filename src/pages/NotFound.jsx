import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#16171A] text-white">
            <h1 className="text-[72px] font-bold mb-4">404</h1>
            <p className="text-[24px] mb-8">Page Not Found</p>
            <button
                className="px-4 py-2 bg-blue-500 rounded-md text-white"
                onClick={() => navigate("/")}
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default NotFound;
