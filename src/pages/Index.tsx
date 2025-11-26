import Navigation from "@/components/Navigation";
import PortfolioCard from "@/components/PortfolioCard";
import RiskProfileCard from "@/components/RiskProfileCard";
import AlertsCard from "@/components/AlertsCard";
import GoalsCard from "@/components/GoalsCard";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <PortfolioCard 
            title="Mutual funds" 
            amount="####.##" 
            status="Active"
          />
          <PortfolioCard 
            title="Mutual funds" 
            amount="####.##"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <RiskProfileCard />
          <AlertsCard />
        </div>

        <GoalsCard />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
