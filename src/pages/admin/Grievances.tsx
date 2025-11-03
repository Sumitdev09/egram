import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { MessageSquare, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";

const Grievances = () => {
  const { toast } = useToast();
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const { data, error } = await supabase
        .from("grievances")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGrievances(data || []);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("grievances")
        .update({ 
          status,
          admin_response: response,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Grievance ${status} successfully!`,
      });
      setResponse("");
      fetchGrievances();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-orange-500" },
      "in-progress": { variant: "default" as const, icon: AlertCircle, color: "text-blue-500" },
      resolved: { variant: "default" as const, icon: CheckCircle, color: "text-green-500" },
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className={`mr-1 h-3 w-3 ${config.color}`} />
        {status.replace("-", " ")}
      </Badge>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading grievances...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Grievance Management</h1>
          <p className="text-muted-foreground">
            Review and respond to citizen grievances
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Citizen Grievances</CardTitle>
          </CardHeader>
          <CardContent>
            {grievances.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No grievances filed yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grievances.map((grievance) => (
                    <TableRow key={grievance.id}>
                      <TableCell>
                        <Badge variant="outline">{grievance.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {grievance.subject}
                      </TableCell>
                      <TableCell>
                        {new Date(grievance.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedGrievance(grievance)}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View & Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Grievance Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Subject</label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedGrievance?.subject}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedGrievance?.description}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Category</label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedGrievance?.category}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <div className="mt-1">
                                  {selectedGrievance && getStatusBadge(selectedGrievance.status)}
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Admin Response</label>
                                <Textarea
                                  value={response}
                                  onChange={(e) => setResponse(e.target.value)}
                                  placeholder="Enter your response..."
                                  className="mt-2"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => updateStatus(selectedGrievance?.id, "in-progress")}
                                >
                                  Mark In Progress
                                </Button>
                                <Button
                                  onClick={() => updateStatus(selectedGrievance?.id, "resolved")}
                                  variant="default"
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Mark Resolved
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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

export default Grievances;
