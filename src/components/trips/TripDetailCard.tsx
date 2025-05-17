
import React, { useState } from "react";
import { AdultIcon } from "../icons/AdultIcon";
import { ChildrenIcon } from "../icons/ChildrenIcon";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

// Sample data for demo purposes
const passengerData = [
  { id: 1, name: "John Doe", phone: "08012345678", destination: "Ikeja", amount: 5000 },
  { id: 2, name: "Jane Smith", phone: "08087654321", destination: "Lekki", amount: 8000 },
  { id: 3, name: "Alice Johnson", phone: "07023456789", destination: "Ajah", amount: 10000 },
  { id: 4, name: "Bob Williams", phone: "09034567890", destination: "Victoria Island", amount: 7500 },
  { id: 5, name: "Child One", phone: "-", destination: "Ikeja", amount: 0 },
];

const packageData = [
  { id: 1, item: "Shoes", destination: "Ikeja", amount: 2000 },
  { id: 2, item: "Clothing", destination: "Lekki", amount: 3000 },
  { id: 3, item: "Electronics", destination: "Ajah", amount: 5000 },
];

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
  const [passengersDialogOpen, setPassengersDialogOpen] = useState(false);
  const [packagesDialogOpen, setPackagesDialogOpen] = useState(false);
  const [amountDialogOpen, setAmountDialogOpen] = useState(false);

  // Calculate total package amount
  const totalPackageAmount = packageData.reduce((sum, pkg) => sum + pkg.amount, 0);
  
  // Calculate total passengers amount
  const totalPassengerAmount = passengerData.reduce((sum, passenger) => sum + passenger.amount, 0);
  
  // Calculate loading fee (10% of gross)
  const loadingFee = (parseInt(grossAmount.replace(/[^\d]/g, '')) * 0.1);
  
  // Parse numeric values from formatted strings
  const grossAmountValue = parseInt(grossAmount.replace(/[^\d]/g, ''));
  const netAmountValue = parseInt(netAmount.replace(/[^\d]/g, ''));

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
            {/* Passenger section - clickable */}
            <div 
              className="flex flex-col md:flex-row md:items-start gap-2 md:gap-[55px] cursor-pointer hover:bg-gray-50 p-2 rounded-md"
              onClick={() => setPassengersDialogOpen(true)}
            >
              <div className="text-[#333] text-base md:text-2xl flex items-center gap-2">
                Passenger: 
                <ChevronRight size={20} className="text-gray-500" />
              </div>
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
            
            {/* Package section - clickable */}
            <div 
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
              onClick={() => setPackagesDialogOpen(true)}
            >
              <div className="text-[#333] text-base md:text-2xl flex items-center gap-2">
                Package:
                <ChevronRight size={20} className="text-gray-500" />
              </div>
              <div className="text-black text-base md:text-2xl font-medium">
                {packageCount} Items
              </div>
            </div>
            
            {/* Amount section - clickable */}
            <div 
              className="cursor-pointer hover:bg-gray-50 p-2 rounded-md"
              onClick={() => setAmountDialogOpen(true)}
            >
              <div className="text-[#333] text-base md:text-2xl mb-2 flex items-center gap-2">
                Amount:
                <ChevronRight size={20} className="text-gray-500" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between md:justify-start md:gap-[25px]">
                  <div className="text-[#333] text-base md:text-xl">Gross Amount:</div>
                  <div className="text-black text-base md:text-xl font-medium">
                    {grossAmount}
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-start md:gap-[54px]">
                  <div className="text-[#333] text-base md:text-xl">Net Amount:</div>
                  <div className="text-black text-base md:text-xl font-medium">{netAmount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-[#939393] mt-6 md:mt-[57px]" />

      {/* Passengers Dialog */}
      <Dialog open={passengersDialogOpen} onOpenChange={setPassengersDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Passenger List</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passengerData.map((passenger) => (
                <TableRow key={passenger.id}>
                  <TableCell>{passenger.name}</TableCell>
                  <TableCell>{passenger.phone}</TableCell>
                  <TableCell>{passenger.destination}</TableCell>
                  <TableCell>₦{passenger.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-right font-semibold">
            Total: ₦{totalPassengerAmount.toLocaleString()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Packages Dialog */}
      <Dialog open={packagesDialogOpen} onOpenChange={setPackagesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Package List</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packageData.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.item}</TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>₦{pkg.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-right font-semibold">
            Total: ₦{totalPackageAmount.toLocaleString()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Amount Dialog */}
      <Dialog open={amountDialogOpen} onOpenChange={setAmountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Amount Breakdown</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Passenger Fares:</span>
              <span>₦{totalPassengerAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Package Delivery:</span>
              <span>₦{totalPackageAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Gross Amount:</span>
              <span>₦{grossAmountValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Loading Fee (10%):</span>
              <span>₦{loadingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 font-bold">
              <span>Net Amount:</span>
              <span>₦{netAmountValue.toLocaleString()}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
