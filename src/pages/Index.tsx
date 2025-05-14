import React from "react";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

const Index: React.FC = () => {
  const handleLoginSubmit = (data: { username: string; password: string }) => {
    console.log("Form submitted:", data);
    // Here you would typically handle authentication
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-1">
        <section className="flex flex-col items-center max-w-[591px] gap-[37px] mx-auto px-6 py-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-black text-[32px] font-semibold leading-[64px] max-sm:text-[28px] max-sm:leading-[48px]">
              Complete Your Sign Up Process
            </h1>
            <p className="text-[#4B4B4B] text-2xl leading-[38.16px] max-sm:text-xl">
              Login to complete your registration and experience other opportunity
            </p>
          </div>
          
          <LoginForm onSubmit={handleLoginSubmit} />
        </section>
      </main>
    </div>
  );
};

export default Index;
