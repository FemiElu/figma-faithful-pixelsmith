
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfileSection } from "@/components/account/ProfileSection";
import { DriverInfoSection } from "@/components/account/DriverInfoSection";

const Account: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full pt-12 md:pt-0">
      <h1 className="text-3xl font-bold mb-6">Account Information</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileSection />
        <DriverInfoSection />
      </div>
    </div>
  );
};

export default Account;
