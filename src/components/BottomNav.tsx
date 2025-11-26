import { Home, TrendingUp, DollarSign, PieChart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: TrendingUp, label: "Invest", path: "/invest" },
    { icon: DollarSign, label: "Borrow", path: "/borrow" },
    { icon: PieChart, label: "Portfolio", path: "/portfolio" },
    { icon: User, label: "Account", path: "/account" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="container px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={index}
                variant="ghost"
                className="flex-col h-auto py-2 px-3"
                onClick={() => navigate(item.path)}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs mt-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
