import { useState } from "react";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, TrendingDown, Plus, Target, Bell, 
  AlertTriangle, CheckCircle2, DollarSign, Calendar,
  ArrowUpRight, ArrowDownLeft, Users, User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  const [contextMode, setContextMode] = useState<"self" | "family">("self");

  // Mock portfolio data
  const portfolioData = {
    self: {
      totalValue: 482500,
      invested: 415000,
      returns: 67500,
      returnsPercent: 16.27,
      mutualFunds: { current: 350000, invested: 305000 },
      fd: { current: 85000, invested: 80000 },
      bonds: { current: 32500, invested: 30000 },
      gold: { current: 15000, invested: 12000 }
    },
    family: {
      totalValue: 1250000,
      invested: 1050000,
      returns: 200000,
      returnsPercent: 19.05,
      mutualFunds: { current: 850000, invested: 720000 },
      fd: { current: 250000, invested: 230000 },
      bonds: { current: 100000, invested: 85000 },
      gold: { current: 50000, invested: 40000 }
    }
  };

  // Mock risk profile data
  const riskProfileData = {
    self: { profile: "Moderate", score: 62, allocation: { equity: 60, debt: 30, others: 10 } },
    family: [
      { name: "Bhavesh Vora", profile: "Moderate", score: 62 },
      { name: "Priya Vora", profile: "Conservative", score: 38 },
      { name: "Rohan Vora", profile: "Aggressive", score: 85 }
    ]
  };

  // Mock goals data
  const goalsData = {
    self: [
      { name: "Retirement", target: 10000000, current: 3500000, deadline: "2045", progress: 35 },
      { name: "Emergency Fund", target: 500000, current: 425000, deadline: "2025", progress: 85 },
      { name: "Car Purchase", target: 1500000, current: 450000, deadline: "2027", progress: 30 }
    ],
    family: [
      { name: "Children's Education", target: 5000000, current: 1800000, deadline: "2032", progress: 36 },
      { name: "Family Vacation", target: 300000, current: 180000, deadline: "2025", progress: 60 },
      { name: "Home Renovation", target: 1000000, current: 550000, deadline: "2026", progress: 55 }
    ]
  };

  // Mock alerts data
  const alertsData = {
    priceAlerts: [
      { fund: "HDFC Top 100 Fund", type: "above", target: 850, current: 847.25, triggered: false },
      { fund: "SBI Small Cap Fund", type: "below", target: 120, current: 118.50, triggered: true }
    ],
    valueAlerts: [
      { portfolio: "Equity", type: "drop", threshold: "5%", triggered: false },
      { portfolio: "Gold", type: "gain", threshold: "10%", triggered: true }
    ]
  };

  // Mock notifications data
  const notificationsData = {
    goals: [
      { message: "Emergency Fund is 85% complete!", time: "2 hours ago", type: "success" },
      { message: "Retirement goal needs ₹50K more this quarter", time: "1 day ago", type: "warning" }
    ],
    inflow: [
      { message: "SIP of ₹25,000 successfully invested", time: "Today 10:30 AM", type: "success" },
      { message: "Dividend of ₹2,450 received from ICICI Prudential", time: "Yesterday", type: "success" }
    ],
    outflow: [
      { message: "Redemption of ₹50,000 processed", time: "3 days ago", type: "info" }
    ],
    maturity: [
      { message: "FD of ₹1,00,000 maturing in 15 days", time: "Reminder", type: "warning" },
      { message: "Bond interest payment due in 7 days", time: "Upcoming", type: "info" }
    ]
  };

  const data = portfolioData[contextMode];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Context Toggle: Self / Family */}
        <div className="flex gap-2">
          <Button 
            variant={contextMode === "self" ? "default" : "outline"} 
            size="sm"
            onClick={() => setContextMode("self")}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Self
          </Button>
          <Button 
            variant={contextMode === "family" ? "default" : "outline"} 
            size="sm"
            onClick={() => setContextMode("family")}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Family
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="notifications">Notify</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            {/* Portfolio Overview Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {contextMode === "self" ? "Self" : "Family"}
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-2">₹{data.totalValue.toLocaleString('en-IN')}</p>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-sm font-semibold ${data.returns >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {data.returns >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    ₹{Math.abs(data.returns).toLocaleString('en-IN')} ({data.returnsPercent}%)
                  </span>
                  <span className="text-muted-foreground text-sm">• All time</span>
                </div>
              </CardContent>
            </Card>

            {/* Asset Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/portfolio")}>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Mutual Funds</p>
                  <p className="text-xl font-bold">₹{data.mutualFunds.current.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-primary">+{((data.mutualFunds.current - data.mutualFunds.invested) / data.mutualFunds.invested * 100).toFixed(1)}%</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/fd")}>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Fixed Deposits</p>
                  <p className="text-xl font-bold">₹{data.fd.current.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-primary">+{((data.fd.current - data.fd.invested) / data.fd.invested * 100).toFixed(1)}%</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/bonds")}>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Bonds</p>
                  <p className="text-xl font-bold">₹{data.bonds.current.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-primary">+{((data.bonds.current - data.bonds.invested) / data.bonds.invested * 100).toFixed(1)}%</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/gold")}>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Digital Gold</p>
                  <p className="text-xl font-bold">₹{data.gold.current.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-primary">+{((data.gold.current - data.gold.invested) / data.gold.invested * 100).toFixed(1)}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto flex-col py-4 gap-2" onClick={() => navigate("/invest")}>
                  <Plus className="h-5 w-5" />
                  <span className="text-xs">Invest</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 gap-2" onClick={() => navigate("/portfolio")}>
                  <Target className="h-5 w-5" />
                  <span className="text-xs">Portfolio</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 gap-2" onClick={() => navigate("/orders")}>
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Orders</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 gap-2" onClick={() => navigate("/borrow")}>
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xs">Borrow</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Profile Tab */}
          <TabsContent value="risk" className="space-y-6">
            {contextMode === "self" ? (
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate("/risk-profile")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Your Risk Profile</CardTitle>
                    <Badge variant="outline">{riskProfileData.self.profile}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Risk Score</span>
                      <span className="font-semibold">{riskProfileData.self.score}/100</span>
                    </div>
                    <Progress value={riskProfileData.self.score} className="h-3" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommended Allocation</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <p className="text-lg font-bold text-primary">{riskProfileData.self.allocation.equity}%</p>
                        <p className="text-xs text-muted-foreground">Equity</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-lg font-bold">{riskProfileData.self.allocation.debt}%</p>
                        <p className="text-xs text-muted-foreground">Debt</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-lg font-bold">{riskProfileData.self.allocation.others}%</p>
                        <p className="text-xs text-muted-foreground">Others</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Retake Assessment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Family Risk Profiles</h2>
                {riskProfileData.family.map((member, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.profile}</p>
                        </div>
                        <Badge variant="outline">{member.score}/100</Badge>
                      </div>
                      <Progress value={member.score} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate("/family")}>
                  Manage Family Members
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {contextMode === "self" ? "Your Goals" : "Family Goals"}
              </h2>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </div>
            
            <div className="space-y-4">
              {goalsData[contextMode].map((goal, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{goal.name}</p>
                        <p className="text-sm text-muted-foreground">Target: {goal.deadline}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{goal.current.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-muted-foreground">of ₹{goal.target.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Price & Value Alerts</h2>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Alert
              </Button>
            </div>

            {/* Price Alerts */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Price Alerts</h3>
              {alertsData.priceAlerts.map((alert, index) => (
                <Card key={index} className={alert.triggered ? "border-primary" : ""}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{alert.fund}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.type === "above" ? "Above" : "Below"} ₹{alert.target}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{alert.current}</p>
                        {alert.triggered ? (
                          <Badge className="bg-primary">Triggered</Badge>
                        ) : (
                          <Badge variant="outline">Active</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Value Alerts */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Value Alerts</h3>
              {alertsData.valueAlerts.map((alert, index) => (
                <Card key={index} className={alert.triggered ? "border-primary" : ""}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{alert.portfolio} Portfolio</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.type === "drop" ? "Drop" : "Gain"} of {alert.threshold}
                        </p>
                      </div>
                      <div>
                        {alert.triggered ? (
                          <Badge className="bg-primary">Triggered</Badge>
                        ) : (
                          <Badge variant="outline">Monitoring</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Goals Notifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goals
              </h3>
              {notificationsData.goals.map((notif, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    {notif.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Inflow Notifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <ArrowDownLeft className="h-4 w-4" />
                Inflow
              </h3>
              {notificationsData.inflow.map((notif, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Outflow Notifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Outflow
              </h3>
              {notificationsData.outflow.map((notif, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Maturity Notifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Maturity
              </h3>
              {notificationsData.maturity.map((notif, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
