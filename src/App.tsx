
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Index from "./pages/Index";
import Earnings from "./pages/Earnings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CompleteSignup from "./pages/CompleteSignup";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import { MainLayout } from "./components/layout/MainLayout";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isFirstLogin } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isFirstLogin) {
    return <Navigate to="/change-password" />;
  }

  return <>{children}</>;
};

// Route guard for authenticated/unauthenticated access
const RouteGuard = ({ 
  children, 
  accessibleWhenAuthenticated = true 
}: { 
  children: React.ReactNode;
  accessibleWhenAuthenticated?: boolean;
}) => {
  const { isAuthenticated, isFirstLogin } = useContext(AuthContext);

  if (accessibleWhenAuthenticated && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!accessibleWhenAuthenticated && isAuthenticated) {
    return <Navigate to={isFirstLogin ? "/change-password" : "/"} />;
  }

  return <>{children}</>;
};

// Route that requires authentication + first login
const FirstLoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isFirstLogin } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isFirstLogin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Create the query client INSIDE the component
const App = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={
                <RouteGuard accessibleWhenAuthenticated={false}>
                  <Login />
                </RouteGuard>
              } />
              
              <Route path="/complete-signup" element={
                <RouteGuard accessibleWhenAuthenticated={false}>
                  <CompleteSignup />
                </RouteGuard>
              } />
              
              <Route path="/forgot-password" element={
                <RouteGuard accessibleWhenAuthenticated={false}>
                  <ForgotPassword />
                </RouteGuard>
              } />
              
              <Route path="/reset-password" element={
                <RouteGuard accessibleWhenAuthenticated={false}>
                  <ResetPassword />
                </RouteGuard>
              } />
              
              {/* First login required change password route */}
              <Route path="/change-password" element={
                <FirstLoginRoute>
                  <ChangePassword />
                </FirstLoginRoute>
              } />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Index />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/earnings" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Earnings />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/account" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Account />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
