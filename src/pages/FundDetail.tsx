import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, TrendingUp, Info, PieChart, BarChart3, FileText } from "lucide-react";
import { mockFunds } from "@/data/mockFunds";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";

const FundDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const fund = mockFunds.find(f => f.id === id);

  if (!fund) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Fund not found</h1>
          <Button onClick={() => navigate("/invest")}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Mock performance data
  const performanceData = [
    { month: "Jan", nav: fund.nav * 0.92 },
    { month: "Feb", nav: fund.nav * 0.94 },
    { month: "Mar", nav: fund.nav * 0.91 },
    { month: "Apr", nav: fund.nav * 0.96 },
    { month: "May", nav: fund.nav * 0.98 },
    { month: "Jun", nav: fund.nav * 0.95 },
    { month: "Jul", nav: fund.nav * 0.99 },
    { month: "Aug", nav: fund.nav * 1.02 },
    { month: "Sep", nav: fund.nav * 1.01 },
    { month: "Oct", nav: fund.nav * 0.98 },
    { month: "Nov", nav: fund.nav * 1.03 },
    { month: "Dec", nav: fund.nav }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Very High": return "bg-red-100 text-red-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Fund Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary">{fund.fundHouse.substring(0, 3).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">{fund.name}</h1>
                <p className="text-muted-foreground">{fund.fundHouse} Mutual Fund • {fund.subCategory}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className={getRiskColor(fund.riskLevel)}>
                    {fund.riskLevel} Risk
                  </Badge>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < fund.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">NAV</p>
                <p className="text-lg font-bold">₹{fund.nav.toFixed(2)}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">AUM</p>
                <p className="text-lg font-bold">₹{fund.aum.toLocaleString('en-IN')} Cr</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Expense Ratio</p>
                <p className="text-lg font-bold">{fund.expenseRatio}%</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Min SIP</p>
                <p className="text-lg font-bold">₹{fund.minInvestment}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Returns Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">1 Year</p>
                <p className={`text-2xl font-bold ${fund.returns["1Y"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns["1Y"]}%
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">3 Years</p>
                <p className={`text-2xl font-bold ${fund.returns["3Y"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns["3Y"]}%
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">5 Years</p>
                <p className={`text-2xl font-bold ${fund.returns["5Y"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns["5Y"]}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="performance" className="gap-1">
              <BarChart3 className="h-4 w-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="holdings" className="gap-1">
              <PieChart className="h-4 w-4" /> Holdings
            </TabsTrigger>
            <TabsTrigger value="details" className="gap-1">
              <FileText className="h-4 w-4" /> Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>NAV Performance (1 Year)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nav" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holdings">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {fund.holdings.slice(0, 5).map((holding, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{holding.name}</span>
                        <span className="font-semibold">{holding.percentage}%</span>
                      </div>
                      <Progress value={holding.percentage * 3} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={fund.sectorAllocation}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="percentage"
                          nameKey="sector"
                        >
                          {fund.sectorAllocation.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {fund.sectorAllocation.slice(0, 4).map((sector, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <span className="truncate">{sector.sector}: {sector.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fund House</p>
                    <p className="font-medium">{fund.fundHouse} Mutual Fund</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{fund.category} - {fund.subCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Category</p>
                    <p className="font-medium">{fund.riskLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Min Investment</p>
                    <p className="font-medium">₹{fund.minInvestment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Exit Load</p>
                    <p className="font-medium">1% if redeemed within 1 year</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lock-in Period</p>
                    <p className="font-medium">{fund.subCategory === "ELSS" ? "3 Years" : "None"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                  <Info className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-muted-foreground">
                    Past performance is not indicative of future returns. Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Investment Actions */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="container flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate(`/invest?compare=${fund.id}`)}>
              Add to Compare
            </Button>
            <Button className="flex-1">
              Invest Now
            </Button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default FundDetail;
