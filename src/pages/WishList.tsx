import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Heart, Trash2, TrendingUp, 
  TrendingDown, Plus, Briefcase, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  type: "fund" | "basket";
  category?: string;
  nav?: number;
  returns1Y?: number;
  returns3Y?: number;
  risk?: string;
  aum?: number;
  addedDate: string;
}

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "HDFC Flexi Cap Fund",
    type: "fund",
    category: "Equity - Flexi Cap",
    nav: 1524.35,
    returns1Y: 18.5,
    returns3Y: 15.2,
    risk: "High",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "ICICI Prudential Blue Chip Fund",
    type: "fund",
    category: "Equity - Large Cap",
    nav: 78.92,
    returns1Y: 22.3,
    returns3Y: 14.8,
    risk: "Moderate",
    addedDate: "2024-01-10",
  },
  {
    id: "3",
    name: "SBI Equity Hybrid Fund",
    type: "fund",
    category: "Hybrid - Aggressive",
    nav: 234.56,
    returns1Y: 15.2,
    returns3Y: 12.5,
    risk: "Moderate",
    addedDate: "2024-01-05",
  },
];

const mockBaskets: WishlistItem[] = [
  {
    id: "b1",
    name: "Tax Saver Basket",
    type: "basket",
    aum: 500000,
    returns1Y: 19.5,
    addedDate: "2024-01-12",
  },
  {
    id: "b2",
    name: "Long Term Wealth",
    type: "basket",
    aum: 1000000,
    returns1Y: 21.2,
    addedDate: "2024-01-08",
  },
];

const WishList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [schemes, setSchemes] = useState<WishlistItem[]>(mockWishlist);
  const [baskets, setBaskets] = useState<WishlistItem[]>(mockBaskets);

  const handleRemove = (id: string, type: "fund" | "basket") => {
    if (type === "fund") {
      setSchemes(schemes.filter(s => s.id !== id));
    } else {
      setBaskets(baskets.filter(b => b.id !== id));
    }
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600 border-green-600";
      case "Moderate": return "text-yellow-600 border-yellow-600";
      case "High": return "text-orange-600 border-orange-600";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Wish List</h1>
          </div>
          <Button onClick={() => navigate("/invest")}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <Tabs defaultValue="schemes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Schemes ({schemes.length})
            </TabsTrigger>
            <TabsTrigger value="baskets" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Baskets ({baskets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schemes" className="space-y-4 mt-4">
            {schemes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No schemes in your wishlist</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/invest")}>
                    Explore Funds
                  </Button>
                </CardContent>
              </Card>
            ) : (
              schemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex-1 cursor-pointer" 
                        onClick={() => navigate(`/fund/${scheme.id}`)}
                      >
                        <h3 className="font-semibold mb-1">{scheme.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{scheme.category}</p>
                        
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">NAV: </span>
                            <span className="font-medium">₹{scheme.nav?.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">1Y: </span>
                            <span className={`font-medium flex items-center ${scheme.returns1Y! > 0 ? 'text-green-600' : 'text-destructive'}`}>
                              {scheme.returns1Y! > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {scheme.returns1Y}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">3Y: </span>
                            <span className={`font-medium ${scheme.returns3Y! > 0 ? 'text-green-600' : 'text-destructive'}`}>
                              {scheme.returns3Y}%
                            </span>
                          </div>
                          <Badge variant="outline" className={getRiskColor(scheme.risk!)}>
                            {scheme.risk}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/fund/${scheme.id}`)}
                        >
                          Invest
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemove(scheme.id, "fund")}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="baskets" className="space-y-4 mt-4">
            {baskets.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No baskets in your wishlist</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/invest")}>
                    Explore Baskets
                  </Button>
                </CardContent>
              </Card>
            ) : (
              baskets.map((basket) => (
                <Card key={basket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{basket.name}</h3>
                        <div className="flex flex-wrap gap-3 text-sm mt-2">
                          <div>
                            <span className="text-muted-foreground">Min Investment: </span>
                            <span className="font-medium">{formatCurrency(basket.aum!)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">1Y Returns: </span>
                            <span className="font-medium text-green-600 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {basket.returns1Y}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          Invest
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemove(basket.id, "basket")}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Compare Button */}
        {schemes.length >= 2 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compare Funds</p>
                  <p className="text-sm text-muted-foreground">
                    Select up to 4 funds to compare
                  </p>
                </div>
                <Button onClick={() => navigate("/compare")}>
                  Compare
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default WishList;
