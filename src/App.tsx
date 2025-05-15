
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Earnings from "./pages/Earnings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Account from "./pages/Account";
import { useState, useEffect, createContext } from "react";

// Simple context for authentication state
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  login: () => void;
  completeFirstLogin: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  isFirstLogin: false,
  login: () => {},
  completeFirstLogin: () => {},
  logout: () => {}
});

const queryClient = new QueryClient();

const App = () => {
  // In a real app, this would check localStorage/sessionStorage or a token
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  
  // Check localStorage on initial load
  useEffect(() => {
    const auth = localStorage.getItem("driver_auth");
    const firstLogin = localStorage.getItem("first_login");
    
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    
    if (firstLogin === "false") {
      setIsFirstLogin(false);
    }
  }, []);
  
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("driver_auth", "true");
  };
  
  const completeFirstLogin = () => {
    setIsFirstLogin(false);
    localStorage.setItem("first_login", "false");
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("driver_auth");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ 
        isAuthenticated, 
        isFirstLogin, 
        login, 
        completeFirstLogin, 
        logout 
      }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={
                isAuthenticated ? 
                  (isFirstLogin ? <Navigate to="/change-password" /> : <Navigate to="/" />) : 
                  <Login />
              } />
              
              {/* Protected routes */}
              <Route path="/change-password" element={
                isAuthenticated ? 
                  <ChangePassword /> : 
                  <Navigate to="/login" />
              } />
              
              <Route path="/" element={
                isAuthenticated ? 
                  (isFirstLogin ? <Navigate to="/change-password" /> : <Index />) : 
                  <Navigate to="/login" />
              } />
              
              <Route path="/earnings" element={
                isAuthenticated ? 
                  (isFirstLogin ? <Navigate to="/change-password" /> : <Earnings />) : 
                  <Navigate to="/login" />
              } />
              
              <Route path="/account" element={
                isAuthenticated ? 
                  (isFirstLogin ? <Navigate to="/change-password" /> : <Account />) : 
                  <Navigate to="/login" />
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
