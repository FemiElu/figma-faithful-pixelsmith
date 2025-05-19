
// import React from "react";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { Header } from "@/components/layout/Header";
// import { useIsMobile } from "@/hooks/use-mobile";

// interface MainLayoutProps {
//   children: React.ReactNode;
// }

// export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//   const isMobile = useIsMobile();

//   return (
//     <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
//       {isMobile ? (
//         <>
//           <Header />
//           <main className="flex-1 px-4 py-6 overflow-y-auto">
//             {children}
//           </main>
//         </>
//       ) : (
//         <div className="flex min-h-screen">
//           <Sidebar />
//           <div className="flex-1 flex flex-col">
//             <Header />
//             <main className="flex-1 px-8 py-6 overflow-y-auto">
//               {children}
//             </main>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Always show header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar: only visible on medium and larger screens */}
        <aside className="hidden md:block w-64">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
