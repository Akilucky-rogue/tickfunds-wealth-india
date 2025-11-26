import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Invest = () => {
  const fundCategories = [
    { name: "Equity Funds", count: 45, risk: "High" },
    { name: "Debt Funds", count: 32, risk: "Low" },
    { name: "Hybrid Funds", count: 28, risk: "Medium" },
    { name: "Index Funds", count: 18, risk: "Medium" }
  ];

  const recommendedFunds = [
    {
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      returns: "12.5%",
      rating: 5,
      minInvestment: "₹5,000"
    },
    {
      name: "ICICI Prudential Bluechip",
      category: "Large Cap",
      returns: "11.8%",
      rating: 4,
      minInvestment: "₹5,000"
    },
    {
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      returns: "15.2%",
      rating: 5,
      minInvestment: "₹5,000"
    },
    {
      name: "Axis Midcap Fund",
      category: "Mid Cap",
      returns: "13.7%",
      rating: 4,
      minInvestment: "₹5,000"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Invest</h1>
          <p className="text-muted-foreground">Explore and invest in curated mutual funds</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for funds..." 
            className="pl-10"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fundCategories.map((category, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{category.count} funds</span>
                    <Badge variant="outline" className="text-xs">
                      {category.risk}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
          <div className="space-y-4">
            {recommendedFunds.map((fund, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{fund.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {fund.category}
                      </Badge>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(fund.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">3Y Returns</p>
                      <p className="text-lg font-bold text-primary">{fund.returns}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-muted-foreground">Min. Investment</p>
                      <p className="text-sm font-semibold">{fund.minInvestment}</p>
                    </div>
                    <Button>Invest Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Invest;
