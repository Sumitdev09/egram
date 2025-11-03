import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminPropertyTax = () => {
  const [propertyTax, setPropertyTax] = useState<any[]>([]);

  useEffect(() => {
    fetchPropertyTax();
  }, []);

  const fetchPropertyTax = async () => {
    const { data } = await supabase
      .from("property_tax")
      .select("*")
      .order("created_at", { ascending: false });
    setPropertyTax(data || []);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Property Tax Management</h1>
          <p className="text-muted-foreground">View and manage all property tax records</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Property Tax Records</CardTitle>
            <CardDescription>Complete list of property tax entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property No.</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyTax.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell className="font-medium">{tax.property_number}</TableCell>
                    <TableCell>{tax.owner_name}</TableCell>
                    <TableCell>{tax.property_address}</TableCell>
                    <TableCell>{tax.property_type}</TableCell>
                    <TableCell>₹{tax.tax_amount}</TableCell>
                    <TableCell>{new Date(tax.due_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={tax.status === "paid" ? "default" : "destructive"}>
                        {tax.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPropertyTax;
