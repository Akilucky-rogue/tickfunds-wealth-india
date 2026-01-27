import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Shield, Target } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "age",
    category: "Demographics",
    question: "What is your age group?",
    options: [
      { value: "18-25", label: "18-25 years", score: 10 },
      { value: "26-35", label: "26-35 years", score: 8 },
      { value: "36-45", label: "36-45 years", score: 6 },
      { value: "46-55", label: "46-55 years", score: 4 },
      { value: "55+", label: "Above 55 years", score: 2 }
    ]
  },
  {
    id: "investment_horizon",
    category: "Investment Goals",
    question: "What is your investment time horizon?",
    options: [
      { value: "1-2", label: "Less than 2 years", score: 2 },
      { value: "2-5", label: "2 to 5 years", score: 4 },
      { value: "5-10", label: "5 to 10 years", score: 7 },
      { value: "10+", label: "More than 10 years", score: 10 }
    ]
  },
  {
    id: "income_stability",
    category: "Financial Situation",
    question: "How stable is your current income source?",
    options: [
      { value: "very_stable", label: "Very stable (Government job, established business)", score: 10 },
      { value: "stable", label: "Stable (Permanent private job)", score: 7 },
      { value: "moderate", label: "Moderately stable (Contract/freelance)", score: 4 },
      { value: "unstable", label: "Variable/uncertain income", score: 2 }
    ]
  },
  {
    id: "emergency_fund",
    category: "Financial Situation",
    question: "How many months of expenses do you have as emergency fund?",
    options: [
      { value: "less_3", label: "Less than 3 months", score: 2 },
      { value: "3-6", label: "3 to 6 months", score: 5 },
      { value: "6-12", label: "6 to 12 months", score: 8 },
      { value: "12+", label: "More than 12 months", score: 10 }
    ]
  },
  {
    id: "dependents",
    category: "Financial Situation",
    question: "How many financial dependents do you have?",
    options: [
      { value: "0", label: "None", score: 10 },
      { value: "1-2", label: "1-2 dependents", score: 7 },
      { value: "3-4", label: "3-4 dependents", score: 4 },
      { value: "5+", label: "5 or more dependents", score: 2 }
    ]
  },
  {
    id: "investment_experience",
    category: "Experience",
    question: "How would you describe your investment experience?",
    options: [
      { value: "none", label: "No experience (First time investor)", score: 2 },
      { value: "basic", label: "Basic (Fixed deposits, recurring deposits)", score: 4 },
      { value: "moderate", label: "Moderate (Mutual funds, bonds)", score: 7 },
      { value: "advanced", label: "Advanced (Stocks, F&O, commodities)", score: 10 }
    ]
  },
  {
    id: "market_drop_reaction",
    category: "Risk Tolerance",
    question: "If your investment drops 20% in value, what would you do?",
    options: [
      { value: "sell_all", label: "Sell everything immediately", score: 1 },
      { value: "sell_some", label: "Sell some to reduce losses", score: 3 },
      { value: "hold", label: "Hold and wait for recovery", score: 6 },
      { value: "buy_more", label: "Invest more at lower prices", score: 10 }
    ]
  },
  {
    id: "return_expectation",
    category: "Risk Tolerance",
    question: "What annual return do you expect from your investments?",
    options: [
      { value: "6-8", label: "6-8% (Slightly above FD returns)", score: 2 },
      { value: "8-12", label: "8-12% (Moderate growth)", score: 5 },
      { value: "12-15", label: "12-15% (Above average growth)", score: 7 },
      { value: "15+", label: "15%+ (Aggressive growth)", score: 10 }
    ]
  },
  {
    id: "loss_tolerance",
    category: "Risk Tolerance",
    question: "What is the maximum temporary loss you can tolerate in a year?",
    options: [
      { value: "0-5", label: "0-5% (I cannot tolerate losses)", score: 1 },
      { value: "5-10", label: "5-10% (Minor losses acceptable)", score: 4 },
      { value: "10-20", label: "10-20% (Moderate losses acceptable)", score: 7 },
      { value: "20+", label: "20%+ (High volatility acceptable)", score: 10 }
    ]
  },
  {
    id: "investment_goal",
    category: "Investment Goals",
    question: "What is your primary investment goal?",
    options: [
      { value: "capital_preservation", label: "Capital preservation (Keep money safe)", score: 2 },
      { value: "regular_income", label: "Regular income generation", score: 4 },
      { value: "balanced_growth", label: "Balanced growth with moderate risk", score: 6 },
      { value: "wealth_creation", label: "Long-term wealth creation", score: 9 },
      { value: "aggressive_growth", label: "Aggressive growth (High risk, high reward)", score: 10 }
    ]
  },
  {
    id: "financial_knowledge",
    category: "Experience",
    question: "How would you rate your financial knowledge?",
    options: [
      { value: "beginner", label: "Beginner - I rely on others for financial decisions", score: 2 },
      { value: "basic", label: "Basic - I understand saving and budgeting", score: 4 },
      { value: "intermediate", label: "Intermediate - I understand different investment options", score: 7 },
      { value: "advanced", label: "Advanced - I can analyze investments independently", score: 10 }
    ]
  },
  {
    id: "liquidity_needs",
    category: "Financial Situation",
    question: "How likely are you to need this money before your planned time horizon?",
    options: [
      { value: "very_likely", label: "Very likely - May need it anytime", score: 2 },
      { value: "likely", label: "Likely - May need part of it", score: 4 },
      { value: "unlikely", label: "Unlikely - Have other sources for emergencies", score: 7 },
      { value: "very_unlikely", label: "Very unlikely - This is long-term money", score: 10 }
    ]
  }
];

interface RiskProfileResult {
  category: "Conservative" | "Moderately Conservative" | "Moderate" | "Moderately Aggressive" | "Aggressive";
  score: number;
  description: string;
  allocation: { type: string; percentage: number; color: string }[];
  recommendations: string[];
}

const RiskProfile = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: string; score: number }>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: { value, score }
    }));
  };

  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = (): RiskProfileResult => {
    const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage <= 30) {
      return {
        category: "Conservative",
        score: totalScore,
        description: "You prefer stability and capital preservation over high returns. You're uncomfortable with market volatility and prefer investments with predictable returns.",
        allocation: [
          { type: "Debt Funds", percentage: 70, color: "hsl(var(--chart-1))" },
          { type: "Hybrid Funds", percentage: 20, color: "hsl(var(--chart-2))" },
          { type: "Large Cap Equity", percentage: 10, color: "hsl(var(--chart-3))" }
        ],
        recommendations: [
          "Liquid funds for emergency corpus",
          "Short-term debt funds for 1-2 year goals",
          "Conservative hybrid funds for slightly better returns",
          "Consider PPF and fixed deposits for guaranteed returns"
        ]
      };
    } else if (percentage <= 45) {
      return {
        category: "Moderately Conservative",
        score: totalScore,
        description: "You seek stability with some growth potential. You can tolerate minor fluctuations for slightly better returns than fixed deposits.",
        allocation: [
          { type: "Debt Funds", percentage: 50, color: "hsl(var(--chart-1))" },
          { type: "Hybrid Funds", percentage: 30, color: "hsl(var(--chart-2))" },
          { type: "Large Cap Equity", percentage: 20, color: "hsl(var(--chart-3))" }
        ],
        recommendations: [
          "Conservative hybrid funds as core holding",
          "Large-cap index funds for equity exposure",
          "Corporate bond funds for steady income",
          "Balanced advantage funds for dynamic allocation"
        ]
      };
    } else if (percentage <= 60) {
      return {
        category: "Moderate",
        score: totalScore,
        description: "You're comfortable with a balanced approach between growth and stability. You understand market cycles and can wait for recovery during downturns.",
        allocation: [
          { type: "Equity Funds", percentage: 50, color: "hsl(var(--chart-3))" },
          { type: "Hybrid Funds", percentage: 25, color: "hsl(var(--chart-2))" },
          { type: "Debt Funds", percentage: 25, color: "hsl(var(--chart-1))" }
        ],
        recommendations: [
          "Flexi-cap funds for diversified equity exposure",
          "Aggressive hybrid funds for balanced approach",
          "Multi-cap funds for market-cap diversification",
          "Dynamic bond funds for debt allocation"
        ]
      };
    } else if (percentage <= 80) {
      return {
        category: "Moderately Aggressive",
        score: totalScore,
        description: "You're willing to take calculated risks for higher returns. You have good financial knowledge and can handle significant market volatility.",
        allocation: [
          { type: "Equity Funds", percentage: 70, color: "hsl(var(--chart-3))" },
          { type: "Hybrid Funds", percentage: 15, color: "hsl(var(--chart-2))" },
          { type: "Debt Funds", percentage: 15, color: "hsl(var(--chart-1))" }
        ],
        recommendations: [
          "Mid-cap funds for growth potential",
          "Flexi-cap and focused funds",
          "Sectoral funds for tactical allocation",
          "International funds for global diversification"
        ]
      };
    } else {
      return {
        category: "Aggressive",
        score: totalScore,
        description: "You're a seasoned investor willing to take high risks for potentially high returns. You have strong conviction and can ride out major market corrections.",
        allocation: [
          { type: "Equity Funds", percentage: 85, color: "hsl(var(--chart-3))" },
          { type: "Hybrid Funds", percentage: 10, color: "hsl(var(--chart-2))" },
          { type: "Debt Funds", percentage: 5, color: "hsl(var(--chart-1))" }
        ],
        recommendations: [
          "Small-cap funds for high growth potential",
          "Mid-cap and small-cap funds",
          "Thematic and sectoral funds",
          "International equity funds",
          "Consider direct equity for portion of portfolio"
        ]
      };
    }
  };

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  if (showResult) {
    const result = calculateResult();
    
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navigation />
        
        <main className="container px-4 py-6 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Your Risk Profile</CardTitle>
              <CardDescription>Based on your responses to {questions.length} questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-3xl font-bold text-primary mb-2">{result.category}</p>
                <p className="text-sm text-muted-foreground">Risk Score: {result.score} / {questions.length * 10}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Profile Description</h3>
                <p className="text-muted-foreground text-sm">{result.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Recommended Asset Allocation</h3>
                <div className="space-y-3">
                  {result.allocation.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.type}</span>
                        <span className="font-semibold">{item.percentage}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Fund Recommendations</h3>
                <div className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => {
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}>
                  Retake Assessment
                </Button>
                <Button className="flex-1" onClick={() => navigate("/invest")}>
                  Explore Recommended Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <span className="text-sm text-muted-foreground">{currentQuestion + 1} of {questions.length}</span>
        </div>

        <Progress value={progress} className="h-2" />

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              {currentQ.category === "Risk Tolerance" && <AlertTriangle className="h-4 w-4" />}
              {currentQ.category === "Financial Situation" && <Shield className="h-4 w-4" />}
              {currentQ.category === "Investment Goals" && <Target className="h-4 w-4" />}
              {currentQ.category === "Experience" && <TrendingUp className="h-4 w-4" />}
              {currentQ.category === "Demographics" && <Shield className="h-4 w-4" />}
              {currentQ.category}
            </div>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={currentAnswer?.value || ""} 
              onValueChange={(value) => {
                const option = currentQ.options.find(o => o.value === value);
                if (option) handleAnswer(value, option.score);
              }}
            >
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <div 
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      currentAnswer?.value === option.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleAnswer(option.value, option.score)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={goBack}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <Button 
            onClick={goNext}
            disabled={!currentAnswer}
            className="flex-1 gap-2"
          >
            {currentQuestion === questions.length - 1 ? "View Results" : "Next"} 
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default RiskProfile;
