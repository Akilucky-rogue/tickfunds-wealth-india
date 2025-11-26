import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Target, TrendingUp, Wallet } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Create Your Account",
      description: "Sign up in minutes with your basic details and complete KYC verification seamlessly."
    },
    {
      icon: Target,
      number: "02", 
      title: "Set Your Goals",
      description: "Define your financial objectives - retirement, children's education, dream home, or any milestone."
    },
    {
      icon: Wallet,
      number: "03",
      title: "Start Investing",
      description: "Choose from curated investment options or let our experts build a portfolio for you."
    },
    {
      icon: TrendingUp,
      number: "04",
      title: "Track & Grow",
      description: "Monitor your investments in real-time and watch your wealth grow towards your goals."
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Your Investment Journey in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with Tickfunds is easy. Follow these steps to begin building your wealth today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="h-0.5 w-6 bg-primary/30" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
