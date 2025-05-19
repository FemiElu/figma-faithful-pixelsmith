
import React, { useState } from "react";
import { TripStatCard } from "@/components/trips/TripStatCard";
import { TripFilter } from "@/components/trips/TripFilter";
import { TripDetailCard } from "@/components/trips/TripDetailCard";
import { FilmstripIcon } from "@/components/icons/FilmstripIcon";
import { TurnIcon } from "@/components/icons/TurnIcon";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { format, isToday, isFuture, isPast } from "date-fns";

// Sample trip data - you can replace this with API calls later
const sampleTripData = {
  liveTrips: [
    {
      date: new Date().toISOString(), // Today
      trips: [
        {
          turnNumber: "First Turn",
          time: "08:45 Am",
          passengerCount: 30,
          adultCount: 25,
          childrenCount: 5,
          packageCount: 6,
          grossAmount: "#500,000",
          netAmount: "#400,000"
        },
        {
          turnNumber: "Second Turn",
          time: "08:00 Pm",
          passengerCount: 30,
          adultCount: 25,
          childrenCount: 5,
          packageCount: 6,
          grossAmount: "#500,000",
          netAmount: "#400,000"
        }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Tomorrow
      trips: [
        {
          turnNumber: "First Turn",
          time: "09:30 Am",
          passengerCount: 25,
          adultCount: 20,
          childrenCount: 5,
          packageCount: 4,
          grossAmount: "#450,000",
          netAmount: "#360,000"
        }
      ]
    }
  ],
  pastTrips: [
    {
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
      trips: [
        {
          turnNumber: "First Turn",
          time: "08:00 Am",
          passengerCount: 28,
          adultCount: 22,
          childrenCount: 6,
          packageCount: 5,
          grossAmount: "#480,000",
          netAmount: "#384,000"
        },
        {
          turnNumber: "Second Turn",
          time: "07:30 Pm",
          passengerCount: 26,
          adultCount: 20,
          childrenCount: 6,
          packageCount: 8,
          grossAmount: "#520,000",
          netAmount: "#416,000"
        }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), // Day before yesterday
      trips: [
        {
          turnNumber: "First Turn",
          time: "08:15 Am",
          passengerCount: 32,
          adultCount: 28,
          childrenCount: 4,
          packageCount: 7,
          grossAmount: "#550,000",
          netAmount: "#440,000"
        }
      ]
    }
  ]
};

const Index: React.FC = () => {
  const [filter, setFilter] = useState({ 
    type: "live", 
    date: new Date().toISOString() 
  });
  const isMobile = useIsMobile();
  const { userData } = useContext(AuthContext);

  const handleFilterChange = (newFilter: { type: string; date: string }) => {
    setFilter(newFilter);
  };

  // Get trips based on filter
  const getTripsForDate = () => {
    const tripCollection = filter.type === "live" ? sampleTripData.liveTrips : sampleTripData.pastTrips;
    const selectedDate = new Date(filter.date);
    
    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
    
    const tripsForDate = tripCollection.find(trip => {
      const tripDate = new Date(trip.date);
      return format(tripDate, 'yyyy-MM-dd') === formattedSelectedDate;
    });
    
    return tripsForDate?.trips || [];
  };

  const trips = getTripsForDate();

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
        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <TripDetailCard
              key={`${trip.turnNumber}-${index}`}
              turnNumber={trip.turnNumber}
              time={trip.time}
              passengerCount={trip.passengerCount}
              adultCount={trip.adultCount}
              childrenCount={trip.childrenCount}
              packageCount={trip.packageCount}
              grossAmount={trip.grossAmount}
              netAmount={trip.netAmount}
            />
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-xl text-gray-600">
              {filter.type === "live" 
                ? "No trips scheduled for this date" 
                : "No past trips for this date"}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
