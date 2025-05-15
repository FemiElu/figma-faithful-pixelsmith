
import React, { ReactNode } from "react";

interface TripStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export const TripStatCard: React.FC<TripStatCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4 md:gap-[25px] bg-white px-6 py-4 md:px-8 rounded-xl">
      <div className="flex justify-between items-start">
        <div className="text-black text-lg md:text-xl font-medium">{title}</div>
        <div className="flex w-[34px] h-[34px] justify-center items-center bg-[#F5D6F2] rounded-[17px]">
          {icon}
        </div>
      </div>
      <div className="text-black text-2xl md:text-[32px] font-medium">{value}</div>
    </div>
  );
};
