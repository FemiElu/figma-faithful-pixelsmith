
import React, { useContext, useState } from "react";
import { RouteIcon } from "../icons/RouteIcon";
import { MoneyIcon } from "../icons/MoneyIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "../icons/MenuIcon";
import { AuthContext } from "@/App";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useIsMobile();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // User profile dropdown
  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-10 rounded-full bg-white border-2 border-[#006400] flex items-center justify-center text-[#006400] font-bold">
        JD
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate("/account")} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (isMobile) {
    return (
      <>
        <div className="flex justify-between items-center w-full p-4 bg-white">
          <Drawer>
            <DrawerTrigger className="text-black">
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
          
          <UserDropdown />
        </div>
      </>
    );
  }

  return (
    <>
      <aside className="w-[304px] min-h-screen bg-gradient-to-b from-[#000000] to-[#006400] py-[52px]">
        <div className="text-white text-4xl font-medium mb-[35px] text-center">
          Movaa
        </div>
        <SidebarContent />
      </aside>
      
      <div className="absolute top-6 right-8">
        <UserDropdown />
      </div>
    </>
  );
};
