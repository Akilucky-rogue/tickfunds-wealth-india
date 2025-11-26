import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bell, User, Menu } from "lucide-react";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("Summary");
  const tabs = ["Summary", "Risk Profile", "Goals", "Alerts"];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-lg">Tickfunds</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
              className="whitespace-nowrap"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
