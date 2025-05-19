
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar/context";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
        {/* Always show header */}
        <Header />

        <div className="flex flex-1">
          {/* Sidebar: only visible on desktop screens */}
          {!isMobile && (
            <aside className="w-[304px]">
              <Sidebar />
            </aside>
          )}

          {/* Mobile sidebar is handled inside the Sidebar component */}
          {isMobile && <Sidebar />}

          {/* Main content */}
          <main className="flex-1 px-4 py-6 md:px-16 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
