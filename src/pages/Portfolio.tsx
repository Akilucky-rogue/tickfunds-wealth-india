import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, PieChart as PieChartIcon } from "lucide-react";

const Portfolio = () => {
  const holdings = [
    {
      name: "HDFC Top 100 Fund",
      category: "Equity - Large Cap",
      units: 450.25,
      invested: 125000,
      current: 142500,
      returns: 14.0,
      returnsAmount: 17500
    },
    {
      name: "ICICI Prudential Debt Fund",
      category: "Debt - Short Term",
      units: 1250.50,
      invested: 85000,
      current: 89250,
      returns: 5.0,
      returnsAmount: 4250
    },
    {
      name: "SBI Small Cap Fund",
      category: "Equity - Small Cap",
      units: 325.75,
      invested: 95000,
      current: 118750,
      returns: 25.0,
      returnsAmount: 23750
    },
    {
      name: "Axis Midcap Fund",
      category: "Equity - Mid Cap",
      units: 520.00,
      invested: 110000,
      current: 132000,
      returns: 20.0,
      returnsAmount: 22000
    }
  ];

  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.current, 0);
  const totalReturns = totalCurrent - totalInvested;
  const totalReturnsPercent = ((totalReturns / totalInvested) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and returns</p>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">₹{totalInvested.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold">₹{totalCurrent.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">
                    ₹{totalReturns.toLocaleString('en-IN')}
                  </p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {totalReturnsPercent}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="holdings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-4">
            {holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{holding.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{holding.category}</p>
                      <p className="text-xs text-muted-foreground">Units: {holding.units}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${holding.returns >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {holding.returns >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-semibold">{holding.returns}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Invested</p>
                      <p className="text-sm font-semibold">₹{holding.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Current</p>
                      <p className="text-sm font-semibold">₹{holding.current.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Returns</p>
                      <p className="text-sm font-semibold text-primary">
                        +₹{holding.returnsAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Equity</span>
                      <span className="text-sm text-muted-foreground">68%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-primary rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Debt</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[25%] bg-secondary rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Others</span>
                      <span className="text-sm text-muted-foreground">7%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[7%] bg-accent rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent transactions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Portfolio;
