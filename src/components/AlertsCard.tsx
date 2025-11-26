import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AlertsCard = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Alerts</CardTitle>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
          </Button>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-muted"></div>
            <div className="h-2 w-2 rounded-full bg-muted"></div>
            <div className="h-2 w-2 rounded-full bg-muted"></div>
            <div className="h-2 w-2 rounded-full bg-muted"></div>
            <div className="h-2 w-2 rounded-full bg-muted"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
