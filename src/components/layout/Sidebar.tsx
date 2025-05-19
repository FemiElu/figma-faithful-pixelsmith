
import React, { useContext } from "react";
import { RouteIcon } from "../icons/RouteIcon";
import { MoneyIcon } from "../icons/MoneyIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "../icons/MenuIcon";
import { AuthContext } from "@/context/AuthContext";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useIsMobile();
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

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
        <DrawerTrigger className="fixed top-5 left-4 z-50 block md:hidden">
          <MenuIcon className="text-[#006400]" />
        </DrawerTrigger>
        <DrawerContent className="p-0">
          <div className="w-full bg-gradient-to-b from-[#000000] to-[#006400] py-[52px] min-h-[50vh]">
            <div 
              className="text-white text-4xl font-medium mb-[35px] text-center cursor-pointer" 
              onClick={handleLogoClick}
            >
              Movaa
            </div>
            <SidebarContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className="w-[304px] bg-gradient-to-b from-[#000000] to-[#006400] py-[52px] h-screen">
      <div 
        className="text-white text-4xl font-medium mb-[35px] text-center cursor-pointer" 
        onClick={handleLogoClick}
      >
        Movaa
      </div>
      <SidebarContent />
    </aside>
  );
};
