import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("published_date", { ascending: false });

    setAnnouncements(data || []);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "high":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Announcements</h2>
          <p className="text-muted-foreground">Latest updates from Grampanchayat</p>
        </div>

        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{announcement.title}</CardTitle>
                        <Badge variant={getPriorityColor(announcement.priority) as any}>
                          {announcement.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">
                        {announcement.category}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 whitespace-pre-line">{announcement.content}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Published on {new Date(announcement.published_date).toLocaleDateString()}
                </div>
                {announcement.expiry_date && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Expires: {new Date(announcement.expiry_date).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
          {announcements.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No announcements at the moment</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Announcements;
