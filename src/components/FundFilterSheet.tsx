import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { fundHouses, riskLevels } from "@/data/mockFunds";

export interface FilterState {
  minInvestment: [number, number];
  minReturns1Y: number;
  riskLevels: string[];
  fundHouses: string[];
  sortBy: "returns1Y" | "returns3Y" | "returns5Y" | "aum" | "rating" | "minInvestment";
  sortOrder: "asc" | "desc";
}

interface FundFilterSheetProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const FundFilterSheet = ({ filters, onFiltersChange, onReset }: FundFilterSheetProps) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
    setOpen(false);
  };

  const handleRiskToggle = (risk: string) => {
    const updated = localFilters.riskLevels.includes(risk)
      ? localFilters.riskLevels.filter(r => r !== risk)
      : [...localFilters.riskLevels, risk];
    setLocalFilters({ ...localFilters, riskLevels: updated });
  };

  const handleFundHouseToggle = (house: string) => {
    const updated = localFilters.fundHouses.includes(house)
      ? localFilters.fundHouses.filter(h => h !== house)
      : [...localFilters.fundHouses, house];
    setLocalFilters({ ...localFilters, fundHouses: updated });
  };

  const sortOptions = [
    { value: "returns1Y", label: "1Y Returns" },
    { value: "returns3Y", label: "3Y Returns" },
    { value: "returns5Y", label: "5Y Returns" },
    { value: "aum", label: "AUM" },
    { value: "rating", label: "Rating" },
    { value: "minInvestment", label: "Min Investment" }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter & Sort
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filter & Sort Funds
            <Button variant="ghost" size="sm" onClick={() => {
              onReset();
              setLocalFilters({
                minInvestment: [100, 10000],
                minReturns1Y: 0,
                riskLevels: [],
                fundHouses: [],
                sortBy: "returns1Y",
                sortOrder: "desc"
              });
            }}>
              <X className="h-4 w-4 mr-1" /> Reset
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Min Investment Range */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Min Investment Range</Label>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{localFilters.minInvestment[0]}</span>
              <span>₹{localFilters.minInvestment[1]}</span>
            </div>
            <Slider
              value={localFilters.minInvestment}
              onValueChange={(value) => setLocalFilters({ ...localFilters, minInvestment: value as [number, number] })}
              min={100}
              max={10000}
              step={100}
            />
          </div>

          {/* Minimum 1Y Returns */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Min 1Y Returns: {localFilters.minReturns1Y}%</Label>
            <Slider
              value={[localFilters.minReturns1Y]}
              onValueChange={(value) => setLocalFilters({ ...localFilters, minReturns1Y: value[0] })}
              min={0}
              max={40}
              step={1}
            />
          </div>

          {/* Risk Level */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Risk Level</Label>
            <div className="grid grid-cols-2 gap-2">
              {riskLevels.map((risk) => (
                <div key={risk} className="flex items-center space-x-2">
                  <Checkbox
                    id={`risk-${risk}`}
                    checked={localFilters.riskLevels.includes(risk)}
                    onCheckedChange={() => handleRiskToggle(risk)}
                  />
                  <label htmlFor={`risk-${risk}`} className="text-sm cursor-pointer">
                    {risk}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Fund House */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Fund House</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {fundHouses.map((house) => (
                <div key={house} className="flex items-center space-x-2">
                  <Checkbox
                    id={`house-${house}`}
                    checked={localFilters.fundHouses.includes(house)}
                    onCheckedChange={() => handleFundHouseToggle(house)}
                  />
                  <label htmlFor={`house-${house}`} className="text-sm cursor-pointer">
                    {house}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Sort By</Label>
            <div className="grid grid-cols-2 gap-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={localFilters.sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLocalFilters({ ...localFilters, sortBy: option.value as FilterState["sortBy"] })}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant={localFilters.sortOrder === "desc" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setLocalFilters({ ...localFilters, sortOrder: "desc" })}
              >
                High to Low
              </Button>
              <Button
                variant={localFilters.sortOrder === "asc" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setLocalFilters({ ...localFilters, sortOrder: "asc" })}
              >
                Low to High
              </Button>
            </div>
          </div>

          <Button className="w-full" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FundFilterSheet;
