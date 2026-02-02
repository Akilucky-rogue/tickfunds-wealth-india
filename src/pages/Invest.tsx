import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, ChevronRight, TrendingUp, Scale, Heart, ShoppingCart, 
  Filter, List, Layers, BarChart3, Clock, Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockFunds } from "@/data/mockFunds";
import FundCard from "@/components/FundCard";
import FundFilterSheet, { FilterState } from "@/components/FundFilterSheet";

const Invest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Main section navigation
  const [activeSection, setActiveSection] = useState("mf");
  const [mfSubSection, setMfSubSection] = useState("explore");
  
  // Mutual fund filters
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

  // Investment sections
  const investSections = [
    { id: "mf", label: "Mutual Funds", icon: BarChart3 },
    { id: "fd", label: "Company FD", icon: Layers },
    { id: "bonds", label: "Bonds", icon: TrendingUp },
    { id: "gold", label: "Gold & Silver", icon: Sparkles },
    { id: "pms", label: "PMS & AIF", icon: BarChart3 }
  ];

  // Mutual Funds sub-sections
  const mfSubSections = [
    { id: "explore", label: "Explore", icon: Search },
    { id: "screener", label: "Screener", icon: Filter },
    { id: "list", label: "List", icon: List },
    { id: "baskets", label: "Baskets", icon: Layers },
    { id: "compare", label: "Compare", icon: Scale },
    { id: "orders", label: "Orders", icon: Clock }
  ];

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
    },
    {
      name: "Tax Saver Pro",
      funds: 3,
      aum: "5.4M",
      returns: { "1Y": "15.2%", "2Y": "12.1%", "3Y": "10.8%" }
    }
  ];

  const nfos = [
    { company: "Tata", name: "Tata Balance Advantage Fund", endDate: "Dec 31, 2024" },
    { company: "HDFC", name: "HDFC Multi Cap Fund", endDate: "Jan 15, 2025" }
  ];

  // Filter and sort funds
  const filteredFunds = useMemo(() => {
    let result = mockFunds.filter(fund => {
      if (fund.category !== activeCategory) return false;
      if (activeSubCategory && fund.subCategory !== activeSubCategory) return false;
      if (searchQuery && !fund.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !fund.fundHouse.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (fund.minInvestment < filters.minInvestment[0] || fund.minInvestment > filters.minInvestment[1]) return false;
      if (fund.returns["1Y"] < filters.minReturns1Y) return false;
      if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(fund.riskLevel)) return false;
      if (filters.fundHouses.length > 0 && !filters.fundHouses.includes(fund.fundHouse)) return false;
      return true;
    });

    result.sort((a, b) => {
      let aValue: number, bValue: number;
      switch (filters.sortBy) {
        case "returns1Y": aValue = a.returns["1Y"]; bValue = b.returns["1Y"]; break;
        case "returns3Y": aValue = a.returns["3Y"]; bValue = b.returns["3Y"]; break;
        case "returns5Y": aValue = a.returns["5Y"]; bValue = b.returns["5Y"]; break;
        case "aum": aValue = a.aum; bValue = b.aum; break;
        case "rating": aValue = a.rating; bValue = b.rating; break;
        case "minInvestment": aValue = a.minInvestment; bValue = b.minInvestment; break;
        default: aValue = a.returns["1Y"]; bValue = b.returns["1Y"];
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

  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    if (sectionId === "fd") navigate("/fd");
    else if (sectionId === "bonds") navigate("/bonds");
    else if (sectionId === "gold") navigate("/gold");
    else if (sectionId === "pms") navigate("/pms-aif");
    else setActiveSection(sectionId);
  };

  // Render MF sub-section content
  const renderMfSubSection = () => {
    switch (mfSubSection) {
      case "explore":
        return renderExploreSection();
      case "screener":
        return renderScreenerSection();
      case "list":
        return renderListSection();
      case "baskets":
        return renderBasketsSection();
      case "compare":
        return renderCompareSection();
      case "orders":
        navigate("/orders");
        return null;
      default:
        return renderExploreSection();
    }
  };

  const renderExploreSection = () => (
    <div className="space-y-6">
      {/* Search and Compare */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search funds..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          variant={isCompareMode ? "default" : "outline"} 
          className="gap-2"
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
          {isCompareMode ? `(${selectedFundIds.length})` : "Compare"}
        </Button>
      </div>

      {/* Compare Mode Banner */}
      {isCompareMode && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
          <p className="text-sm">Select 2-4 funds to compare</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => { setIsCompareMode(false); setSelectedFundIds([]); }}>Cancel</Button>
            <Button size="sm" disabled={selectedFundIds.length < 2} onClick={handleCompare}>Compare</Button>
          </div>
        </div>
      )}

      {/* Highlights - Featured Cards */}
      <div className="space-y-3">
        <h3 className="font-semibold">Highlights</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockFunds.slice(0, 3).map(fund => (
            <Card key={fund.id} className="min-w-[250px] cursor-pointer hover:shadow-md" onClick={() => navigate(`/fund/${fund.id}`)}>
              <CardContent className="pt-4">
                <p className="font-medium text-sm">{fund.name}</p>
                <p className="text-xs text-muted-foreground">{fund.fundHouse}</p>
                <p className="text-lg font-bold text-primary mt-2">{fund.returns["1Y"]}% <span className="text-xs font-normal">1Y</span></p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-semibold">Categories</h3>
        <Tabs value={activeCategory} onValueChange={(v) => { setActiveCategory(v); setActiveSubCategory(null); }}>
          <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 overflow-x-auto">
            {categoryTabs.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="whitespace-nowrap">{cat}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap gap-2">
          {subCategories[activeCategory]?.map((sub) => (
            <Badge 
              key={sub} 
              variant={activeSubCategory === sub ? "default" : "outline"}
              className="cursor-pointer py-2 px-3"
              onClick={() => setActiveSubCategory(sub === activeSubCategory ? null : sub)}
            >
              {sub}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filtered Funds */}
      {(searchQuery || activeSubCategory) && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{filteredFunds.length} funds found</p>
          {filteredFunds.slice(0, 5).map(fund => (
            <FundCard 
              key={fund.id} 
              fund={fund}
              isCompareMode={isCompareMode}
              isSelected={selectedFundIds.includes(fund.id)}
              onToggleSelect={toggleFundSelection}
            />
          ))}
        </div>
      )}

      {/* Ideas for You */}
      {!searchQuery && !activeSubCategory && (
        <>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Ideas for you</h3>
              <Button variant="link" className="text-primary p-0 h-auto">See all</Button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {ideasForYou.slice(0, 10).map((idea) => (
                <Card key={idea.name} className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-3 text-center space-y-1">
                    <span className="text-2xl">{idea.icon}</span>
                    <p className="text-xs font-medium leading-tight">{idea.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* NFOs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">NFO's</h3>
              <Button variant="link" className="text-primary p-0 h-auto">See all</Button>
            </div>
            {nfos.map((nfo) => (
              <Card key={nfo.name} className="cursor-pointer hover:shadow-md">
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
        </>
      )}
    </div>
  );

  const renderScreenerSection = () => (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search funds..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <FundFilterSheet filters={filters} onFiltersChange={setFilters} onReset={resetFilters} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filteredFunds.length} funds</p>
        <Badge variant="outline">{filters.sortBy} • {filters.sortOrder}</Badge>
      </div>

      <div className="space-y-3">
        {filteredFunds.map(fund => (
          <FundCard key={fund.id} fund={fund} isCompareMode={isCompareMode} isSelected={selectedFundIds.includes(fund.id)} onToggleSelect={toggleFundSelection} />
        ))}
      </div>
    </div>
  );

  const renderListSection = () => (
    <div className="space-y-6">
      {/* Highlighted Funds */}
      <div className="space-y-3">
        <h3 className="font-semibold">Highlighted Funds</h3>
        {mockFunds.filter(f => f.rating >= 4.5).slice(0, 3).map(fund => (
          <FundCard key={fund.id} fund={fund} isCompareMode={false} isSelected={false} onToggleSelect={() => {}} />
        ))}
      </div>

      {/* Ideas */}
      <div className="space-y-3">
        <h3 className="font-semibold">Ideas</h3>
        <div className="grid grid-cols-2 gap-3">
          {ideasForYou.slice(0, 6).map((idea) => (
            <Card key={idea.name} className="cursor-pointer hover:shadow-md">
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-2xl">{idea.icon}</span>
                <p className="font-medium text-sm">{idea.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* NFO */}
      <div className="space-y-3">
        <h3 className="font-semibold">NFO</h3>
        {nfos.map((nfo) => (
          <Card key={nfo.name}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{nfo.company}</div>
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
  );

  const renderBasketsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Investment Baskets</h3>
        <Button size="sm" variant="outline">Create Basket</Button>
      </div>

      {/* Featured Baskets */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Featured</p>
        {baskets.slice(0, 2).map((basket) => (
          <Card key={basket.name} className="cursor-pointer hover:shadow-md">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">{basket.name}</h3>
                <p className="text-sm text-muted-foreground">{basket.funds} funds • AUM ₹{basket.aum}</p>
              </div>
              <div className="flex gap-4 text-sm">
                {Object.entries(basket.returns).map(([period, value]) => (
                  <div key={period}>
                    <p className="text-muted-foreground">{period}</p>
                    <p className="font-semibold text-primary">{value}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full">Invest in Basket</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Baskets */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Trending</p>
        {baskets.slice(1).map((basket) => (
          <Card key={basket.name} className="cursor-pointer hover:shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{basket.name}</h3>
                <p className="text-sm text-muted-foreground">{basket.funds} funds</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{basket.returns["1Y"]}</p>
                <p className="text-xs text-muted-foreground">1Y Returns</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCompareSection = () => (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search funds to compare..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="font-medium mb-2">Select 2-4 funds to compare</p>
        <p className="text-sm text-muted-foreground">Compare performance, risk, holdings and more</p>
      </div>

      {/* Selected Funds */}
      {selectedFundIds.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected ({selectedFundIds.length}/4)</p>
          <div className="flex flex-wrap gap-2">
            {selectedFundIds.map(id => {
              const fund = mockFunds.find(f => f.id === id);
              return fund ? (
                <Badge key={id} variant="secondary" className="py-2 px-3">
                  {fund.name}
                  <button className="ml-2" onClick={() => toggleFundSelection(id)}>×</button>
                </Badge>
              ) : null;
            })}
          </div>
          <Button className="w-full" disabled={selectedFundIds.length < 2} onClick={handleCompare}>
            Compare {selectedFundIds.length} Funds
          </Button>
        </div>
      )}

      {/* Funds List */}
      <div className="space-y-3">
        {filteredFunds.map(fund => (
          <FundCard 
            key={fund.id} 
            fund={fund}
            isCompareMode={true}
            isSelected={selectedFundIds.includes(fund.id)}
            onToggleSelect={toggleFundSelection}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={() => navigate("/wishlist")}>
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/orders")}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </Button>
        </div>

        {/* Investment Section Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {investSections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap gap-2"
              onClick={() => handleSectionClick(section.id)}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Mutual Funds Section */}
        {activeSection === "mf" && (
          <div className="space-y-6">
            {/* MF Sub-Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b">
              {mfSubSections.map((sub) => (
                <Button
                  key={sub.id}
                  variant="ghost"
                  size="sm"
                  className={`whitespace-nowrap gap-2 ${mfSubSection === sub.id ? 'bg-muted text-foreground' : ''}`}
                  onClick={() => {
                    if (sub.id === "orders") {
                      navigate("/orders");
                    } else {
                      setMfSubSection(sub.id);
                    }
                  }}
                >
                  <sub.icon className="h-4 w-4" />
                  {sub.label}
                </Button>
              ))}
            </div>

            {/* MF Content */}
            {renderMfSubSection()}
          </div>
        )}

        {/* PMS & AIF Banner (when on MF) */}
        {activeSection === "mf" && (
          <Card 
            className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 cursor-pointer hover:shadow-md"
            onClick={() => navigate("/pms-aif")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">PMS & AIF</h3>
                  <p className="text-sm text-muted-foreground">For HNIs - Min ₹50L for PMS, ₹1Cr for AIF</p>
                </div>
                <Button>Explore</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Invest;
