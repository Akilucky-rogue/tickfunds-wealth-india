import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Calculator, Clock, Percent } from "lucide-react";
import { useState } from "react";

const Borrow = () => {
  const [loanAmount, setLoanAmount] = useState([500000]);
  const [tenure, setTenure] = useState([24]);

  const calculateEMI = () => {
    const principal = loanAmount[0];
    const rate = 12 / 12 / 100; // 12% annual rate
    const months = tenure[0];
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  const loanOptions = [
    {
      title: "Personal Loan",
      rate: "10.5% - 24%",
      tenure: "12-60 months",
      maxAmount: "₹25 Lakhs",
      icon: DollarSign
    },
    {
      title: "Loan Against Mutual Funds",
      rate: "9.5% - 12%",
      tenure: "12-36 months",
      maxAmount: "Up to 50% of portfolio",
      icon: Calculator
    },
    {
      title: "Gold Loan",
      rate: "7.5% - 12%",
      tenure: "6-36 months",
      maxAmount: "Up to 75% of gold value",
      icon: DollarSign
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Borrow</h1>
          <p className="text-muted-foreground">Get quick loans at competitive rates</p>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              EMI Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Loan Amount</label>
                <span className="text-sm font-bold">₹{loanAmount[0].toLocaleString('en-IN')}</span>
              </div>
              <Slider
                value={loanAmount}
                onValueChange={setLoanAmount}
                min={50000}
                max={2500000}
                step={50000}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Tenure (months)</label>
                <span className="text-sm font-bold">{tenure[0]} months</span>
              </div>
              <Slider
                value={tenure}
                onValueChange={setTenure}
                min={6}
                max={60}
                step={6}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated Monthly EMI</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{calculateEMI().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <Button className="w-full">Apply for Loan</Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-semibold mb-4">Loan Options</h2>
          <div className="space-y-4">
            {loanOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <option.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{option.title}</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Percent className="h-3 w-3" />
                        <span className="text-xs">Interest Rate</span>
                      </div>
                      <p className="text-sm font-semibold">{option.rate}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">Tenure</span>
                      </div>
                      <p className="text-sm font-semibold">{option.tenure}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        <span className="text-xs">Max Amount</span>
                      </div>
                      <p className="text-sm font-semibold">{option.maxAmount}</p>
                    </div>
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

export default Borrow;
