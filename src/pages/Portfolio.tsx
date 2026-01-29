import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, TrendingDown, PieChart as PieChartIcon, 
  BarChart3, Layers, Coins, Building2, CreditCard, FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeAsset, setActiveAsset] = useState("mf");

  // Portfolio data for each asset class
  const portfolioData = {
    mf: {
      total: 350000,
      invested: 305000,
      returns: 45000,
      returnsPercent: 14.75,
      holdings: [
        { name: "HDFC Top 100 Fund", category: "Equity - Large Cap", units: 450.25, invested: 125000, current: 142500, returns: 14.0 },
        { name: "ICICI Prudential Debt Fund", category: "Debt - Short Term", units: 1250.50, invested: 85000, current: 89250, returns: 5.0 },
        { name: "SBI Small Cap Fund", category: "Equity - Small Cap", units: 325.75, invested: 95000, current: 118750, returns: 25.0 }
      ]
    },
    baskets: {
      total: 120000,
      invested: 100000,
      returns: 20000,
      returnsPercent: 20.0,
      holdings: [
        { name: "Growth Unleashed", funds: 5, invested: 60000, current: 72000, returns: 20.0 },
        { name: "Stable Returns", funds: 4, invested: 40000, current: 48000, returns: 20.0 }
      ]
    },
    fd: {
      total: 250000,
      invested: 230000,
      returns: 20000,
      returnsPercent: 8.7,
      holdings: [
        { name: "Bajaj Finance FD", rate: "8.5%", tenure: "24 months", invested: 100000, current: 108500, maturity: "Mar 2026" },
        { name: "HDFC Ltd FD", rate: "8.25%", tenure: "36 months", invested: 130000, current: 141500, maturity: "Dec 2026" }
      ]
    },
    bonds: {
      total: 100000,
      invested: 85000,
      returns: 15000,
      returnsPercent: 17.65,
      holdings: [
        { name: "NHAI Bond", coupon: "7.5%", maturity: "2028", invested: 50000, current: 58000 },
        { name: "REC Bond", coupon: "8.0%", maturity: "2027", invested: 35000, current: 42000 }
      ]
    },
    gold: {
      total: 75000,
      invested: 60000,
      returns: 15000,
      returnsPercent: 25.0,
      holdings: [
        { name: "Digital Gold", grams: 10.5, invested: 45000, current: 56250 },
        { name: "Digital Silver", grams: 250, invested: 15000, current: 18750 }
      ]
    },
    loans: {
      total: 200000,
      outstanding: 180000,
      paid: 20000,
      holdings: [
        { name: "LAMF - HDFC Securities", sanctioned: 200000, outstanding: 180000, rate: "10.5%", collateral: "Mutual Funds" }
      ]
    }
  };

  // Asset tabs config
  const assetTabs = [
    { id: "mf", label: "Mutual Funds", icon: BarChart3 },
    { id: "baskets", label: "Baskets", icon: Layers },
    { id: "fd", label: "FDs", icon: Building2 },
    { id: "bonds", label: "Bonds", icon: FileText },
    { id: "gold", label: "Gold & Silver", icon: Coins },
    { id: "loans", label: "Loans", icon: CreditCard }
  ];

  const totalPortfolio = Object.entries(portfolioData)
    .filter(([key]) => key !== 'loans')
    .reduce((sum, [, data]) => sum + data.total, 0);
  
  const totalInvested = Object.entries(portfolioData)
    .filter(([key]) => key !== 'loans')
    .reduce((sum, [, data]) => sum + ('invested' in data ? data.invested : 0), 0);
  
  const totalReturns = totalPortfolio - totalInvested;
  const totalReturnsPercent = ((totalReturns / totalInvested) * 100).toFixed(2);

  const currentData = portfolioData[activeAsset as keyof typeof portfolioData];
  const isLoan = activeAsset === "loans";
  const assetInvested = 'invested' in currentData ? currentData.invested : 0;
  const assetReturnsPercent = 'returnsPercent' in currentData ? currentData.returnsPercent : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and returns</p>
        </div>

        {/* Total Portfolio Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">₹{totalInvested.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold">₹{totalPortfolio.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">₹{totalReturns.toLocaleString('en-IN')}</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {totalReturnsPercent}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Class Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {assetTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeAsset === tab.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap gap-2"
              onClick={() => setActiveAsset(tab.id)}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Asset Summary Card */}
        {!isLoan && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Invested</p>
                  <p className="font-bold">₹{assetInvested.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current</p>
                  <p className="font-bold">₹{currentData.total.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Returns</p>
                  <p className="font-bold text-primary">+{assetReturnsPercent}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Holdings Tab Content */}
        <Tabs defaultValue="holdings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-4">
            {/* Mutual Funds Holdings */}
            {activeAsset === "mf" && portfolioData.mf.holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/fund/${index + 1}`)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{holding.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{holding.category}</p>
                      <p className="text-xs text-muted-foreground">Units: {holding.units}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${holding.returns >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {holding.returns >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
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
                      <p className="text-sm font-semibold text-primary">+₹{(holding.current - holding.invested).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Baskets Holdings */}
            {activeAsset === "baskets" && portfolioData.baskets.holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{holding.name}</p>
                      <p className="text-sm text-muted-foreground">{holding.funds} funds</p>
                    </div>
                    <Badge className="bg-primary">+{holding.returns}%</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Invested</p>
                      <p className="font-semibold">₹{holding.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current</p>
                      <p className="font-semibold">₹{holding.current.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* FD Holdings */}
            {activeAsset === "fd" && portfolioData.fd.holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{holding.name}</p>
                      <p className="text-sm text-muted-foreground">{holding.tenure} @ {holding.rate}</p>
                    </div>
                    <Badge variant="outline">Matures: {holding.maturity}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Principal</p>
                      <p className="font-semibold">₹{holding.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Maturity Value</p>
                      <p className="font-semibold text-primary">₹{holding.current.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Bonds Holdings */}
            {activeAsset === "bonds" && portfolioData.bonds.holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{holding.name}</p>
                      <p className="text-sm text-muted-foreground">Coupon: {holding.coupon}</p>
                    </div>
                    <Badge variant="outline">Matures: {holding.maturity}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Invested</p>
                      <p className="font-semibold">₹{holding.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current Value</p>
                      <p className="font-semibold text-primary">₹{holding.current.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Gold Holdings */}
            {activeAsset === "gold" && portfolioData.gold.holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{holding.name}</p>
                      <p className="text-sm text-muted-foreground">{holding.grams} grams</p>
                    </div>
                    <Badge className="bg-primary">+{((holding.current - holding.invested) / holding.invested * 100).toFixed(1)}%</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Invested</p>
                      <p className="font-semibold">₹{holding.invested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current Value</p>
                      <p className="font-semibold text-primary">₹{holding.current.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Loans Holdings */}
            {activeAsset === "loans" && portfolioData.loans.holdings.map((holding, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow border-destructive/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{holding.name}</p>
                      <p className="text-sm text-muted-foreground">Collateral: {holding.collateral}</p>
                    </div>
                    <Badge variant="destructive">{holding.rate} p.a.</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Sanctioned</p>
                      <p className="font-semibold">₹{holding.sanctioned.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Outstanding</p>
                      <p className="font-semibold text-destructive">₹{holding.outstanding.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Repay Now</Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
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
                      <span className="text-sm font-medium">Mutual Funds</span>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-primary rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Fixed Deposits</span>
                      <span className="text-sm text-muted-foreground">28%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[28%] bg-secondary rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Baskets</span>
                      <span className="text-sm text-muted-foreground">13%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[13%] bg-accent rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Bonds</span>
                      <span className="text-sm text-muted-foreground">11%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[11%] bg-muted-foreground rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Gold & Silver</span>
                      <span className="text-sm text-muted-foreground">8%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[8%] bg-yellow-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Report Card */}
            <Card className="cursor-pointer hover:shadow-md" onClick={() => {}}>
              <CardContent className="pt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tax Report</p>
                    <p className="text-sm text-muted-foreground">Download your capital gains statement</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent transactions</p>
                  <Button variant="link" className="mt-2" onClick={() => navigate("/orders")}>
                    View all orders
                  </Button>
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
