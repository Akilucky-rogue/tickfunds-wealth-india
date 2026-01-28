import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Search, TrendingUp, Shield, Clock, 
  ChevronRight, Star, Filter, Building2, Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Bond {
  id: string;
  name: string;
  issuer: string;
  rating: string;
  couponRate: number;
  ytm: number;
  maturityDate: string;
  faceValue: number;
  minInvestment: number;
  type: "Government" | "Corporate" | "Tax-Free" | "PSU";
  featured?: boolean;
}

const mockBonds: Bond[] = [
  {
    id: "bond1",
    name: "NHAI Tax Free Bond 2034",
    issuer: "NHAI",
    rating: "Sovereign",
    couponRate: 7.35,
    ytm: 6.85,
    maturityDate: "2034-03-15",
    faceValue: 1000,
    minInvestment: 10000,
    type: "Tax-Free",
    featured: true,
  },
  {
    id: "bond2",
    name: "REC Corporate Bond",
    issuer: "REC Ltd",
    rating: "AAA",
    couponRate: 8.10,
    ytm: 7.95,
    maturityDate: "2028-06-30",
    faceValue: 1000,
    minInvestment: 10000,
    type: "PSU",
    featured: true,
  },
  {
    id: "bond3",
    name: "SBI Green Bond",
    issuer: "State Bank of India",
    rating: "AAA",
    couponRate: 7.85,
    ytm: 7.50,
    maturityDate: "2030-12-15",
    faceValue: 1000,
    minInvestment: 10000,
    type: "Corporate",
  },
  {
    id: "bond4",
    name: "IRFC Bond 2029",
    issuer: "IRFC",
    rating: "AAA",
    couponRate: 7.75,
    ytm: 7.45,
    maturityDate: "2029-09-20",
    faceValue: 1000,
    minInvestment: 10000,
    type: "PSU",
  },
  {
    id: "bond5",
    name: "GoI Securities 2033",
    issuer: "Government of India",
    rating: "Sovereign",
    couponRate: 7.26,
    ytm: 7.15,
    maturityDate: "2033-06-22",
    faceValue: 100,
    minInvestment: 10000,
    type: "Government",
  },
];

const mockBaskets = [
  {
    id: "basket1",
    name: "Conservative Bond Basket",
    description: "Mix of AAA rated PSU and Tax-free bonds",
    bonds: 5,
    avgYTM: 7.45,
    minInvestment: 50000,
  },
  {
    id: "basket2",
    name: "Tax Saver Bond Basket",
    description: "Tax-free bonds from NHAI, REC, PFC",
    bonds: 4,
    avgYTM: 6.95,
    minInvestment: 100000,
  },
];

const Bonds = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompare, setSelectedCompare] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingColor = (rating: string) => {
    if (rating === "Sovereign") return "text-purple-600 border-purple-600";
    if (rating.includes("AAA")) return "text-green-600 border-green-600";
    if (rating.includes("AA")) return "text-blue-600 border-blue-600";
    return "text-yellow-600 border-yellow-600";
  };

  const getTypeBadge = (type: Bond["type"]) => {
    switch (type) {
      case "Government": return <Badge className="bg-purple-600">Govt</Badge>;
      case "Tax-Free": return <Badge className="bg-green-600">Tax-Free</Badge>;
      case "PSU": return <Badge className="bg-blue-600">PSU</Badge>;
      case "Corporate": return <Badge variant="outline">Corporate</Badge>;
    }
  };

  const toggleCompare = (id: string) => {
    if (selectedCompare.includes(id)) {
      setSelectedCompare(selectedCompare.filter(i => i !== id));
    } else if (selectedCompare.length < 4) {
      setSelectedCompare([...selectedCompare, id]);
    }
  };

  const filteredBonds = mockBonds.filter(bond => 
    bond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bond.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Bonds</h1>
          </div>
          {selectedCompare.length >= 2 && (
            <Button onClick={() => navigate(`/bonds/compare?ids=${selectedCompare.join(',')}`)}>
              Compare ({selectedCompare.length})
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bonds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">
              <Building2 className="h-4 w-4 mr-2" />
              Explore
            </TabsTrigger>
            <TabsTrigger value="baskets">
              <Briefcase className="h-4 w-4 mr-2" />
              Baskets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-4 mt-4">
            {/* Featured */}
            {filteredBonds.some(b => b.featured) && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">FEATURED</h3>
                {filteredBonds.filter(b => b.featured).map((bond) => (
                  <Card key={bond.id} className="hover:shadow-md transition-shadow border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div 
                          className={`h-5 w-5 rounded border-2 cursor-pointer flex items-center justify-center ${selectedCompare.includes(bond.id) ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
                          onClick={() => toggleCompare(bond.id)}
                        >
                          {selectedCompare.includes(bond.id) && (
                            <span className="text-primary-foreground text-xs">✓</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold">{bond.name}</h3>
                            {getTypeBadge(bond.type)}
                            <Badge variant="outline" className={getRatingColor(bond.rating)}>
                              {bond.rating}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{bond.issuer}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Coupon</p>
                              <p className="font-bold text-lg">{bond.couponRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">YTM</p>
                              <p className="font-bold text-lg text-green-600">{bond.ytm}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Maturity</p>
                              <p className="font-medium">{new Date(bond.maturityDate).getFullYear()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Min Investment</p>
                              <p className="font-medium">{formatCurrency(bond.minInvestment)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button onClick={() => navigate(`/bonds/${bond.id}`)}>
                          Buy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* All Bonds */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">ALL BONDS</h3>
              {filteredBonds.map((bond) => (
                <Card key={bond.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div 
                        className={`h-5 w-5 rounded border-2 cursor-pointer flex items-center justify-center ${selectedCompare.includes(bond.id) ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
                        onClick={() => toggleCompare(bond.id)}
                      >
                        {selectedCompare.includes(bond.id) && (
                          <span className="text-primary-foreground text-xs">✓</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold">{bond.name}</h3>
                          {getTypeBadge(bond.type)}
                          <Badge variant="outline" className={getRatingColor(bond.rating)}>
                            {bond.rating}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{bond.issuer}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Coupon: </span>
                            <span className="font-bold">{bond.couponRate}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">YTM: </span>
                            <span className="font-bold text-green-600">{bond.ytm}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Maturity: </span>
                            <span className="font-medium">{new Date(bond.maturityDate).getFullYear()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" onClick={() => navigate(`/bonds/${bond.id}`)}>
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="baskets" className="space-y-4 mt-4">
            {mockBaskets.map((basket) => (
              <Card key={basket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{basket.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{basket.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Bonds: </span>
                          <span className="font-medium">{basket.bonds}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg YTM: </span>
                          <span className="font-bold text-green-600">{basket.avgYTM}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Min Investment: </span>
                          <span className="font-medium">{formatCurrency(basket.minInvestment)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => navigate(`/bonds/basket/${basket.id}`)}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Bonds;
