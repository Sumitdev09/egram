import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <footer className="border-t bg-card py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-medium">Made with ❤️ by Sumit Yadav</p>
        </div>
      </footer>
    </div>
  );
};
