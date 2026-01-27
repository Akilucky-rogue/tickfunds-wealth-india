import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Fund } from "@/data/mockFunds";
import { useNavigate } from "react-router-dom";

interface FundCardProps {
  fund: Fund;
  isCompareMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (fundId: string) => void;
}

const FundCard = ({ fund, isCompareMode = false, isSelected = false, onToggleSelect }: FundCardProps) => {
  const navigate = useNavigate();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Very High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleClick = () => {
    if (isCompareMode && onToggleSelect) {
      onToggleSelect(fund.id);
    } else {
      navigate(`/fund/${fund.id}`);
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {isCompareMode && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelect?.(fund.id)}
              className="mt-1"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">{fund.fundHouse.substring(0, 3).toUpperCase()}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-medium text-sm truncate">{fund.name}</h3>
                <p className="text-xs text-muted-foreground">{fund.subCategory}</p>
              </div>
              {!isCompareMode && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={getRiskColor(fund.riskLevel)}>
                {fund.riskLevel}
              </Badge>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < fund.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div>
                <p className="text-muted-foreground">1Y</p>
                <p className={`font-semibold flex items-center ${fund.returns["1Y"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns["1Y"] >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                  {fund.returns["1Y"]}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">3Y</p>
                <p className={`font-semibold ${fund.returns["3Y"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns["3Y"]}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Min ₹</p>
                <p className="font-semibold">{fund.minInvestment}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundCard;
