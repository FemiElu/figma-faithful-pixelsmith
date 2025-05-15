
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

const Earnings: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-semibold text-center mt-20">
            Earnings Page Coming Soon
          </h1>
          <p className="text-center text-gray-500 mt-4">
            This section is under development and will be available soon.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Earnings;
