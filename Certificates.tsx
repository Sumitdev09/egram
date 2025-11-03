import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Certificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    certificate_type: "",
    applicant_name: "",
    details: {},
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setCertificates(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("certificates").insert({
      user_id: user.id,
      certificate_type: formData.certificate_type,
      applicant_name: formData.applicant_name,
      details: formData.details,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Certificate application submitted",
      });
      setIsOpen(false);
      fetchCertificates();
      setFormData({ certificate_type: "", applicant_name: "", details: {} });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "warning";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Certificates</h2>
            <p className="text-muted-foreground">Apply and track certificate requests</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply for Certificate</DialogTitle>
                <DialogDescription>
                  Fill out the form below to apply for a certificate. You can track the status after submission.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Certificate Type</Label>
                  <Select
                    value={formData.certificate_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, certificate_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birth">Birth Certificate</SelectItem>
                      <SelectItem value="death">Death Certificate</SelectItem>
                      <SelectItem value="income">Income Certificate</SelectItem>
                      <SelectItem value="residence">Residence Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Applicant Name</Label>
                  <Input
                    value={formData.applicant_name}
                    onChange={(e) =>
                      setFormData({ ...formData, applicant_name: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="capitalize">
                        {cert.certificate_type} Certificate
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{cert.applicant_name}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(cert.status) as any}>
                    {cert.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Applied on {new Date(cert.application_date).toLocaleDateString()}
                </div>
                {cert.remarks && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    <strong>Remarks:</strong> {cert.remarks}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certificates;
