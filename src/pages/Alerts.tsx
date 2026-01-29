import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, AlertTriangle, TrendingUp, TrendingDown, Target, 
  DollarSign, Calendar, ArrowLeft, Plus, CheckCircle2,
  ArrowUpRight, ArrowDownLeft, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Alerts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Mock alerts data
  const systemAlerts = [
    { message: "Market holiday on Republic Day - 26th January", time: "1 day ago", type: "info" },
    { message: "New features available! Check out the Compare Funds tool", time: "3 days ago", type: "info" }
  ];

  const transactionAlerts = [
    { message: "SIP of ₹25,000 successfully invested in HDFC Top 100", time: "Today 10:30 AM", type: "success" },
    { message: "Redemption of ₹50,000 from SBI Small Cap processed", time: "Yesterday", type: "success" },
    { message: "Dividend of ₹2,450 credited from ICICI Prudential Fund", time: "2 days ago", type: "success" }
  ];

  const goalAlerts = [
    { message: "Emergency Fund goal is 85% complete! Add ₹75,000 more", time: "2 hours ago", type: "success" },
    { message: "Retirement goal needs ₹50,000 more this quarter to stay on track", time: "1 day ago", type: "warning" },
    { message: "Children's Education goal - consider increasing SIP by 10%", time: "5 days ago", type: "info" }
  ];

  const priceAlerts = [
    { fund: "HDFC Top 100 Fund", type: "above", target: 850, current: 847.25, triggered: false },
    { fund: "SBI Small Cap Fund", type: "below", target: 120, current: 118.50, triggered: true },
    { fund: "ICICI Prudential Value Discovery", type: "above", target: 500, current: 485.00, triggered: false }
  ];

  const maturityAlerts = [
    { asset: "Bajaj Finance FD", amount: 100000, maturityDate: "Mar 15, 2026", daysLeft: 410 },
    { asset: "NHAI Bond Interest", amount: 3750, maturityDate: "Feb 28, 2025", daysLeft: 30 },
    { asset: "REC Bond Coupon", amount: 2800, maturityDate: "Mar 31, 2025", daysLeft: 61 }
  ];

  const renderAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your investments</p>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Alert
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="all" className="text-xs py-2">All</TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs py-2">Transactions</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs py-2">Goals</TabsTrigger>
            <TabsTrigger value="price" className="text-xs py-2">Price</TabsTrigger>
            <TabsTrigger value="maturity" className="text-xs py-2">Maturity</TabsTrigger>
          </TabsList>

          {/* All Tab */}
          <TabsContent value="all" className="space-y-6">
            {/* System Alerts */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">System</h3>
              {systemAlerts.map((alert, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    {renderAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Transactions */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Recent Transactions</h3>
              {transactionAlerts.slice(0, 2).map((alert, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    {renderAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Goals Updates */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Goals</h3>
              {goalAlerts.slice(0, 2).map((alert, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 flex items-start gap-3">
                    {renderAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transaction Alerts Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card>
                <CardContent className="pt-4 text-center">
                  <ArrowDownLeft className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <p className="text-xs text-muted-foreground">Inflow</p>
                  <p className="font-bold text-green-600">₹27,450</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <ArrowUpRight className="h-5 w-5 mx-auto mb-1 text-destructive" />
                  <p className="text-xs text-muted-foreground">Outflow</p>
                  <p className="font-bold text-destructive">₹50,000</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <DollarSign className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Dividends</p>
                  <p className="font-bold text-primary">₹2,450</p>
                </CardContent>
              </Card>
            </div>

            {transactionAlerts.map((alert, index) => (
              <Card key={index}>
                <CardContent className="pt-4 flex items-start gap-3">
                  {renderAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Goal Alerts Tab */}
          <TabsContent value="goals" className="space-y-4">
            {goalAlerts.map((alert, index) => (
              <Card key={index} className={alert.type === 'success' ? 'border-green-500/30' : alert.type === 'warning' ? 'border-yellow-500/30' : ''}>
                <CardContent className="pt-4 flex items-start gap-3">
                  <Target className={`h-5 w-5 ${alert.type === 'success' ? 'text-green-600' : alert.type === 'warning' ? 'text-yellow-500' : 'text-primary'}`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Price Alerts Tab */}
          <TabsContent value="price" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Your price alerts</p>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            {priceAlerts.map((alert, index) => (
              <Card key={index} className={alert.triggered ? "border-primary" : ""}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{alert.fund}</p>
                      <p className="text-sm text-muted-foreground">
                        Alert when {alert.type === "above" ? "above" : "below"} ₹{alert.target}
                      </p>
                    </div>
                    {alert.triggered ? (
                      <Badge className="bg-primary">Triggered</Badge>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current NAV</span>
                    <span className="font-semibold">₹{alert.current}</span>
                  </div>
                  {alert.triggered && (
                    <Button className="w-full mt-3" size="sm">
                      Take Action
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Maturity Alerts Tab */}
          <TabsContent value="maturity" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Upcoming maturities</p>
            </div>

            {maturityAlerts.map((alert, index) => (
              <Card key={index} className={alert.daysLeft <= 30 ? "border-yellow-500/30" : ""}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{alert.asset}</p>
                      <p className="text-sm text-muted-foreground">Matures: {alert.maturityDate}</p>
                    </div>
                    <Badge variant={alert.daysLeft <= 30 ? "default" : "outline"} className={alert.daysLeft <= 30 ? "bg-yellow-500" : ""}>
                      {alert.daysLeft} days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="font-semibold text-primary">₹{alert.amount.toLocaleString('en-IN')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Mark All Read */}
        <div className="text-center">
          <Button variant="link" className="text-muted-foreground">
            Mark all as read
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Alerts;
