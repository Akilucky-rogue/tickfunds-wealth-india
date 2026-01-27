import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Target } from "lucide-react";

const RiskProfileCard = () => {
  const navigate = useNavigate();
  
  // Mock risk profile status
  const hasCompletedProfile = false;
  const riskLevel = "Moderate"; // Would come from user data

  return (
    <Card 
      className="border-border cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/risk-profile")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">
            {hasCompletedProfile ? riskLevel : "Risk Profile"}
          </CardTitle>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {hasCompletedProfile ? (
          <>
            <p className="text-sm text-muted-foreground mb-3">Base Risk Profile</p>
            <div className="flex gap-2">
              <div className="flex-1 h-2 bg-green-500 rounded"></div>
              <div className="flex-1 h-2 bg-yellow-500 rounded"></div>
              <div className="flex-1 h-2 bg-muted rounded"></div>
              <div className="flex-1 h-2 bg-muted rounded"></div>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-3">Complete your risk assessment</p>
            <div className="flex gap-2">
              <div className="flex-1 h-2 bg-muted rounded"></div>
              <div className="flex-1 h-2 bg-muted rounded"></div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-2 text-primary text-sm">
              Take Assessment →
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskProfileCard;
