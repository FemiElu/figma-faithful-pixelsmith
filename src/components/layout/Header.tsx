
import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { ChevronDown, LogOut, User } from "lucide-react";

export const Header: React.FC = () => {
  const { userData, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const handleAccountClick = () => {
    navigate("/account");
    setIsDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between h-[80px] px-4 md:px-8 bg-white shadow-sm">
      <div className="text-3xl font-bold text-[#006400]">Movaa</div>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2"
          aria-label="User menu"
          aria-expanded={isDropdownOpen}
          aria-controls="user-dropdown"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {userData?.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {userData?.fullName ? userData.fullName.charAt(0) : "U"}
              </div>
            )}
          </div>
          <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div 
            id="user-dropdown"
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          >
            <div className="py-1">
              <button
                onClick={handleAccountClick}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <User size={16} />
                Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
