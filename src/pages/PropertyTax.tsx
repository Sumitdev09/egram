import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const PropertyTax = () => {
  const { toast } = useToast();
  const [propertyTax, setPropertyTax] = useState<any[]>([]);
  const [selectedTax, setSelectedTax] = useState<any>(null);

  useEffect(() => {
    fetchPropertyTax();
  }, []);

  const fetchPropertyTax = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("property_tax")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setPropertyTax(data || []);
  };

  const handlePayment = async (taxId: string) => {
    try {
      const { error } = await supabase
        .from("property_tax")
        .update({ 
          status: "paid",
          payment_date: new Date().toISOString()
        })
        .eq("id", taxId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property tax paid successfully!",
      });
      fetchPropertyTax();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTaxStats = () => {
    const unpaid = propertyTax.filter(t => t.status === "unpaid");
    const paid = propertyTax.filter(t => t.status === "paid");
    const totalUnpaid = unpaid.reduce((sum, t) => sum + (t.tax_amount || 0), 0);
    const totalPaid = paid.reduce((sum, t) => sum + (t.tax_amount || 0), 0);
    
    return { unpaid: unpaid.length, paid: paid.length, totalUnpaid, totalPaid };
  };

  const stats = getTaxStats();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Property Tax</h1>
          <p className="text-muted-foreground">View and pay your property tax</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Unpaid Taxes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unpaid}</div>
              <p className="text-xs text-muted-foreground">₹{stats.totalUnpaid.toLocaleString()} due</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Paid Taxes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
              <p className="text-xs text-muted-foreground">₹{stats.totalPaid.toLocaleString()} paid</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{propertyTax.length}</div>
              <p className="text-xs text-muted-foreground">Registered properties</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Tax Records</CardTitle>
            <CardDescription>View and pay your property tax</CardDescription>
          </CardHeader>
          <CardContent>
            {propertyTax.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No property tax records found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property No.</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyTax.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell className="font-medium">{tax.property_number}</TableCell>
                      <TableCell>{tax.property_address}</TableCell>
                      <TableCell className="capitalize">{tax.property_type}</TableCell>
                      <TableCell>₹{tax.tax_amount?.toLocaleString()}</TableCell>
                      <TableCell>{new Date(tax.due_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={tax.status === "paid" ? "default" : "destructive"}>
                          {tax.status === "paid" ? (
                            <><CheckCircle className="mr-1 h-3 w-3" /> Paid</>
                          ) : (
                            <><Clock className="mr-1 h-3 w-3" /> Unpaid</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {tax.status === "unpaid" ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm"
                                onClick={() => setSelectedTax(tax)}
                              >
                                <CreditCard className="mr-1 h-3 w-3" />
                                Pay Now
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Pay Property Tax</DialogTitle>
                                <DialogDescription>
                                  Confirm payment for property tax
                                </DialogDescription>
                              </DialogHeader>
                              {selectedTax && (
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Property Number:</span>
                                      <span className="text-sm text-muted-foreground">
                                        {selectedTax.property_number}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Address:</span>
                                      <span className="text-sm text-muted-foreground">
                                        {selectedTax.property_address}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Property Type:</span>
                                      <span className="text-sm text-muted-foreground capitalize">
                                        {selectedTax.property_type}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Area:</span>
                                      <span className="text-sm text-muted-foreground">
                                        {selectedTax.area_sqft} sq.ft
                                      </span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                      <span className="text-lg font-bold">Total Amount:</span>
                                      <span className="text-lg font-bold text-primary">
                                        ₹{selectedTax.tax_amount?.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                      Payment Method: Online Payment
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      * This is a demo payment. In production, integrate with payment gateways.
                                    </p>
                                  </div>

                                  <Button 
                                    className="w-full" 
                                    onClick={() => handlePayment(selectedTax.id)}
                                  >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Confirm Payment
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Badge variant="outline">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Paid on {tax.payment_date && new Date(tax.payment_date).toLocaleDateString()}
                          </Badge>
                        )}
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
