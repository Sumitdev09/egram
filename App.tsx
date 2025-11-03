import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./components/auth/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import PropertyTax from "./pages/PropertyTax";
import Grievances from "./pages/Grievances";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCertificates from "./pages/admin/Certificates";
import AdminPropertyTax from "./pages/admin/PropertyTax";
import AdminGrievances from "./pages/admin/Grievances";
import AdminAnnouncements from "./pages/admin/Announcements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/certificates"
            element={
              <AuthGuard>
                <Certificates />
              </AuthGuard>
            }
          />
          <Route
            path="/property-tax"
            element={
              <AuthGuard>
                <PropertyTax />
              </AuthGuard>
            }
          />
          <Route
            path="/grievances"
            element={
              <AuthGuard>
                <Grievances />
              </AuthGuard>
            }
          />
          <Route
            path="/announcements"
            element={
              <AuthGuard>
                <Announcements />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/certificates"
            element={
              <AuthGuard>
                <AdminCertificates />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/property-tax"
            element={
              <AuthGuard>
                <AdminPropertyTax />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/grievances"
            element={
              <AuthGuard>
                <AdminGrievances />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <AuthGuard>
                <AdminAnnouncements />
              </AuthGuard>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
