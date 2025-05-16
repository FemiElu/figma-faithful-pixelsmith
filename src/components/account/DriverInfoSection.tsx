
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export const DriverInfoSection = () => {
  const { userData } = useContext(AuthContext);
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Driver Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <InfoItem label="Full Name" value={userData?.fullName || ""} />
          <InfoItem label="Registration Number" value={userData?.registrationNumber || ""} />
          <InfoItem label="Phone Number" value={userData?.phoneNumber || ""} />
          <InfoItem label="NIN" value={userData?.nin || ""} />
          <InfoItem label="Vehicle Model" value={userData?.vehicleModel || ""} />
          <InfoItem label="Driver's License" value={userData?.driverLicense || ""} />
          <InfoItem label="Address" value={userData?.address || ""} />
        </div>
      </CardContent>
    </Card>
  );
};
