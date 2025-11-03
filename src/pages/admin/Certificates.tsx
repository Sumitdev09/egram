import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { FileText, CheckCircle, XCircle, Clock, Download, Eye, Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Certificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingCert, setViewingCert] = useState<any>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const updateData: any = { status };
      
      // If approving, add certificate number and issue date
      if (status === "approved") {
        const certNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        updateData.certificate_number = certNumber;
        updateData.issue_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from("certificates")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Certificate ${status} successfully!${status === "approved" ? " Certificate generated." : ""}`,
      });
      fetchCertificates();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const printCertificate = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-orange-500" },
      approved: { variant: "default" as const, icon: CheckCircle, color: "text-green-500" },
      rejected: { variant: "destructive" as const, icon: XCircle, color: "text-red-500" },
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className={`mr-1 h-3 w-3 ${config.color}`} />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading certificates...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Certificate Management</h1>
            <p className="text-muted-foreground">
              Review and manage citizen certificate applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Certificate Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {certificates.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No certificate applications yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">
                        {cert.certificate_type?.replace("_", " ").toUpperCase()}
                      </TableCell>
                      <TableCell>{cert.applicant_name || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(cert.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(cert.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {cert.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateStatus(cert.id, "approved")}
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateStatus(cert.id, "rejected")}
                              >
                                <XCircle className="mr-1 h-3 w-3" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setViewingCert(cert)}
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Certificate Details</DialogTitle>
                              </DialogHeader>
                              {viewingCert && (
                                <div className="space-y-6" id="certificate-print">
                                  {/* Certificate Header */}
                                  <div className="text-center border-b pb-4">
                                    <h2 className="text-2xl font-bold text-primary">
                                      Government of India
                                    </h2>
                                    <h3 className="text-xl font-semibold mt-2">
                                      E-Grampanchayat Certificate
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {viewingCert.certificate_type?.replace("_", " ").toUpperCase()}
                                    </p>
                                  </div>

                                  {/* Certificate Number & Date */}
                                  {viewingCert.status === "approved" && (
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="font-semibold">Certificate No:</span>
                                        <p className="text-muted-foreground">{viewingCert.certificate_number}</p>
                                      </div>
                                      <div>
                                        <span className="font-semibold">Issue Date:</span>
                                        <p className="text-muted-foreground">
                                          {new Date(viewingCert.issue_date).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  <Separator />

                                  {/* Certificate Body */}
                                  <div className="space-y-4">
                                    <p className="text-center text-lg">
                                      This is to certify that
                                    </p>
                                    
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-primary">
                                        {viewingCert.applicant_name || "N/A"}
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                      <div>
                                        <span className="font-semibold">Father's/Mother's Name:</span>
                                        <p className="text-muted-foreground">{viewingCert.parent_name || "N/A"}</p>
                                      </div>
                                      <div>
                                        <span className="font-semibold">Date of Birth:</span>
                                        <p className="text-muted-foreground">
                                          {viewingCert.date_of_birth 
                                            ? new Date(viewingCert.date_of_birth).toLocaleDateString()
                                            : "N/A"}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-semibold">Address:</span>
                                        <p className="text-muted-foreground">{viewingCert.address || "N/A"}</p>
                                      </div>
                                      <div>
                                        <span className="font-semibold">Application Date:</span>
                                        <p className="text-muted-foreground">
                                          {new Date(viewingCert.created_at).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>

                                    {viewingCert.purpose && (
                                      <div className="mt-4">
                                        <span className="font-semibold">Purpose:</span>
                                        <p className="text-muted-foreground">{viewingCert.purpose}</p>
                                      </div>
                                    )}
                                  </div>

                                  <Separator />

                                  {/* Status Badge */}
                                  <div className="flex justify-center">
                                    {getStatusBadge(viewingCert.status)}
                                  </div>

                                  {/* Certificate Footer (only for approved) */}
                                  {viewingCert.status === "approved" && (
                                    <div className="mt-8 pt-4 border-t">
                                      <div className="flex justify-between items-end">
                                        <div>
                                          <p className="text-sm text-muted-foreground">
                                            Digitally Signed
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            This is a computer-generated certificate
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-semibold">Village Officer</p>
                                          <p className="text-sm text-muted-foreground">E-Grampanchayat</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex gap-2 print:hidden">
                                    {viewingCert.status === "approved" && (
                                      <>
                                        <Button onClick={printCertificate}>
                                          <Printer className="mr-2 h-4 w-4" />
                                          Print Certificate
                                        </Button>
                                        <Button variant="outline">
                                          <Download className="mr-2 h-4 w-4" />
                                          Download PDF
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
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

export default Certificates;
