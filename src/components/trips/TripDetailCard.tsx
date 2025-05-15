
import React from "react";
import { AdultIcon } from "../icons/AdultIcon";
import { ChildrenIcon } from "../icons/ChildrenIcon";
import { useIsMobile } from "@/hooks/use-mobile";

interface TripDetailCardProps {
  turnNumber: string;
  time: string;
  passengerCount: number;
  adultCount: number;
  childrenCount: number;
  packageCount: number;
  grossAmount: string;
  netAmount: string;
}

export const TripDetailCard: React.FC<TripDetailCardProps> = ({
  turnNumber,
  time,
  passengerCount,
  adultCount,
  childrenCount,
  packageCount,
  grossAmount,
  netAmount,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white shadow-[0px_2px_30px_0px_rgba(0,0,0,0.10)] px-6 py-6 md:px-[102px] md:py-[57px] rounded-xl">
      <div className="flex flex-col md:flex-row md:gap-[122px]">
        <div className="flex flex-col gap-4 md:gap-6 flex-1 mb-6 md:mb-0">
          <div className="text-black text-xl md:text-3xl font-semibold">Trip Details</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 md:gap-[125px]">
              <div className="text-[#333] text-base md:text-2xl">Turn:</div>
              <div className="text-black text-base md:text-xl font-medium">{turnNumber}</div>
            </div>
            <div className="flex items-start gap-4 md:gap-[37px]">
              <div className="text-[#333] text-base md:text-2xl">Time:</div>
              <div className="text-black text-base md:text-2xl font-medium">{time}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 flex-1">
          <div className="text-black text-xl md:text-3xl font-semibold">
            Passenger Details
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-[55px]">
              <div className="text-[#333] text-base md:text-2xl">Passenger:</div>
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="text-black text-base md:text-2xl font-medium">
                  {passengerCount} Passengers
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <AdultIcon />
                    <div className="text-black text-base md:text-2xl font-medium">Adult:</div>
                    <div className="text-black text-base md:text-2xl font-medium">{adultCount}</div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <ChildrenIcon />
                    <div className="text-black text-base md:text-2xl font-medium">Children:</div>
                    <div className="text-black text-base md:text-2xl font-medium">{childrenCount}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[#333] text-base md:text-2xl">Package:</div>
              <div className="text-black text-base md:text-2xl font-medium">
                {packageCount} Items
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-start md:gap-[25px]">
              <div className="text-[#333] text-base md:text-2xl">Gross Amount:</div>
              <div className="text-black text-base md:text-2xl font-medium">
                {grossAmount}
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-start md:gap-[54px]">
              <div className="text-[#333] text-base md:text-2xl">Net Amount:</div>
              <div className="text-black text-base md:text-2xl font-medium">{netAmount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-[#939393] mt-6 md:mt-[57px]" />
    </div>
  );
};
