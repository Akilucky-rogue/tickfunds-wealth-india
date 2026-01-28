import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Building2, Search, TrendingUp, 
  Shield, Clock, ChevronRight, Star, Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FixedDeposit {
  id: string;
  company: string;
  rating: string;
  interestRate: number;
  tenure: string;
  minInvestment: number;
  maxInvestment: number;
  type: "Cumulative" | "Non-Cumulative";
  featured?: boolean;
}

const mockFDs: FixedDeposit[] = [
  {
    id: "fd1",
    company: "Bajaj Finance Ltd",
    rating: "AAA/Stable",
    interestRate: 8.35,
    tenure: "36 months",
    minInvestment: 15000,
    maxInvestment: 50000000,
    type: "Cumulative",
    featured: true,
  },
  {
    id: "fd2",
    company: "Mahindra Finance",
    rating: "AAA",
    interestRate: 8.25,
    tenure: "24 months",
    minInvestment: 5000,
    maxInvestment: 100000000,
    type: "Cumulative",
    featured: true,
  },
  {
    id: "fd3",
    company: "Shriram Finance",
    rating: "AA+",
    interestRate: 8.75,
    tenure: "36 months",
    minInvestment: 5000,
    maxInvestment: 50000000,
    type: "Non-Cumulative",
  },
  {
    id: "fd4",
    company: "HDFC Ltd",
    rating: "AAA",
    interestRate: 7.75,
    tenure: "33 months",
    minInvestment: 10000,
    maxInvestment: 200000000,
    type: "Cumulative",
  },
  {
    id: "fd5",
    company: "PNB Housing Finance",
    rating: "AA",
    interestRate: 8.50,
    tenure: "24 months",
    minInvestment: 10000,
    maxInvestment: 100000000,
    type: "Non-Cumulative",
  },
];

const CompanyFD = () => {
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
    if (rating.includes("AAA")) return "text-green-600 border-green-600";
    if (rating.includes("AA")) return "text-blue-600 border-blue-600";
    return "text-yellow-600 border-yellow-600";
  };

  const toggleCompare = (id: string) => {
    if (selectedCompare.includes(id)) {
      setSelectedCompare(selectedCompare.filter(i => i !== id));
    } else if (selectedCompare.length < 4) {
      setSelectedCompare([...selectedCompare, id]);
    }
  };

  const filteredFDs = mockFDs.filter(fd => 
    fd.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredFDs = filteredFDs.filter(fd => fd.featured);
  const allFDs = filteredFDs;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Company FD</h1>
          </div>
          {selectedCompare.length >= 2 && (
            <Button onClick={() => navigate(`/fd/compare?ids=${selectedCompare.join(',')}`)}>
              Compare ({selectedCompare.length})
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">DICGC Insured</p>
                <p className="text-sm text-muted-foreground">
                  Deposits up to ₹5 lakh are insured by DICGC
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="featured">
              <Star className="h-4 w-4 mr-2" />
              Featured ({featuredFDs.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All FDs ({allFDs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-4 mt-4">
            {featuredFDs.map((fd) => (
              <Card key={fd.id} className="hover:shadow-md transition-shadow border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className={`h-5 w-5 rounded border-2 cursor-pointer flex items-center justify-center ${selectedCompare.includes(fd.id) ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
                      onClick={() => toggleCompare(fd.id)}
                    >
                      {selectedCompare.includes(fd.id) && (
                        <span className="text-primary-foreground text-xs">✓</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{fd.company}</h3>
                        <Badge variant="outline" className={getRatingColor(fd.rating)}>
                          {fd.rating}
                        </Badge>
                        {fd.featured && (
                          <Badge className="bg-primary">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Interest Rate</p>
                          <p className="font-bold text-lg text-green-600">{fd.interestRate}% p.a.</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tenure</p>
                          <p className="font-medium">{fd.tenure}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min Investment</p>
                          <p className="font-medium">{formatCurrency(fd.minInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <Badge variant="outline">{fd.type}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => navigate(`/fd/${fd.id}`)}>
                      Invest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-4">
            {allFDs.map((fd) => (
              <Card key={fd.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className={`h-5 w-5 rounded border-2 cursor-pointer flex items-center justify-center ${selectedCompare.includes(fd.id) ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
                      onClick={() => toggleCompare(fd.id)}
                    >
                      {selectedCompare.includes(fd.id) && (
                        <span className="text-primary-foreground text-xs">✓</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{fd.company}</h3>
                        <Badge variant="outline" className={getRatingColor(fd.rating)}>
                          {fd.rating}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Interest Rate</p>
                          <p className="font-bold text-lg text-green-600">{fd.interestRate}% p.a.</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tenure</p>
                          <p className="font-medium">{fd.tenure}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min Investment</p>
                          <p className="font-medium">{formatCurrency(fd.minInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <Badge variant="outline">{fd.type}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => navigate(`/fd/${fd.id}`)}>
                      Invest
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

export default CompanyFD;
