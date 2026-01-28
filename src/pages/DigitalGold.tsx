import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, TrendingUp, TrendingDown, Wallet,
  ArrowUpDown, RefreshCw, History, Coins
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MetalHolding {
  metal: "gold" | "silver";
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

const mockHoldings: MetalHolding[] = [
  {
    metal: "gold",
    quantity: 15.5,
    avgBuyPrice: 6150,
    currentPrice: 6380,
    value: 98890,
    pnl: 3565,
    pnlPercent: 3.74,
  },
  {
    metal: "silver",
    quantity: 250,
    avgBuyPrice: 74.5,
    currentPrice: 78.2,
    value: 19550,
    pnl: 925,
    pnlPercent: 4.97,
  },
];

const mockTransactions = [
  { id: "1", type: "buy", metal: "gold", quantity: 5, price: 6280, date: "2024-01-18", status: "completed" },
  { id: "2", type: "sell", metal: "silver", quantity: 50, price: 77.5, date: "2024-01-15", status: "completed" },
  { id: "3", type: "buy", metal: "gold", quantity: 2.5, price: 6350, date: "2024-01-10", status: "completed" },
  { id: "4", type: "lease", metal: "gold", quantity: 3, rate: 2.5, date: "2024-01-05", status: "active" },
];

const DigitalGold = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("transact");
  const [transactType, setTransactType] = useState<"buy" | "sell">("buy");
  const [metal, setMetal] = useState<"gold" | "silver">("gold");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inputMode, setInputMode] = useState<"amount" | "quantity">("amount");

  const goldPrice = 6380; // per gram
  const silverPrice = 78.2; // per gram

  const currentPrice = metal === "gold" ? goldPrice : silverPrice;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && !isNaN(Number(value))) {
      setQuantity((Number(value) / currentPrice).toFixed(4));
    } else {
      setQuantity("");
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    if (value && !isNaN(Number(value))) {
      setAmount((Number(value) * currentPrice).toFixed(2));
    } else {
      setAmount("");
    }
  };

  const handleTransaction = () => {
    if (!amount || !quantity) {
      toast({
        title: "Invalid Input",
        description: "Please enter amount or quantity",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: `${transactType === "buy" ? "Purchase" : "Sale"} Initiated`,
      description: `${transactType === "buy" ? "Buying" : "Selling"} ${quantity}g of ${metal} for ${formatCurrency(Number(amount))}`,
    });
    setAmount("");
    setQuantity("");
  };

  const totalValue = mockHoldings.reduce((sum, h) => sum + h.value, 0);
  const totalPnl = mockHoldings.reduce((sum, h) => sum + h.pnl, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Digital Gold & Silver</h1>
        </div>

        {/* Live Prices */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-950 dark:to-yellow-900/50 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                  <Coins className="h-4 w-4 text-yellow-900" />
                </div>
                <span className="font-medium">Gold</span>
              </div>
              <p className="text-2xl font-bold">₹{goldPrice.toFixed(2)}/g</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1.2% today
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900/50 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                  <Coins className="h-4 w-4 text-gray-700" />
                </div>
                <span className="font-medium">Silver</span>
              </div>
              <p className="text-2xl font-bold">₹{silverPrice.toFixed(2)}/g</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8% today
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transact">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Transact
            </TabsTrigger>
            <TabsTrigger value="holdings">
              <Wallet className="h-4 w-4 mr-2" />
              Holdings
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transact" className="space-y-4 mt-4">
            {/* Buy/Sell Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={transactType === "buy" ? "default" : "outline"}
                onClick={() => setTransactType("buy")}
                className="w-full"
              >
                Buy
              </Button>
              <Button
                variant={transactType === "sell" ? "default" : "outline"}
                onClick={() => setTransactType("sell")}
                className="w-full"
              >
                Sell
              </Button>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Metal Selection */}
                <div className="space-y-2">
                  <Label>Select Metal</Label>
                  <Select value={metal} onValueChange={(v) => setMetal(v as "gold" | "silver")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="gold">Gold (24K)</SelectItem>
                      <SelectItem value="silver">Silver (999)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount/Quantity Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Enter {inputMode === "amount" ? "Amount" : "Quantity"}</Label>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setInputMode(inputMode === "amount" ? "quantity" : "amount")}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Switch to {inputMode === "amount" ? "grams" : "rupees"}
                    </Button>
                  </div>
                  
                  {inputMode === "amount" ? (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        className="pl-8"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        placeholder="Enter quantity in grams"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">g</span>
                    </div>
                  )}
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {[500, 1000, 2000, 5000].map(amt => (
                    <Button 
                      key={amt} 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAmountChange(amt.toString())}
                    >
                      ₹{amt}
                    </Button>
                  ))}
                </div>

                {/* Summary */}
                {amount && quantity && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium">{quantity}g {metal}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Price per gram</span>
                        <span className="font-medium">{formatCurrency(currentPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>{formatCurrency(Number(amount))}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button className="w-full" onClick={handleTransaction}>
                  {transactType === "buy" ? "Buy Now" : "Sell Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Lease Option */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Lease Your Gold</h3>
                    <p className="text-sm text-muted-foreground">Earn up to 3% p.a. on your gold</p>
                  </div>
                  <Button variant="outline">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holdings" className="space-y-4 mt-4">
            {/* Portfolio Summary */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Holdings</p>
                <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
                <p className={`text-sm flex items-center ${totalPnl >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {totalPnl >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {formatCurrency(totalPnl)} ({((totalPnl / (totalValue - totalPnl)) * 100).toFixed(2)}%)
                </p>
              </CardContent>
            </Card>

            {/* Holdings List */}
            {mockHoldings.map((holding) => (
              <Card key={holding.metal}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${holding.metal === 'gold' ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                      <Coins className={`h-5 w-5 ${holding.metal === 'gold' ? 'text-yellow-900' : 'text-gray-700'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold capitalize">{holding.metal}</h3>
                      <p className="text-sm text-muted-foreground">{holding.quantity}g</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(holding.value)}</p>
                      <p className={`text-sm flex items-center justify-end ${holding.pnl >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                        {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)} ({holding.pnlPercent}%)
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm pt-3 border-t">
                    <div>
                      <span className="text-muted-foreground">Avg Buy Price</span>
                      <p className="font-medium">{formatCurrency(holding.avgBuyPrice)}/g</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Price</span>
                      <p className="font-medium">{formatCurrency(holding.currentPrice)}/g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-4">
            {mockTransactions.map((tx) => (
              <Card key={tx.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === 'buy' ? 'bg-green-100 dark:bg-green-900' : tx.type === 'sell' ? 'bg-red-100 dark:bg-red-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                        {tx.type === 'buy' && <TrendingUp className="h-5 w-5 text-green-600" />}
                        {tx.type === 'sell' && <TrendingDown className="h-5 w-5 text-destructive" />}
                        {tx.type === 'lease' && <RefreshCw className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{tx.type} {tx.metal}</p>
                        <p className="text-sm text-muted-foreground">{tx.quantity}g @ ₹{tx.price || tx.rate}/g</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(tx.quantity * (tx.price || 0))}</p>
                      <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString('en-IN')}</p>
                    </div>
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

export default DigitalGold;
