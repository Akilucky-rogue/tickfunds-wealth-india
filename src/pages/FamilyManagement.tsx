import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Plus, ChevronRight, Users, 
  CheckCircle2, AlertCircle, Target, Wallet, MoreVertical
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  email: string;
  phone: string;
  kycStatus: "verified" | "pending" | "incomplete";
  riskProfile: "Conservative" | "Moderate" | "Aggressive" | null;
  portfolioValue: number;
  goalsCount: number;
}

const mockFamilyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Bhavesh Vora",
    relation: "Self",
    email: "bhavesh.vora@example.com",
    phone: "+91 98765 43210",
    kycStatus: "verified",
    riskProfile: "Moderate",
    portfolioValue: 1250000,
    goalsCount: 3,
  },
  {
    id: "2",
    name: "Priya Vora",
    relation: "Spouse",
    email: "priya.vora@example.com",
    phone: "+91 98765 43211",
    kycStatus: "verified",
    riskProfile: "Conservative",
    portfolioValue: 875000,
    goalsCount: 2,
  },
  {
    id: "3",
    name: "Arjun Vora",
    relation: "Son",
    email: "arjun.vora@example.com",
    phone: "+91 98765 43212",
    kycStatus: "pending",
    riskProfile: null,
    portfolioValue: 0,
    goalsCount: 1,
  },
];

const FamilyManagement = () => {
  const navigate = useNavigate();
  const [members] = useState<FamilyMember[]>(mockFamilyMembers);

  const getKycBadge = (status: FamilyMember["kycStatus"]) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-600">Verified</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case "incomplete":
        return <Badge variant="outline" className="text-destructive border-destructive">Incomplete</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Family</h1>
          </div>
          <Button onClick={() => navigate("/family/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Family Summary */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Family Portfolio</h3>
                <p className="text-sm text-muted-foreground">{members.length} members</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xl font-bold">
                  {formatCurrency(members.reduce((sum, m) => sum + m.portfolioValue, 0))}
                </p>
                <p className="text-xs text-muted-foreground">Total Value</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold">
                  {members.filter(m => m.kycStatus === "verified").length}/{members.length}
                </p>
                <p className="text-xs text-muted-foreground">KYC Complete</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold">
                  {members.reduce((sum, m) => sum + m.goalsCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Members List */}
        <div className="space-y-4">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{member.name}</h3>
                      <Badge variant="outline" className="text-xs">{member.relation}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-sm">
                        {member.kycStatus === "verified" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        )}
                        <span>KYC</span>
                        {getKycBadge(member.kycStatus)}
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-sm">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {member.riskProfile || "Not Set"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-sm">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {formatCurrency(member.portfolioValue)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => navigate(`/family/${member.id}/kyc`)}>
                        View KYC
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/family/${member.id}/risk-profile`)}>
                        Risk Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/family/${member.id}/goals`)}>
                        Goals ({member.goalsCount})
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/family/${member.id}/accounts`)}>
                        Bank Accounts
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/family/${member.id}/mandates`)}>
                        Mandates
                      </DropdownMenuItem>
                      {member.relation !== "Self" && (
                        <DropdownMenuItem className="text-destructive">
                          Remove Member
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/family/kyc")}>
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xs">All KYC</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/family/accounts")}>
              <Wallet className="h-5 w-5" />
              <span className="text-xs">All Accounts</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/family/goals")}>
              <Target className="h-5 w-5" />
              <span className="text-xs">All Goals</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/family/mandates")}>
              <ChevronRight className="h-5 w-5" />
              <span className="text-xs">All Mandates</span>
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FamilyManagement;
