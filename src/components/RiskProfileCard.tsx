import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RiskProfileCard = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Conservative</CardTitle>
        <p className="text-sm text-muted-foreground">Base Risk Profile</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="flex-1 h-2 bg-muted rounded"></div>
          <div className="flex-1 h-2 bg-muted rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskProfileCard;
