import { Home, TrendingUp, DollarSign, PieChart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: TrendingUp, label: "Invest", active: false },
    { icon: DollarSign, label: "Borrow", active: false },
    { icon: PieChart, label: "Portfolio", active: false },
    { icon: User, label: "Account", active: false }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="container px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex-col h-auto py-2 px-3"
            >
              <item.icon className={`h-5 w-5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs mt-1 ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
