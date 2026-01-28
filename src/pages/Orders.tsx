import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Clock, CheckCircle2, XCircle, 
  ChevronRight, RefreshCw, Filter, Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Order {
  id: string;
  fundName: string;
  fundCategory: string;
  orderType: "SIP" | "Lumpsum" | "Redemption" | "Switch";
  amount: number;
  units?: number;
  nav?: number;
  status: "pending" | "executed" | "cancelled" | "processing";
  date: string;
  folioNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    fundName: "HDFC Flexi Cap Fund",
    fundCategory: "Equity - Flexi Cap",
    orderType: "SIP",
    amount: 5000,
    status: "pending",
    date: "2024-01-20",
  },
  {
    id: "ORD002",
    fundName: "ICICI Prudential Blue Chip Fund",
    fundCategory: "Equity - Large Cap",
    orderType: "Lumpsum",
    amount: 50000,
    units: 634.12,
    nav: 78.85,
    status: "executed",
    date: "2024-01-18",
    folioNumber: "12345678/90",
  },
  {
    id: "ORD003",
    fundName: "SBI Equity Hybrid Fund",
    fundCategory: "Hybrid",
    orderType: "SIP",
    amount: 10000,
    status: "processing",
    date: "2024-01-19",
  },
  {
    id: "ORD004",
    fundName: "Axis Long Term Equity Fund",
    fundCategory: "Equity - ELSS",
    orderType: "Redemption",
    amount: 25000,
    units: 312.45,
    nav: 80.02,
    status: "executed",
    date: "2024-01-15",
    folioNumber: "98765432/10",
  },
  {
    id: "ORD005",
    fundName: "Kotak Equity Opportunities Fund",
    fundCategory: "Equity - Multi Cap",
    orderType: "Lumpsum",
    amount: 100000,
    status: "cancelled",
    date: "2024-01-12",
  },
];

const Orders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const pendingOrders = mockOrders.filter(o => o.status === "pending" || o.status === "processing");
  const executedOrders = mockOrders.filter(o => o.status === "executed");
  const cancelledOrders = mockOrders.filter(o => o.status === "cancelled");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Processing</Badge>;
      case "executed":
        return <Badge className="bg-green-600">Executed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
    }
  };

  const getOrderTypeBadge = (type: Order["orderType"]) => {
    switch (type) {
      case "SIP":
        return <Badge variant="outline">SIP</Badge>;
      case "Lumpsum":
        return <Badge variant="outline">Lumpsum</Badge>;
      case "Redemption":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Redemption</Badge>;
      case "Switch":
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Switch</Badge>;
    }
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{order.fundName}</h3>
              {getOrderTypeBadge(order.orderType)}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{order.fundCategory}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Amount: </span>
                <span className="font-medium">{formatCurrency(order.amount)}</span>
              </div>
              {order.units && (
                <div>
                  <span className="text-muted-foreground">Units: </span>
                  <span className="font-medium">{order.units.toFixed(2)}</span>
                </div>
              )}
              {order.nav && (
                <div>
                  <span className="text-muted-foreground">NAV: </span>
                  <span className="font-medium">₹{order.nav.toFixed(2)}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Date: </span>
                <span className="font-medium">{new Date(order.date).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
            
            {order.folioNumber && (
              <p className="text-xs text-muted-foreground mt-2">
                Folio: {order.folioNumber}
              </p>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(order.status)}
            {(order.status === "pending" || order.status === "processing") && (
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-destructive">Cancel</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
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
            <h1 className="text-2xl font-bold">Orders</h1>
          </div>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto text-yellow-600 mb-2" />
              <p className="text-2xl font-bold">{pendingOrders.length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-6 w-6 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold">{executedOrders.length}</p>
              <p className="text-xs text-muted-foreground">Executed</p>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
            <CardContent className="p-4 text-center">
              <XCircle className="h-6 w-6 mx-auto text-destructive mb-2" />
              <p className="text-2xl font-bold">{cancelledOrders.length}</p>
              <p className="text-xs text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="executed">
              Executed ({executedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No pending orders</p>
                </CardContent>
              </Card>
            ) : (
              pendingOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="executed" className="space-y-4 mt-4">
            {executedOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No executed orders</p>
                </CardContent>
              </Card>
            ) : (
              executedOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4 mt-4">
            {cancelledOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <XCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No cancelled orders</p>
                </CardContent>
              </Card>
            ) : (
              cancelledOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Orders;
