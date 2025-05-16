
import React, { useState } from "react";
import { CalendarIcon } from "../icons/CalendarIcon";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface TripFilterProps {
  onFilterChange?: (filter: { type: string; date: string }) => void;
}

export const TripFilter: React.FC<TripFilterProps> = ({ onFilterChange }) => {
  const [activeTab, setActiveTab] = useState<"live" | "past">("live");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const isMobile = useIsMobile();

  const handleTabChange = (tab: "live" | "past") => {
    setActiveTab(tab);
    onFilterChange?.({ 
      type: tab, 
      date: date ? format(date, "MM/dd/yyyy") : "" 
    });
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onFilterChange?.({ 
        type: activeTab, 
        date: format(newDate, "MM/dd/yyyy") 
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="inline-flex items-center border bg-white p-2 rounded-lg border-[#C7C7C7] w-full">
        <button
          onClick={() => handleTabChange("live")}
          className={`text-base font-medium px-4 py-3 rounded-lg flex-1 ${
            activeTab === "live"
              ? "bg-[#006400] text-white"
              : "bg-white text-[#8A8A8A]"
          }`}
        >
          {isMobile ? "Available Trip" : "Live Trip"}
        </button>
        <button
          onClick={() => handleTabChange("past")}
          className={`text-base font-medium px-4 py-3 rounded-lg flex-1 ${
            activeTab === "past"
              ? "bg-[#006400] text-white"
              : "bg-white text-[#8A8A8A]"
          }`}
        >
          Past Trip
        </button>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex w-full h-[58px] items-center justify-between border bg-white px-4 py-2 rounded-lg border-[#D9D9D9]">
            <span className="text-[#6B7280] text-base">
              {date ? format(date, "MM/dd/yyyy") : "Select date"}
            </span>
            <CalendarIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
