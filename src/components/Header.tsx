
import React, { useState } from "react";
import ButtonCustom from "./ui/button-custom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex w-full h-[106px] items-center justify-between bg-white shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] px-32 py-4 max-md:px-16 max-sm:px-4">
      <div className="text-5xl font-medium text-[#006400] max-md:text-[40px] max-sm:text-[32px]">
        Movaa
      </div>
      
      <nav className="flex items-center gap-[98px] max-md:hidden">
        <a href="/" className="text-[#006400] text-2xl hover:underline">Home</a>
        <a href="/about" className="text-black text-2xl hover:underline">About</a>
        <a href="/contact" className="text-black text-2xl hover:underline">Contact</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <ButtonCustom variant="secondary" className="h-[68px]">
          Log In
        </ButtonCustom>
        <ButtonCustom variant="primary" className="h-[68px]">
          Sign Up
        </ButtonCustom>
        
        <button 
          className="hidden max-lg:block"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[24px] h-[24px]"
          >
            <path 
              d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" 
              stroke="#3D3D3D" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
            <path 
              d="M17.8198 5.77047C16.0698 4.45047 14.0698 3.73047 11.9998 3.73047C8.46984 3.73047 5.17984 5.81047 2.88984 9.41047C1.98984 10.8205 1.98984 13.1905 2.88984 14.6005C3.67984 15.8405 4.59984 16.9105 5.59984 17.7705" 
              stroke="#3D3D3D" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
            <path 
              d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969" 
              stroke="#3D3D3D" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
            <path 
              d="M15.5095 12.7002C15.2495 14.1102 14.0995 15.2602 12.6895 15.5202" 
              stroke="#3D3D3D" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
            <path 
              d="M9.47 14.5303L2 22.0003" 
              stroke="#3D3D3D" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
            <path 
              d="M21.9993 2L14.5293 9.47" 
              stroke="#3D3D3D" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
