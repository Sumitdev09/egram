import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Building2, FileText, DollarSign, MessageSquare, Bell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">E-Grampanchayat</h1>
                <p className="text-xs text-muted-foreground">Digital Governance Portal</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/auth")}>Citizen Portal</Button>
              <Button variant="outline" onClick={() => navigate("/admin/login")}>Admin</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Welcome to E-Grampanchayat
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Simplifying village governance through digital services. Access certificates, pay taxes,
            file grievances, and stay updated - all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Citizen Portal
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/admin/login")}>
              Admin Login
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          <div className="p-6 bg-card border rounded-lg text-center">
            <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Certificates</h3>
            <p className="text-sm text-muted-foreground">
              Apply for birth, death, income, and residence certificates online
            </p>
          </div>

          <div className="p-6 bg-card border rounded-lg text-center">
            <div className="p-3 bg-secondary/10 rounded-lg inline-block mb-4">
              <DollarSign className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Property Tax</h3>
            <p className="text-sm text-muted-foreground">
              View and pay your property taxes conveniently
            </p>
          </div>

          <div className="p-6 bg-card border rounded-lg text-center">
            <div className="p-3 bg-info/10 rounded-lg inline-block mb-4">
              <MessageSquare className="h-8 w-8 text-info" />
            </div>
            <h3 className="font-semibold mb-2">Grievances</h3>
            <p className="text-sm text-muted-foreground">
              File complaints and track their resolution status
            </p>
          </div>

          <div className="p-6 bg-card border rounded-lg text-center">
            <div className="p-3 bg-accent/10 rounded-lg inline-block mb-4">
              <Bell className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Announcements</h3>
            <p className="text-sm text-muted-foreground">
              Stay informed with the latest village updates
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t bg-card/50 backdrop-blur mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 E-Grampanchayat Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
