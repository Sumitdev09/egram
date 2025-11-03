import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, MessageSquare, Bell, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCertificates: 0,
    pendingCertificates: 0,
    totalGrievances: 0,
    pendingGrievances: 0,
    propertyTaxDue: 0,
    announcements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [certificates, grievances, propertyTax, announcements] = await Promise.all([
        supabase.from("certificates").select("*", { count: "exact" }).eq("user_id", user.id),
        supabase.from("grievances").select("*", { count: "exact" }).eq("user_id", user.id),
        supabase
          .from("property_tax")
          .select("*", { count: "exact" })
          .eq("user_id", user.id)
          .eq("status", "unpaid"),
        supabase.from("announcements").select("*", { count: "exact" }),
      ]);

      setStats({
        totalCertificates: certificates.count || 0,
        pendingCertificates:
          certificates.data?.filter((c) => c.status === "pending").length || 0,
        totalGrievances: grievances.count || 0,
        pendingGrievances:
          grievances.data?.filter((g) => g.status !== "resolved").length || 0,
        propertyTaxDue: propertyTax.count || 0,
        announcements: announcements.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Certificates",
      value: stats.totalCertificates,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending Certificates",
      value: stats.pendingCertificates,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Active Grievances",
      value: stats.pendingGrievances,
      icon: MessageSquare,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Property Tax Due",
      value: stats.propertyTaxDue,
      icon: DollarSign,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Total Grievances",
      value: stats.totalGrievances,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Announcements",
      value: stats.announcements,
      icon: Bell,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to your E-Grampanchayat portal</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold mb-1">Apply for Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  Birth, Death, Income, or Residence certificate
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold mb-1">File a Grievance</h3>
                <p className="text-sm text-muted-foreground">
                  Report issues and track resolution
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold mb-1">Pay Property Tax</h3>
                <p className="text-sm text-muted-foreground">View and pay your dues</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold mb-1">View Announcements</h3>
                <p className="text-sm text-muted-foreground">
                  Latest updates from Grampanchayat
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
