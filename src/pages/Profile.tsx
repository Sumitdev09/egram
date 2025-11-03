import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Calendar, Shield, Save, Edit } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    full_name: "",
    phone: "",
    address: "",
    created_at: "",
    role: "citizen",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      setUserData({
        email: user.email || "",
        full_name: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
        created_at: user.created_at,
        role: profile?.role || "citizen",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: userData.full_name,
          phone: userData.phone,
          address: userData.address,
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button
            onClick={() => editing ? handleSave() : setEditing(true)}
            disabled={loading}
          >
            {editing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {userData.full_name ? getInitials(userData.full_name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {userData.full_name || "User"}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={userData.role === "admin" ? "destructive" : "default"}>
                    <Shield className="mr-1 h-3 w-3" />
                    {userData.role.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">
                    <User className="inline mr-2 h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={userData.full_name}
                    onChange={(e) =>
                      setUserData({ ...userData, full_name: e.target.value })
                    }
                    disabled={!editing}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline mr-2 h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="inline mr-2 h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    disabled={!editing}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="created_at">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    Member Since
                  </Label>
                  <Input
                    id="created_at"
                    value={new Date(userData.created_at).toLocaleDateString()}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  <MapPin className="inline mr-2 h-4 w-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  disabled={!editing}
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {editing && (
              <div className="mt-6 flex gap-4">
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    fetchUserProfile();
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Password</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input type="password" value="••••••••" disabled className="bg-muted" />
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Password Reset",
                      description: "Password reset link will be sent to your email.",
                    });
                  }}>
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
