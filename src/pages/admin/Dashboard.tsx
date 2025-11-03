import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCitizens: 0,
    pendingCertificates: 0,
    openGrievances: 0,
    taxCollection: 0,
    approvedCertificates: 0,
    resolvedGrievances: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const [users, certificates, grievances, taxRecords] = await Promise.all([
        supabase.from("user_roles").select("*", { count: "exact" }).eq("role", "citizen"),
        supabase.from("certificates").select("*", { count: "exact" }),
        supabase.from("grievances").select("*", { count: "exact" }),
        supabase.from("property_tax").select("*", { count: "exact" }),
      ]);

      const pendingCerts = certificates.data?.filter(c => c.status === "pending").length || 0;
      const approvedCerts = certificates.data?.filter(c => c.status === "approved").length || 0;
      const openGrievances = grievances.data?.filter(g => g.status !== "resolved").length || 0;
      const resolvedGrievances = grievances.data?.filter(g => g.status === "resolved").length || 0;
      const totalCollection = taxRecords.data?.filter(t => t.status === "paid")
        .reduce((sum, t) => sum + (t.tax_amount || 0), 0) || 0;

      setStats({
        totalCitizens: users.count || 0,
        pendingCertificates: pendingCerts,
        openGrievances: openGrievances,
        taxCollection: totalCollection,
        approvedCertificates: approvedCerts,
        resolvedGrievances: resolvedGrievances,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Citizens",
      value: stats.totalCitizens,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Certificates",
      value: stats.pendingCertificates,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Open Grievances",
      value: stats.openGrievances,
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Tax Collection",
      value: `₹${stats.taxCollection.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Approved Certificates",
      value: stats.approvedCertificates,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Resolved Grievances",
      value: stats.resolvedGrievances,
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of village administration and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {index < 3 ? "Requires attention" : "Total processed"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span>Review Certificates</span>
                </div>
                <Badge variant="secondary">{stats.pendingCertificates}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-orange-500" />
                  <span>Address Grievances</span>
                </div>
                <Badge variant="secondary">{stats.openGrievances}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>View Reports</span>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Certificate Approved</p>
                    <p className="text-muted-foreground">Birth certificate #1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">New Grievance Filed</p>
                    <p className="text-muted-foreground">Road maintenance request</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Tax Payment Received</p>
                    <p className="text-muted-foreground">Property tax ₹5,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
