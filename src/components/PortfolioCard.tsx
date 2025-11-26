import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, RefreshCw, Minus, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface PortfolioCardProps {
  title: string;
  amount: string;
  status?: string;
}

const PortfolioCard = ({ title, amount, status }: PortfolioCardProps) => {
  const [showAmount, setShowAmount] = useState(true);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">#{Math.floor(Math.random() * 10000)}</p>
            {status && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded">
                {status}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAmount(!showAmount)}
          >
            {showAmount ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Holdings:</span>
            <span className="text-xl font-bold">
              {showAmount ? amount : "••••.••"}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Held Away:</span>
            <span className="text-xl font-bold">
              {showAmount ? amount : "••••.••"}
            </span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Mandal ea, Co</p>
          <p>Bhavesh Vora</p>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Plus className="h-4 w-4 mr-1" />
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <RefreshCw className="h-4 w-4 mr-1" />
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Minus className="h-4 w-4 mr-1" />
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            ↗
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
