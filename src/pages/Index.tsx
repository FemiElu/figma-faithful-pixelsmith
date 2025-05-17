
import React, { useState } from "react";
import { TripStatCard } from "@/components/trips/TripStatCard";
import { TripFilter } from "@/components/trips/TripFilter";
import { TripDetailCard } from "@/components/trips/TripDetailCard";
import { FilmstripIcon } from "@/components/icons/FilmstripIcon";
import { TurnIcon } from "@/components/icons/TurnIcon";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Index: React.FC = () => {
  const [filter, setFilter] = useState({ type: "live", date: new Date().toLocaleDateString('en-US') });
  const isMobile = useIsMobile();
  const { userData } = useContext(AuthContext);

  const handleFilterChange = (newFilter: { type: string; date: string }) => {
    setFilter(newFilter);
  };

  return (
    <div className="w-full pt-12 md:pt-0">
      
      
      <section className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mb-10`}>
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
    </div>
  );
};

export default Index;
