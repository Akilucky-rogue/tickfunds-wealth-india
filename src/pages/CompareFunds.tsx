import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Plus, X, TrendingUp, TrendingDown } from "lucide-react";
import { mockFunds, Fund } from "@/data/mockFunds";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const CompareFunds = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fundIds = searchParams.get("funds")?.split(",") || [];
    const funds = fundIds.map(id => mockFunds.find(f => f.id === id)).filter(Boolean) as Fund[];
    setSelectedFunds(funds);
  }, [searchParams]);

  const addFund = (fund: Fund) => {
    if (selectedFunds.length < 4 && !selectedFunds.find(f => f.id === fund.id)) {
      setSelectedFunds([...selectedFunds, fund]);
      setDialogOpen(false);
    }
  };

  const removeFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter(f => f.id !== fundId));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Very High": return "bg-red-100 text-red-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const comparisonRows = [
    { label: "Fund House", key: "fundHouse" },
    { label: "Category", key: "subCategory" },
    { label: "Risk Level", key: "riskLevel", isRisk: true },
    { label: "1Y Returns", key: "returns1Y", isReturns: true },
    { label: "3Y Returns", key: "returns3Y", isReturns: true },
    { label: "5Y Returns", key: "returns5Y", isReturns: true },
    { label: "NAV", key: "nav", isNav: true },
    { label: "AUM (Cr)", key: "aum", isAum: true },
    { label: "Expense Ratio", key: "expenseRatio", isExpense: true },
    { label: "Min Investment", key: "minInvestment", isMin: true },
    { label: "Rating", key: "rating", isRating: true },
  ];

  const getValue = (fund: Fund, row: typeof comparisonRows[0]) => {
    if (row.isReturns) {
      const period = row.key.replace("returns", "") as "1Y" | "3Y" | "5Y";
      const value = fund.returns[period];
      const isPositive = value >= 0;
      return (
        <span className={`font-semibold flex items-center justify-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {value}%
        </span>
      );
    }
    if (row.isRisk) {
      return <Badge className={getRiskColor(fund.riskLevel)}>{fund.riskLevel}</Badge>;
    }
    if (row.isNav) {
      return <span className="font-semibold">₹{fund.nav.toFixed(2)}</span>;
    }
    if (row.isAum) {
      return <span className="font-semibold">₹{fund.aum.toLocaleString('en-IN')}</span>;
    }
    if (row.isExpense) {
      return <span className="font-semibold">{fund.expenseRatio}%</span>;
    }
    if (row.isMin) {
      return <span className="font-semibold">₹{fund.minInvestment}</span>;
    }
    if (row.isRating) {
      return (
        <div className="flex justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < fund.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
            />
          ))}
        </div>
      );
    }
    return <span>{String(fund[row.key as keyof Fund])}</span>;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Compare Funds</h1>
          <div className="w-20" />
        </div>

        {/* Selected Funds Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {selectedFunds.map((fund) => (
            <Card key={fund.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => removeFund(fund.id)}
              >
                <X className="h-3 w-3" />
              </Button>
              <CardContent className="p-3 text-center">
                <div className="h-10 w-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-xs font-bold text-primary">{fund.fundHouse.substring(0, 3).toUpperCase()}</span>
                </div>
                <p className="text-xs font-medium line-clamp-2">{fund.name}</p>
              </CardContent>
            </Card>
          ))}
          
          {selectedFunds.length < 4 && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed">
                  <CardContent className="p-3 flex flex-col items-center justify-center h-full min-h-[100px]">
                    <Plus className="h-8 w-8 text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">Add Fund</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Select a Fund to Compare</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-80">
                  <div className="space-y-2">
                    {mockFunds
                      .filter(f => !selectedFunds.find(sf => sf.id === f.id))
                      .map((fund) => (
                        <Card 
                          key={fund.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => addFund(fund)}
                        >
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary">{fund.fundHouse.substring(0, 3).toUpperCase()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{fund.name}</p>
                              <p className="text-xs text-muted-foreground">{fund.subCategory} • {fund.returns["1Y"]}% 1Y</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Comparison Table */}
        {selectedFunds.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr key={row.key} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-3 text-sm font-medium text-muted-foreground whitespace-nowrap border-r">
                          {row.label}
                        </td>
                        {selectedFunds.map((fund) => (
                          <td key={fund.id} className="p-3 text-sm text-center min-w-[120px]">
                            {getValue(fund, row)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Holdings Comparison */}
        {selectedFunds.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedFunds.map((fund) => (
                  <div key={fund.id} className="space-y-2">
                    <p className="text-sm font-semibold text-center pb-2 border-b">{fund.fundHouse}</p>
                    {fund.holdings.slice(0, 5).map((holding, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="truncate flex-1">{holding.name}</span>
                        <span className="font-medium ml-2">{holding.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedFunds.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">No funds selected for comparison</p>
              <Button onClick={() => navigate("/invest")}>Browse Funds</Button>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default CompareFunds;
