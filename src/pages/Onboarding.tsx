import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  CreditCard, 
  Building2, 
  FileCheck, 
  Shield,
  Upload,
  AlertCircle,
  Loader2
} from "lucide-react";

type OnboardingStep = "welcome" | "personal" | "pan" | "aadhaar" | "bank" | "nominee" | "verification" | "complete";

interface PersonalDetails {
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  occupation: string;
  annualIncome: string;
}

interface PANDetails {
  panNumber: string;
  panName: string;
  panVerified: boolean;
}

interface AadhaarDetails {
  aadhaarNumber: string;
  aadhaarVerified: boolean;
}

interface BankDetails {
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
}

interface NomineeDetails {
  nomineeName: string;
  nomineeRelation: string;
  nomineeShare: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [isLoading, setIsLoading] = useState(false);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    occupation: "",
    annualIncome: ""
  });

  const [panDetails, setPanDetails] = useState<PANDetails>({
    panNumber: "",
    panName: "",
    panVerified: false
  });

  const [aadhaarDetails, setAadhaarDetails] = useState<AadhaarDetails>({
    aadhaarNumber: "",
    aadhaarVerified: false
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: ""
  });

  const [nomineeDetails, setNomineeDetails] = useState<NomineeDetails>({
    nomineeName: "",
    nomineeRelation: "",
    nomineeShare: "100"
  });

  const steps: { id: OnboardingStep; label: string; icon: React.ReactNode }[] = [
    { id: "welcome", label: "Welcome", icon: <User className="h-4 w-4" /> },
    { id: "personal", label: "Personal", icon: <User className="h-4 w-4" /> },
    { id: "pan", label: "PAN", icon: <CreditCard className="h-4 w-4" /> },
    { id: "aadhaar", label: "Aadhaar", icon: <FileCheck className="h-4 w-4" /> },
    { id: "bank", label: "Bank", icon: <Building2 className="h-4 w-4" /> },
    { id: "nominee", label: "Nominee", icon: <User className="h-4 w-4" /> },
    { id: "verification", label: "Verify", icon: <Shield className="h-4 w-4" /> },
    { id: "complete", label: "Complete", icon: <CheckCircle2 className="h-4 w-4" /> }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100;

  const verifyPAN = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPanDetails(prev => ({ ...prev, panName: personalDetails.fullName.toUpperCase(), panVerified: true }));
      setIsLoading(false);
    }, 1500);
  };

  const verifyAadhaar = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAadhaarDetails(prev => ({ ...prev, aadhaarVerified: true }));
      setIsLoading(false);
    }, 1500);
  };

  const verifyIFSC = () => {
    setIsLoading(true);
    setTimeout(() => {
      setBankDetails(prev => ({ ...prev, bankName: "HDFC Bank", branchName: "Mumbai Main Branch" }));
      setIsLoading(false);
    }, 1000);
  };

  const goNext = () => {
    const idx = steps.findIndex(s => s.id === currentStep);
    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1].id);
    }
  };

  const goBack = () => {
    const idx = steps.findIndex(s => s.id === currentStep);
    if (idx > 0) {
      setCurrentStep(steps[idx - 1].id);
    }
  };

  const annualIncomeOptions = [
    "Below ₹1 Lakh",
    "₹1 Lakh - ₹5 Lakhs",
    "₹5 Lakhs - ₹10 Lakhs",
    "₹10 Lakhs - ₹25 Lakhs",
    "₹25 Lakhs - ₹1 Crore",
    "Above ₹1 Crore"
  ];

  const occupationOptions = [
    "Salaried - Private",
    "Salaried - Government",
    "Self Employed - Business",
    "Self Employed - Professional",
    "Retired",
    "Student",
    "Homemaker",
    "Others"
  ];

  const relationOptions = [
    "Spouse",
    "Son",
    "Daughter",
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Others"
  ];

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return (
          <div className="text-center space-y-6 py-8">
            <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Tickfunds</h2>
              <p className="text-muted-foreground">Complete your KYC to start investing in mutual funds. This process takes about 5 minutes.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>100% Digital</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>SEBI Registered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Instant Verification</span>
              </div>
            </div>
            <Button onClick={goNext} className="gap-2">
              Start KYC <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        );

      case "personal":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name (as per PAN)</Label>
                <Input 
                  placeholder="Enter your full name"
                  value={personalDetails.fullName}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input 
                  type="email"
                  placeholder="your@email.com"
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input 
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={personalDetails.mobile}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, mobile: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input 
                  type="date"
                  value={personalDetails.dob}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, dob: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="flex gap-2">
                  {["Male", "Female", "Other"].map(g => (
                    <Button
                      key={g}
                      variant={personalDetails.gender === g ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPersonalDetails(prev => ({ ...prev, gender: g }))}
                    >
                      {g}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Occupation</Label>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={personalDetails.occupation}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, occupation: e.target.value }))}
                >
                  <option value="">Select occupation</option>
                  {occupationOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Annual Income</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {annualIncomeOptions.map(income => (
                    <Button
                      key={income}
                      variant={personalDetails.annualIncome === income ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setPersonalDetails(prev => ({ ...prev, annualIncome: income }))}
                    >
                      {income}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "pan":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>PAN Number</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="ABCDE1234F"
                  className="uppercase"
                  maxLength={10}
                  value={panDetails.panNumber}
                  onChange={(e) => setPanDetails(prev => ({ ...prev, panNumber: e.target.value.toUpperCase(), panVerified: false }))}
                />
                <Button 
                  onClick={verifyPAN} 
                  disabled={panDetails.panNumber.length !== 10 || isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                </Button>
              </div>
              {panDetails.panVerified && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>PAN Verified: {panDetails.panName}</span>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <p className="text-sm font-medium">Why do we need your PAN?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PAN is mandatory for all mutual fund investments as per SEBI</li>
                <li>• It helps in tax compliance and reporting</li>
                <li>• Required for KYC verification</li>
              </ul>
            </div>
          </div>
        );

      case "aadhaar":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Aadhaar Number</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                  value={aadhaarDetails.aadhaarNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setAadhaarDetails(prev => ({ ...prev, aadhaarNumber: formatted, aadhaarVerified: false }));
                  }}
                />
                <Button 
                  onClick={verifyAadhaar} 
                  disabled={aadhaarDetails.aadhaarNumber.replace(/\s/g, '').length !== 12 || isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                </Button>
              </div>
              {aadhaarDetails.aadhaarVerified && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Aadhaar Verified Successfully</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <p className="text-sm font-medium">Aadhaar Verification Process</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• An OTP will be sent to your Aadhaar-linked mobile</li>
                <li>• Your address will be fetched from Aadhaar</li>
                <li>• This is a one-time verification</li>
              </ul>
            </div>
          </div>
        );

      case "bank":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bank Account Number</Label>
              <Input 
                placeholder="Enter account number"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm Account Number</Label>
              <Input 
                placeholder="Re-enter account number"
                value={bankDetails.confirmAccountNumber}
                onChange={(e) => setBankDetails(prev => ({ ...prev, confirmAccountNumber: e.target.value }))}
              />
              {bankDetails.accountNumber && bankDetails.confirmAccountNumber && 
                bankDetails.accountNumber !== bankDetails.confirmAccountNumber && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Account numbers do not match</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>IFSC Code</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="HDFC0001234"
                  className="uppercase"
                  maxLength={11}
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails(prev => ({ 
                    ...prev, 
                    ifscCode: e.target.value.toUpperCase(),
                    bankName: "",
                    branchName: ""
                  }))}
                />
                <Button 
                  onClick={verifyIFSC} 
                  disabled={bankDetails.ifscCode.length !== 11 || isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                </Button>
              </div>
            </div>
            {bankDetails.bankName && (
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">{bankDetails.bankName}</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 ml-6">{bankDetails.branchName}</p>
              </div>
            )}
          </div>
        );

      case "nominee":
        return (
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <p className="text-muted-foreground">Adding a nominee ensures your investments are transferred to your loved ones in case of any unfortunate event.</p>
            </div>
            <div className="space-y-2">
              <Label>Nominee Full Name</Label>
              <Input 
                placeholder="Enter nominee's name"
                value={nomineeDetails.nomineeName}
                onChange={(e) => setNomineeDetails(prev => ({ ...prev, nomineeName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Relationship with Nominee</Label>
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={nomineeDetails.nomineeRelation}
                onChange={(e) => setNomineeDetails(prev => ({ ...prev, nomineeRelation: e.target.value }))}
              >
                <option value="">Select relationship</option>
                {relationOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Share Percentage</Label>
              <Input 
                type="number"
                min="1"
                max="100"
                value={nomineeDetails.nomineeShare}
                onChange={(e) => setNomineeDetails(prev => ({ ...prev, nomineeShare: e.target.value }))}
              />
            </div>
          </div>
        );

      case "verification":
        return (
          <div className="space-y-6">
            <div className="text-center py-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verifying Your Details</h3>
              <p className="text-sm text-muted-foreground">Please wait while we verify your information...</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">PAN Verification</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Aadhaar Verification</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Bank Account</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">KYC Status</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Processing</Badge>
              </div>
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center py-8 space-y-6">
            <div className="h-20 w-20 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">KYC Completed!</h2>
              <p className="text-muted-foreground">Your account is now ready. Start investing in mutual funds today.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">₹100</p>
                <p className="text-xs text-muted-foreground">Min SIP Amount</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">2000+</p>
                <p className="text-xs text-muted-foreground">Funds Available</p>
              </Card>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/risk-profile")}>
                Complete Risk Profile
              </Button>
              <Button onClick={() => navigate("/invest")}>
                Start Investing
              </Button>
            </div>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "personal":
        return personalDetails.fullName && personalDetails.email && personalDetails.mobile && personalDetails.dob && personalDetails.gender && personalDetails.occupation && personalDetails.annualIncome;
      case "pan":
        return panDetails.panVerified;
      case "aadhaar":
        return aadhaarDetails.aadhaarVerified;
      case "bank":
        return bankDetails.accountNumber && bankDetails.accountNumber === bankDetails.confirmAccountNumber && bankDetails.bankName;
      case "nominee":
        return nomineeDetails.nomineeName && nomineeDetails.nomineeRelation;
      case "verification":
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Complete Your KYC</CardTitle>
            <Badge variant="outline">{currentStepIndex + 1} of {steps.length}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center ${idx <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                  idx < currentStepIndex ? 'bg-primary text-primary-foreground' : 
                  idx === currentStepIndex ? 'border-2 border-primary' : 'border border-muted-foreground'
                }`}>
                  {idx < currentStepIndex ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          {currentStep !== "welcome" && currentStep !== "complete" && (
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={goBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={() => {
                  if (currentStep === "verification") {
                    setTimeout(() => setCurrentStep("complete"), 2000);
                  } else {
                    goNext();
                  }
                }} 
                disabled={!canProceed()}
                className="flex-1 gap-2"
              >
                {currentStep === "verification" ? "Complete KYC" : "Continue"} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
