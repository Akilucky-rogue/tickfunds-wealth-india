import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, ChevronRight } from "lucide-react";

const GoalsCard = () => {
  const goals = [
    { name: "Retirement", checked: true, startYear: 2025, endYear: 2050, progress: 25 },
    { name: "Wedding", checked: true, startYear: 2025, endYear: 2030, progress: 40 },
    { name: "Travel", checked: true, startYear: 2025, endYear: 2030, progress: 60 }
  ];

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Goals</CardTitle>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={goal.checked} 
                  className="rounded border-border"
                  readOnly
                />
                <span className="font-medium">{goal.name}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-12">{goal.startYear}</span>
              <Progress value={goal.progress} className="flex-1" />
              <span className="text-sm text-muted-foreground w-12 text-right">{goal.endYear}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GoalsCard;
