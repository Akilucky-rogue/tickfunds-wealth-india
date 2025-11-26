import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Indian family planning their financial future together" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/90 to-background/95" />
      </div>
      
      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Grow Your Family's Wealth with{" "}
            <span className="text-primary">Smart Investing</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tickfunds helps Indian families build wealth through intelligent portfolio management, 
            goal tracking, and personalized investment strategies tailored for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto group">
              Start Investing Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <span>SEBI Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <span>₹500+ Cr AUM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
