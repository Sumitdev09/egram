import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, CheckCircle, Clock, TrendingUp, Plus } from "lucide-react";

const PropertyTax = () => {
  const { toast } = useToast();
  const [taxRecords, setTaxRecords] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCollected: 0,
    pending: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    property_number: "",
    owner_name: "",
    property_address: "",
    property_type: "residential",
    area_sqft: "",
    tax_amount: "",
    due_date: "",
    user_email: "",
  });

  useEffect(() => {
    fetchTaxRecords();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get user by email - using auth admin to find user
      // For now, we'll use a placeholder user_id or admin can enter user_id directly
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("property_tax").insert([
        {
          user_id: currentUser?.id || "", // This should be replaced with actual user selection
          property_number: formData.property_number,
          owner_name: formData.owner_name,
          property_address: formData.property_address,
          property_type: formData.property_type,
          area_sqft: parseFloat(formData.area_sqft),
          tax_amount: parseFloat(formData.tax_amount),
          due_date: formData.due_date,
          status: "unpaid",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property tax record added successfully!",
      });

      setIsDialogOpen(false);
      setFormData({
        property_number: "",
        owner_name: "",
        property_address: "",
        property_type: "residential",
        area_sqft: "",
        tax_amount: "",
        due_date: "",
        user_email: "",
      });
      fetchTaxRecords();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchTaxRecords = async () => {
    try {
      const { data: taxes, error: taxError } = await supabase
        .from("property_tax")
        .select("*")
        .order("due_date", { ascending: false });

      if (taxError) throw taxError;

      // Calculate stats from tax records
      const totalCollected = taxes?.filter(t => t.status === "paid")
        .reduce((sum, t) => sum + (t.tax_amount || 0), 0) || 0;
      const pendingTaxes = taxes?.filter(t => t.status === "unpaid") || [];
      const overdueTaxes = taxes?.filter(t => {
        return t.status === "unpaid" && new Date(t.due_date) < new Date();
      }) || [];

      setStats({
        totalCollected,
        pending: pendingTaxes.length,
        overdue: overdueTaxes.length,
      });
      setTaxRecords(taxes || []);
    } catch (error) {
      console.error("Error fetching tax records:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, dueDate: string) => {
    if (status === "paid") {
      return (
        <Badge variant="default">
          <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
          Paid
        </Badge>
      );
    }
    
    const isOverdue = new Date(dueDate) < new Date();
    return (
      <Badge variant={isOverdue ? "destructive" : "secondary"}>
        <Clock className="mr-1 h-3 w-3" />
        {isOverdue ? "Overdue" : "Pending"}
      </Badge>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading tax records...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Property Tax Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage property tax collection
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Tax Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Property Tax Record</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property_number">Property Number *</Label>
                    <Input
                      id="property_number"
                      value={formData.property_number}
                      onChange={(e) =>
                        setFormData({ ...formData, property_number: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="owner_name">Owner Name *</Label>
                    <Input
                      id="owner_name"
                      value={formData.owner_name}
                      onChange={(e) =>
                        setFormData({ ...formData, owner_name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="property_address">Property Address *</Label>
                  <Input
                    id="property_address"
                    value={formData.property_address}
                    onChange={(e) =>
                      setFormData({ ...formData, property_address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property_type">Property Type</Label>
                    <Select
                      value={formData.property_type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, property_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="area_sqft">Area (Sq.Ft) *</Label>
                    <Input
                      id="area_sqft"
                      type="number"
                      value={formData.area_sqft}
                      onChange={(e) =>
                        setFormData({ ...formData, area_sqft: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tax_amount">Tax Amount (₹) *</Label>
                    <Input
                      id="tax_amount"
                      type="number"
                      value={formData.tax_amount}
                      onChange={(e) =>
                        setFormData({ ...formData, tax_amount: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="due_date">Due Date *</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={(e) =>
                        setFormData({ ...formData, due_date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="user_email">User Email (for assignment)</Label>
                  <Input
                    id="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={(e) =>
                      setFormData({ ...formData, user_email: e.target.value })
                    }
                    placeholder="citizen@example.com"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Tax Record
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">This fiscal year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <TrendingUp className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.overdue}</div>
              <p className="text-xs text-muted-foreground mt-1">Past due date</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tax Records</CardTitle>
          </CardHeader>
          <CardContent>
            {taxRecords.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tax records found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property ID</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.property_number || "N/A"}
                      </TableCell>
                      <TableCell>{record.owner_name || "N/A"}</TableCell>
                      <TableCell>₹{record.tax_amount?.toLocaleString() || "0"}</TableCell>
                      <TableCell>
                        {new Date(record.due_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status, record.due_date)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PropertyTax;
