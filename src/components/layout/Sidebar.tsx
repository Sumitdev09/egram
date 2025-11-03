import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  MessageSquare,
  Bell,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const citizenNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Certificates", path: "/certificates" },
  { icon: DollarSign, label: "Property Tax", path: "/property-tax" },
  { icon: MessageSquare, label: "Grievances", path: "/grievances" },
  { icon: Bell, label: "Announcements", path: "/announcements" },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: FileText, label: "Certificates", path: "/admin/certificates" },
  { icon: DollarSign, label: "Property Tax", path: "/admin/property-tax" },
  { icon: MessageSquare, label: "Grievances", path: "/admin/grievances" },
  { icon: Bell, label: "Announcements", path: "/admin/announcements" },
];

export const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data);
    };

    checkAdminRole();
  }, []);

  const navItems = isAdmin ? adminNavItems : citizenNavItems;

  return (
    <aside className="w-64 border-r bg-card min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
