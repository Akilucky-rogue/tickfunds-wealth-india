import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, TrendingUp, Heart, ShoppingCart, 
  Layers, BarChart3, Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Invest = () => {
  const navigate = useNavigate();

  // Investment sections with navigation paths
  const investSections = [
    { id: "mf", label: "Mutual Funds", icon: BarChart3, path: "/invest/mf", description: "Diversified portfolio options" },
    { id: "fd", label: "Company FD", icon: Layers, path: "/fd", description: "Fixed deposits from top companies" },
    { id: "bonds", label: "Bonds", icon: TrendingUp, path: "/bonds", description: "Government & corporate bonds" },
    { id: "gold", label: "Gold & Silver", icon: Sparkles, path: "/gold", description: "Digital precious metals" },
    { id: "pms", label: "PMS & AIF", icon: BarChart3, path: "/pms-aif", description: "For HNI investors" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Invest</h1>
            <p className="text-muted-foreground text-sm">Choose your investment type</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/wishlist")}>
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/orders")}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </Button>
          </div>
        </div>

        {/* Investment Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {investSections.map((section) => (
            <Card 
              key={section.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
              onClick={() => navigate(section.path)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <section.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{section.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Invest;
