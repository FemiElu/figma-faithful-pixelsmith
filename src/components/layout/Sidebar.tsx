import React from "react";
import { RouteIcon } from "../icons/RouteIcon";
import { MoneyIcon } from "../icons/MoneyIcon";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "../icons/MenuIcon";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useIsMobile();

  const SidebarContent = () => (
    <nav className="flex flex-col gap-6">
      <Link
        to="/"
        className={`flex items-center gap-2 text-2xl font-medium px-10 py-4 ${
          path === "/" 
            ? "bg-white text-[#006400] rounded-[12px_0px_0px_12px]" 
            : "text-white"
        }`}
      >
        <RouteIcon />
        <span>Trips</span>
      </Link>
      <Link
        to="/earnings"
        className={`flex items-center gap-2 text-2xl font-medium px-10 py-4 ${
          path === "/earnings" 
            ? "bg-white text-[#006400] rounded-[12px_0px_0px_12px]" 
            : "text-white"
        }`}
      >
        <MoneyIcon />
        <span>Earnings</span>
      </Link>
    </nav>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="absolute top-3 left-4 z-20 text-black">
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent className="p-0">
          <div className="w-full bg-gradient-to-b from-[#000000] to-[#006400] py-[52px] min-h-[50vh]">
            <div className="text-white text-4xl font-medium mb-[35px] text-center">
              Movaa
            </div>
            <SidebarContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className="w-[304px] min-h-screen bg-gradient-to-b from-[#000000] to-[#006400] py-[52px]">
      <div className="text-white text-4xl font-medium mb-[35px] text-center">
        Movaa
      </div>
      <SidebarContent />
    </aside>
  );
};
