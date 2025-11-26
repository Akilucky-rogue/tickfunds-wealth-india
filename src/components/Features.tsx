import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Shield, Users, PieChart, Bell } from "lucide-react";
import featureGrowth from "@/assets/feature-growth.jpg";
import featurePortfolio from "@/assets/feature-portfolio.jpg";

const Features = () => {
  const features = [
    {
      icon: PieChart,
      title: "Smart Portfolio Management",
      description: "Diversified mutual fund investments tailored to your risk profile and financial goals."
    },
    {
      icon: Target,
      title: "Goal-Based Planning",
      description: "Track retirement, education, and life milestones with personalized investment strategies."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Tracking",
      description: "Monitor your portfolio performance and returns with live updates and insights."
    },
    {
      icon: Users,
      title: "Family Wealth Management",
      description: "Manage investments for yourself and your family members in one unified platform."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Bank-grade security with SEBI compliance and regulatory oversight."
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Stay informed with personalized notifications about market opportunities and portfolio changes."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Build Wealth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and features designed for Indian families to invest smartly and achieve financial freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Watch Your Investments Grow
            </h3>
            <p className="text-muted-foreground">
              Our intelligent algorithms and expert research help you maximize returns while managing risk. 
              With Tickfunds, you get access to carefully curated mutual funds that align with your financial aspirations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Expert-selected mutual funds across asset classes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Automated rebalancing based on market conditions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Tax-efficient investment strategies</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img 
              src={featureGrowth} 
              alt="Financial growth visualization with upward trending charts" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-16">
          <div className="relative order-2 md:order-1">
            <img 
              src={featurePortfolio} 
              alt="Mobile app showing portfolio and investment tracking" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl font-bold">
              Your Portfolio, Always at Hand
            </h3>
            <p className="text-muted-foreground">
              Access your complete investment portfolio anytime, anywhere with our intuitive mobile and web platforms. 
              Stay connected to your financial future with real-time updates and insights.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Seamless experience across all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Detailed performance analytics and reports</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">One-tap investments and withdrawals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
