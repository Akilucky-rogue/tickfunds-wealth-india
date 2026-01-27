import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Wallet, 
  TrendingUp, 
  Calculator, 
  PieChart, 
  CheckCircle2,
  Info,
  IndianRupee
} from "lucide-react";

interface PortfolioHolding {
  name: string;
  value: number;
  type: "equity" | "debt" | "hybrid" | "gold";
  ltvRatio: number;
}

const BorrowingPower = () => {
  const navigate = useNavigate();
  
  // Mock portfolio data
  const [portfolioHoldings] = useState<PortfolioHolding[]>([
    { name: "Axis Bluechip Fund", value: 250000, type: "equity", ltvRatio: 0.5 },
    { name: "HDFC Flexi Cap Fund", value: 180000, type: "equity", ltvRatio: 0.5 },
    { name: "ICICI Pru Liquid Fund", value: 100000, type: "debt", ltvRatio: 0.8 },
    { name: "SBI Gold Fund", value: 75000, type: "gold", ltvRatio: 0.75 },
    { name: "HDFC Balanced Advantage", value: 120000, type: "hybrid", ltvRatio: 0.6 }
  ]);

  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI] = useState(15000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(40000);

  // Calculate portfolio-based borrowing power
  const calculatePortfolioBorrowingPower = () => {
    return portfolioHoldings.reduce((total, holding) => {
      return total + (holding.value * holding.ltvRatio);
    }, 0);
  };

  // Calculate income-based borrowing power (using FOIR - Fixed Obligations to Income Ratio)
  const calculateIncomeBorrowingPower = () => {
    const disposableIncome = monthlyIncome - existingEMI - monthlyExpenses;
    const maxEMI = disposableIncome * 0.5; // 50% of disposable income
    
    // Assuming 10% interest rate, 5 year tenure
    const rate = 10 / 12 / 100;
    const months = 60;
    const maxLoan = maxEMI * ((Math.pow(1 + rate, months) - 1) / (rate * Math.pow(1 + rate, months)));
    
    return Math.max(0, maxLoan);
  };

  const portfolioBorrowingPower = calculatePortfolioBorrowingPower();
  const incomeBorrowingPower = calculateIncomeBorrowingPower();
  const totalBorrowingPower = portfolioBorrowingPower + incomeBorrowingPower;
  const totalPortfolioValue = portfolioHoldings.reduce((sum, h) => sum + h.value, 0);

  const foirRatio = ((existingEMI / monthlyIncome) * 100).toFixed(1);
  const disposableIncome = monthlyIncome - existingEMI - monthlyExpenses;
  const savingsRate = ((disposableIncome / monthlyIncome) * 100).toFixed(1);

  const typeColors: Record<string, string> = {
    equity: "hsl(var(--chart-1))",
    debt: "hsl(var(--chart-2))",
    hybrid: "hsl(var(--chart-3))",
    gold: "hsl(var(--chart-4))"
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Borrowing Power</h1>
            <p className="text-muted-foreground text-sm">See how much you can borrow</p>
          </div>
        </div>

        {/* Total Borrowing Power Summary */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Total Borrowing Power</p>
              <p className="text-4xl font-bold text-primary">
                ₹{totalBorrowingPower.toLocaleString('en-IN')}
              </p>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Portfolio Based</p>
                  <p className="font-semibold">₹{portfolioBorrowingPower.toLocaleString('en-IN')}</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-muted-foreground">Income Based</p>
                  <p className="font-semibold">₹{incomeBorrowingPower.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="portfolio" className="flex-1 gap-2">
              <PieChart className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="income" className="flex-1 gap-2">
              <Wallet className="h-4 w-4" />
              Income
            </TabsTrigger>
            <TabsTrigger value="combined" className="flex-1 gap-2">
              <Calculator className="h-4 w-4" />
              Combined
            </TabsTrigger>
          </TabsList>

          {/* Portfolio-Based Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Loan Against Mutual Funds
                </CardTitle>
                <CardDescription>
                  Borrow against your mutual fund holdings without selling them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                    <p className="text-xl font-bold">₹{totalPortfolioValue.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Available Credit</p>
                    <p className="text-xl font-bold text-primary">₹{portfolioBorrowingPower.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Holdings & LTV Ratio</p>
                  {portfolioHoldings.map((holding, idx) => {
                    const loanValue = holding.value * holding.ltvRatio;
                    return (
                      <div key={idx} className="p-3 border rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{holding.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div 
                                className="h-2 w-2 rounded-full" 
                                style={{ backgroundColor: typeColors[holding.type] }}
                              />
                              <span className="text-xs text-muted-foreground capitalize">{holding.type}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">₹{holding.value.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-muted-foreground">LTV: {(holding.ltvRatio * 100)}%</p>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Loan Available</span>
                          <span className="font-semibold text-primary">₹{loanValue.toLocaleString('en-IN')}</span>
                        </div>
                        <Progress value={holding.ltvRatio * 100} className="h-1" />
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-muted-foreground">
                    LTV (Loan-to-Value) ratio varies by fund type. Equity funds: 50%, Debt funds: 80%, Hybrid: 60%, Gold: 75%
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Income-Based Tab */}
          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Income-Based Eligibility
                </CardTitle>
                <CardDescription>
                  Calculate your loan eligibility based on your income and expenses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Monthly Net Income</Label>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      />
                    </div>
                    <Slider
                      value={[monthlyIncome]}
                      onValueChange={(v) => setMonthlyIncome(v[0])}
                      min={25000}
                      max={500000}
                      step={5000}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Existing EMIs</Label>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={existingEMI}
                        onChange={(e) => setExistingEMI(Number(e.target.value))}
                      />
                    </div>
                    <Slider
                      value={[existingEMI]}
                      onValueChange={(v) => setExistingEMI(v[0])}
                      min={0}
                      max={monthlyIncome * 0.5}
                      step={1000}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Monthly Expenses</Label>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      />
                    </div>
                    <Slider
                      value={[monthlyExpenses]}
                      onValueChange={(v) => setMonthlyExpenses(v[0])}
                      min={10000}
                      max={monthlyIncome * 0.7}
                      step={5000}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">FOIR</p>
                    <p className={`text-xl font-bold ${Number(foirRatio) > 50 ? 'text-destructive' : 'text-primary'}`}>
                      {foirRatio}%
                    </p>
                    <p className="text-xs text-muted-foreground">of income</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">Savings Rate</p>
                    <p className={`text-xl font-bold ${Number(savingsRate) < 20 ? 'text-destructive' : 'text-primary'}`}>
                      {savingsRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">of income</p>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                  <p className="text-muted-foreground mb-1">Income-Based Loan Eligibility</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{Math.round(incomeBorrowingPower).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">@ 10% interest, 5 year tenure</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Eligibility Factors</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${Number(foirRatio) <= 50 ? 'text-green-600' : 'text-red-600'}`} />
                      <span>FOIR should be below 50%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${disposableIncome > 0 ? 'text-green-600' : 'text-red-600'}`} />
                      <span>Positive disposable income</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${Number(savingsRate) >= 20 ? 'text-green-600' : 'text-yellow-600'}`} />
                      <span>Healthy savings rate (20%+)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Combined Tab */}
          <TabsContent value="combined" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Combined Borrowing Power
                </CardTitle>
                <CardDescription>
                  Your total borrowing capacity from all sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Portfolio-Based Credit</span>
                      <span className="font-bold">₹{portfolioBorrowingPower.toLocaleString('en-IN')}</span>
                    </div>
                    <Progress value={(portfolioBorrowingPower / totalBorrowingPower) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {((portfolioBorrowingPower / totalBorrowingPower) * 100).toFixed(1)}% of total
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Income-Based Credit</span>
                      <span className="font-bold">₹{Math.round(incomeBorrowingPower).toLocaleString('en-IN')}</span>
                    </div>
                    <Progress value={(incomeBorrowingPower / totalBorrowingPower) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {((incomeBorrowingPower / totalBorrowingPower) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl text-center">
                  <p className="text-muted-foreground mb-2">Total Available Credit</p>
                  <p className="text-4xl font-bold text-primary">
                    ₹{Math.round(totalBorrowingPower).toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => navigate("/borrow")}>
                    View Loan Options
                  </Button>
                  <Button>
                    Apply for Loan
                  </Button>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    Actual loan approval depends on credit score, documentation, and lender's policies. This is an indicative calculation only.
                  </p>
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

export default BorrowingPower;
