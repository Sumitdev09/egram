import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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
import { Users as UsersIcon, Eye, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      // Get profiles if available
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*");

      // Combine data
      const usersWithProfiles = userRoles?.map(role => {
        const profile = profiles?.find(p => p.id === role.user_id);
        return {
          ...role,
          profile: profile || {}
        };
      });

      setUsers(usersWithProfiles || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    return (
      <Badge variant={role === "admin" ? "destructive" : "default"}>
        <Shield className="mr-1 h-3 w-3" />
        {role.toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading users...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            View and manage all registered users
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-12">
                <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No users registered yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {getInitials(user.profile?.full_name || "User")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {user.profile?.full_name || "Unknown User"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{user.profile?.email || "N/A"}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                  <AvatarFallback className="text-2xl">
                                    {getInitials(selectedUser?.profile?.full_name || "User")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    {selectedUser?.profile?.full_name || "Unknown User"}
                                  </h3>
                                  <div className="mt-2">
                                    {selectedUser && getRoleBadge(selectedUser.role)}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Email:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground pl-6">
                                    {selectedUser?.profile?.email || "N/A"}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Phone:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground pl-6">
                                    {selectedUser?.profile?.phone || "N/A"}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Joined:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground pl-6">
                                    {selectedUser?.created_at && 
                                      new Date(selectedUser.created_at).toLocaleDateString()}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">User ID:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground pl-6 break-all">
                                    {selectedUser?.user_id?.substring(0, 20)}...
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">Address:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">
                                  {selectedUser?.profile?.address || "Not provided"}
                                </p>
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

export default Users;
