
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Earnings: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full pt-12 md:pt-0">
      <h1 className="text-3xl font-semibold mb-6">Earnings</h1>
      <p className="text-gray-500 mb-4">
        This section is under development and will be available soon.
      </p>
    </div>
  );
};

export default Earnings;
