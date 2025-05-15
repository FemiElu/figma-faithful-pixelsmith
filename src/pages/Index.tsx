
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TripStatCard } from "@/components/trips/TripStatCard";
import { TripFilter } from "@/components/trips/TripFilter";
import { TripDetailCard } from "@/components/trips/TripDetailCard";
import { FilmstripIcon } from "@/components/icons/FilmstripIcon";
import { TurnIcon } from "@/components/icons/TurnIcon";
import { useIsMobile } from "@/hooks/use-mobile";

const Index: React.FC = () => {
  const [filter, setFilter] = useState({ type: "live", date: new Date().toLocaleDateString('en-US') });
  const isMobile = useIsMobile();

  const handleFilterChange = (newFilter: { type: string; date: string }) => {
    setFilter(newFilter);
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9]">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:pl-[42px] md:pr-[27px] md:pt-[83px] md:pb-0">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[11px] mb-10">
            <TripStatCard
              title="Total No Of Trip"
              value="200"
              icon={<FilmstripIcon />}
            />
            <TripStatCard
              title="Turn Position"
              value="1st"
              icon={<TurnIcon />}
            />
          </section>

          <section>
            <TripFilter onFilterChange={handleFilterChange} />
          </section>

          <section className="flex flex-col gap-6 mb-6">
            <TripDetailCard
              turnNumber="First Turn"
              time="08:45 Am"
              passengerCount={30}
              adultCount={25}
              childrenCount={5}
              packageCount={6}
              grossAmount="#500,000"
              netAmount="#400,000"
            />
            
            <TripDetailCard
              turnNumber="Second Turn"
              time="08:00 Pm"
              passengerCount={30}
              adultCount={25}
              childrenCount={5}
              packageCount={6}
              grossAmount="#500,000"
              netAmount="#400,000"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
