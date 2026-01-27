import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, TrendingUp, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockFunds } from "@/data/mockFunds";
import FundCard from "@/components/FundCard";
import FundFilterSheet, { FilterState } from "@/components/FundFilterSheet";

const Invest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("Equity");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedFundIds, setSelectedFundIds] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    minInvestment: [100, 10000],
    minReturns1Y: 0,
    riskLevels: [],
    fundHouses: [],
    sortBy: "returns1Y",
    sortOrder: "desc"
  });

  const productTabs = ["MF", "SIF", "FD", "Metal", "Bonds"];
  const categoryTabs = ["Equity", "Debt", "Hybrid", "Solution", "Others"];
  
  const subCategories: Record<string, string[]> = {
    Equity: ["Flexicap", "Large Cap", "Midcap", "Small Cap", "Large + Mid", "Mid + Small", "ELSS", "Sectoral"],
    Debt: ["Liquid", "Ultra Short", "Short Term", "Corporate Bond", "Gilt"],
    Hybrid: ["Aggressive", "Conservative", "Balanced Advantage", "Multi Asset"],
    Solution: ["Retirement", "Children's Fund", "Tax Saving"],
    Others: ["International", "Gold", "Index Funds"]
  };

  const ideasForYou = [
    { name: "Park Aside", icon: "💰" },
    { name: "More than FD", icon: "📈" },
    { name: "Best of Both World", icon: "🌟" },
    { name: "Instant ATM", icon: "🏧" },
    { name: "Regular Income", icon: "💵" },
    { name: "Infra Boom", icon: "🏗️" },
    { name: "Digital India", icon: "💻" },
    { name: "Jain Compliant", icon: "🕉️" },
    { name: "Shariah Compliant", icon: "☪️" },
    { name: "ESG Compliant", icon: "🌿" },
    { name: "Around the World", icon: "🌍" },
    { name: "US & Europe", icon: "🇺🇸" },
    { name: "China Specific", icon: "🇨🇳" },
    { name: "Gift City", icon: "🎁" },
    { name: "NRI Funds", icon: "✈️" }
  ];

  const baskets = [
    {
      name: "Growth Unleashed",
      funds: 5,
      aum: "10.6M",
      returns: { "1Y": "13.5%", "2Y": "10.6%", "3Y": "9.2%" }
    },
    {
      name: "Stable Returns",
      funds: 4,
      aum: "8.2M",
      returns: { "1Y": "8.5%", "2Y": "7.8%", "3Y": "7.2%" }
    }
  ];

  const nfos = [
    { company: "Tata", name: "Tata Balance Advantage Fund", endDate: "Dec 31, 2024" },
    { company: "HDFC", name: "HDFC Multi Cap Fund", endDate: "Jan 15, 2025" }
  ];

  // Filter and sort funds
  const filteredFunds = useMemo(() => {
    let result = mockFunds.filter(fund => {
      // Category filter
      if (fund.category !== activeCategory) return false;
      
      // Sub-category filter
      if (activeSubCategory && fund.subCategory !== activeSubCategory) return false;
      
      // Search filter
      if (searchQuery && !fund.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !fund.fundHouse.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Min investment filter
      if (fund.minInvestment < filters.minInvestment[0] || fund.minInvestment > filters.minInvestment[1]) return false;
      
      // Returns filter
      if (fund.returns["1Y"] < filters.minReturns1Y) return false;
      
      // Risk level filter
      if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(fund.riskLevel)) return false;
      
      // Fund house filter
      if (filters.fundHouses.length > 0 && !filters.fundHouses.includes(fund.fundHouse)) return false;
      
      return true;
    });

    // Sort
    result.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (filters.sortBy) {
        case "returns1Y":
          aValue = a.returns["1Y"];
          bValue = b.returns["1Y"];
          break;
        case "returns3Y":
          aValue = a.returns["3Y"];
          bValue = b.returns["3Y"];
          break;
        case "returns5Y":
          aValue = a.returns["5Y"];
          bValue = b.returns["5Y"];
          break;
        case "aum":
          aValue = a.aum;
          bValue = b.aum;
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "minInvestment":
          aValue = a.minInvestment;
          bValue = b.minInvestment;
          break;
        default:
          aValue = a.returns["1Y"];
          bValue = b.returns["1Y"];
      }
      
      return filters.sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    return result;
  }, [activeCategory, activeSubCategory, searchQuery, filters]);

  const toggleFundSelection = (fundId: string) => {
    if (selectedFundIds.includes(fundId)) {
      setSelectedFundIds(selectedFundIds.filter(id => id !== fundId));
    } else if (selectedFundIds.length < 4) {
      setSelectedFundIds([...selectedFundIds, fundId]);
    }
  };

  const handleCompare = () => {
    if (selectedFundIds.length >= 2) {
      navigate(`/compare?funds=${selectedFundIds.join(",")}`);
    }
  };

  const resetFilters = () => {
    setFilters({
      minInvestment: [100, 10000],
      minReturns1Y: 0,
      riskLevels: [],
      fundHouses: [],
      sortBy: "returns1Y",
      sortOrder: "desc"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Product Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {productTabs.map((tab) => (
            <Button
              key={tab}
              variant={tab === "MF" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Search and Compare */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search a fund" 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant={isCompareMode ? "default" : "outline"} 
            className="whitespace-nowrap gap-2"
            onClick={() => {
              if (isCompareMode && selectedFundIds.length >= 2) {
                handleCompare();
              } else {
                setIsCompareMode(!isCompareMode);
                if (!isCompareMode) setSelectedFundIds([]);
              }
            }}
          >
            <Scale className="h-4 w-4" />
            {isCompareMode ? `Compare (${selectedFundIds.length})` : "Compare"}
          </Button>
        </div>

        {/* Compare Mode Banner */}
        {isCompareMode && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
            <p className="text-sm">Select 2-4 funds to compare</p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => { setIsCompareMode(false); setSelectedFundIds([]); }}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                disabled={selectedFundIds.length < 2}
                onClick={handleCompare}
              >
                Compare Funds
              </Button>
            </div>
          </div>
        )}

        {/* Explore by Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Explore by Categories</h2>
            <FundFilterSheet 
              filters={filters} 
              onFiltersChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={(v) => { setActiveCategory(v); setActiveSubCategory(null); }}>
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 overflow-x-auto">
              {categoryTabs.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Sub-categories */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={activeSubCategory === null ? "default" : "outline"}
              className="cursor-pointer py-2 px-3"
              onClick={() => setActiveSubCategory(null)}
            >
              All
            </Badge>
            {subCategories[activeCategory]?.map((sub) => (
              <Badge 
                key={sub} 
                variant={activeSubCategory === sub ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-2 px-3"
                onClick={() => setActiveSubCategory(sub === activeSubCategory ? null : sub)}
              >
                {sub}
              </Badge>
            ))}
          </div>

          {/* Filtered Funds List */}
          {(searchQuery || activeSubCategory || filters.riskLevels.length > 0 || filters.fundHouses.length > 0 || filters.minReturns1Y > 0) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{filteredFunds.length} funds found</p>
              </div>
              {filteredFunds.length > 0 ? (
                <div className="space-y-3">
                  {filteredFunds.map(fund => (
                    <FundCard 
                      key={fund.id} 
                      fund={fund}
                      isCompareMode={isCompareMode}
                      isSelected={selectedFundIds.includes(fund.id)}
                      onToggleSelect={toggleFundSelection}
                    />
                  ))}
                </div>
              ) : (
                <Card className="py-8">
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">No funds match your criteria</p>
                    <Button variant="link" onClick={resetFilters}>Reset filters</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Ideas for You - only show when not filtering */}
        {!searchQuery && !activeSubCategory && filters.riskLevels.length === 0 && filters.fundHouses.length === 0 && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Ideas for you</h2>
                <Button variant="link" className="text-primary p-0 h-auto">
                  See all
                </Button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {ideasForYou.map((idea) => (
                  <Card 
                    key={idea.name} 
                    className="cursor-pointer hover:shadow-md transition-shadow border-border"
                  >
                    <CardContent className="p-3 text-center space-y-1">
                      <span className="text-2xl">{idea.icon}</span>
                      <p className="text-xs font-medium leading-tight">{idea.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Baskets to Consider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Baskets to Consider</h2>
                <Button variant="link" className="text-primary p-0 h-auto">
                  See all
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {baskets.map((basket) => (
                  <Card key={basket.name} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{basket.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {basket.funds} funds • AUM ₹{basket.aum}
                        </p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        {Object.entries(basket.returns).map(([period, value]) => (
                          <div key={period}>
                            <p className="text-muted-foreground">{period}</p>
                            <p className="font-semibold text-primary">{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* NFOs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">NFO's</h2>
                <Button variant="link" className="text-primary p-0 h-auto">
                  See all
                </Button>
              </div>

              <div className="space-y-3">
                {nfos.map((nfo) => (
                  <Card key={nfo.name} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {nfo.company}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{nfo.name}</h3>
                        <p className="text-xs text-muted-foreground">Ends: {nfo.endDate}</p>
                      </div>
                      <Button size="sm">Invest</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Invest;
