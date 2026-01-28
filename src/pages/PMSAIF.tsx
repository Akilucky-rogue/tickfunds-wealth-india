import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Briefcase, TrendingUp, IndianRupee,
  CheckCircle2, AlertCircle, FileText, ChevronRight
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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

type OnboardingStep = "eligibility" | "details" | "documents" | "review";

const PMSAIF = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<OnboardingStep>("eligibility");
  const [productType, setProductType] = useState<"PMS" | "AIF" | "">("");
  const [netWorth, setNetWorth] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const pmsMinInvestment = 5000000; // 50 lakhs
  const aifMinInvestment = 10000000; // 1 crore

  const getProgress = () => {
    switch (step) {
      case "eligibility": return 25;
      case "details": return 50;
      case "documents": return 75;
      case "review": return 100;
    }
  };

  const isEligible = () => {
    const investment = Number(investmentAmount);
    if (productType === "PMS") return investment >= pmsMinInvestment;
    if (productType === "AIF") return investment >= aifMinInvestment;
    return false;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleNext = () => {
    if (step === "eligibility") {
      if (!productType || !investmentAmount) {
        toast({
          title: "Missing Information",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return;
      }
      if (!isEligible()) {
        toast({
          title: "Not Eligible",
          description: `Minimum investment for ${productType} is ${productType === "PMS" ? "₹50 lakhs" : "₹1 crore"}`,
          variant: "destructive",
        });
        return;
      }
      setStep("details");
    } else if (step === "details") {
      if (!netWorth || !annualIncome) {
        toast({
          title: "Missing Information",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep("documents");
    } else if (step === "documents") {
      setStep("review");
    } else if (step === "review") {
      if (!acceptedTerms) {
        toast({
          title: "Terms Required",
          description: "Please accept the terms and conditions",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Application Submitted",
        description: "Our team will contact you within 24 hours",
      });
      navigate("/account");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => step === "eligibility" ? navigate(-1) : setStep("eligibility")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">PMS & AIF</h1>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="capitalize">{step.replace("-", " ")}</span>
            <span>{getProgress()}%</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Info Cards */}
        {step === "eligibility" && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${productType === "PMS" ? "ring-2 ring-primary border-primary" : "hover:shadow-md"}`}
              onClick={() => setProductType("PMS")}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Portfolio Management Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Professional management of your equity portfolio with personalized strategies
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Investment</span>
                    <span className="font-medium">₹50 Lakhs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Typical Returns</span>
                    <span className="font-medium text-green-600">15-25% p.a.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${productType === "AIF" ? "ring-2 ring-primary border-primary" : "hover:shadow-md"}`}
              onClick={() => setProductType("AIF")}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Alternative Investment Fund</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Access to exclusive alternative investments and hedge fund strategies
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Investment</span>
                    <span className="font-medium">₹1 Crore</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Typical Returns</span>
                    <span className="font-medium text-green-600">18-30% p.a.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Eligibility Form */}
        {step === "eligibility" && (
          <Card>
            <CardHeader>
              <CardTitle>Investment Amount</CardTitle>
              <CardDescription>
                Enter your intended investment amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                {investmentAmount && (
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(Number(investmentAmount))}
                  </p>
                )}
              </div>

              {investmentAmount && productType && (
                <div className={`p-4 rounded-lg ${isEligible() ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : 'bg-red-50 dark:bg-red-950/20 border-red-200'} border`}>
                  <div className="flex items-center gap-2">
                    {isEligible() ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-medium">Eligible for {productType}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <span className="text-destructive font-medium">
                          Below minimum for {productType} ({productType === "PMS" ? "₹50L" : "₹1Cr"})
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Details Form */}
        {step === "details" && (
          <Card>
            <CardHeader>
              <CardTitle>Investor Details</CardTitle>
              <CardDescription>
                Required for SEBI compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Net Worth (₹)</Label>
                <Select value={netWorth} onValueChange={setNetWorth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select net worth range" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="1-5cr">₹1 Cr - ₹5 Cr</SelectItem>
                    <SelectItem value="5-10cr">₹5 Cr - ₹10 Cr</SelectItem>
                    <SelectItem value="10-25cr">₹10 Cr - ₹25 Cr</SelectItem>
                    <SelectItem value="25cr+">Above ₹25 Cr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Annual Income (₹)</Label>
                <Select value={annualIncome} onValueChange={setAnnualIncome}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="50l-1cr">₹50 Lakhs - ₹1 Cr</SelectItem>
                    <SelectItem value="1-2cr">₹1 Cr - ₹2 Cr</SelectItem>
                    <SelectItem value="2-5cr">₹2 Cr - ₹5 Cr</SelectItem>
                    <SelectItem value="5cr+">Above ₹5 Cr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Investment Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents */}
        {step === "documents" && (
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>
                Upload the following documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "PAN Card", required: true },
                { name: "Aadhaar Card", required: true },
                { name: "Latest Bank Statement (6 months)", required: true },
                { name: "Net Worth Certificate", required: true },
                { name: "ITR for last 3 years", required: true },
                { name: "Demat Account Statement", required: false },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      {doc.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              ))}
              
              <p className="text-sm text-muted-foreground">
                Documents will be verified by our compliance team
              </p>
            </CardContent>
          </Card>
        )}

        {/* Review */}
        {step === "review" && (
          <Card>
            <CardHeader>
              <CardTitle>Review Application</CardTitle>
              <CardDescription>
                Confirm your details before submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-medium">{productType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Investment Amount</span>
                  <span className="font-medium">{formatCurrency(Number(investmentAmount))}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Net Worth</span>
                  <span className="font-medium">{netWorth}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Annual Income</span>
                  <span className="font-medium">{annualIncome}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Checkbox 
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I confirm that the information provided is accurate and I understand that PMS/AIF investments are subject to market risks. I have read and accept the terms and conditions.
                </Label>
              </div>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" onClick={handleNext}>
          {step === "review" ? "Submit Application" : "Continue"}
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default PMSAIF;
