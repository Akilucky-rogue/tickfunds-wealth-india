import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bell, User, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === "/") return "Summary";
    if (location.pathname.includes("risk")) return "Risk Profile";
    if (location.pathname.includes("goal")) return "Goals";
    if (location.pathname.includes("alert")) return "Alerts";
    return "Summary";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());
  const tabs = ["Summary", "Risk Profile", "Goals", "Alerts"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // For the home page, we'll handle the tab switch via state
    // The Index page now has its own tabs, so we just navigate to home
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-lg">Tickfunds</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/wishlist")}>
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/alerts")}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/account")}>
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Only show tabs on home page */}
        {location.pathname === "/" && (
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => handleTabClick(tab)}
                className="whitespace-nowrap"
              >
                {tab}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
