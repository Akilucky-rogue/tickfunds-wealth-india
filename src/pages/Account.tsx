import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, MapPin, Shield, Bell, 
  FileText, HelpCircle, LogOut, ChevronRight,
  Target, Wallet, CheckCircle2, AlertCircle,
  Users, Heart, ShoppingCart, Settings, Crown
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  
  // Mock KYC status
  const kycStatus = "pending" as "pending" | "verified" | "incomplete";
  const riskProfileStatus = "incomplete" as "incomplete" | "complete";
  const currentPlan = "Family Multiple";

  const menuItems = [
    {
      section: "Family & Accounts",
      items: [
        { icon: Users, label: "Family Members", href: "/family", badge: "3" },
        { icon: Heart, label: "Wishlist", href: "/wishlist" },
        { icon: ShoppingCart, label: "Orders", href: "/orders" },
      ]
    },
    {
      section: "Profile",
      items: [
        { icon: User, label: "Personal Information", href: "#" },
        { icon: Mail, label: "Email & Password", href: "/change-password" },
        { icon: Phone, label: "Phone Number", href: "#" },
        { icon: MapPin, label: "Address", href: "#" }
      ]
    },
    {
      section: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", href: "/settings" },
        { icon: Shield, label: "Privacy & Security", href: "/settings" },
        { icon: Settings, label: "Settings", href: "/settings" }
      ]
    },
    {
      section: "Support",
      items: [
        { icon: FileText, label: "Documents", href: "#" },
        { icon: HelpCircle, label: "Help & Support", href: "/support" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  BV
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h2 className="text-xl font-bold">Bhavesh Vora</h2>
                <p className="text-sm text-muted-foreground">bhavesh.vora@example.com</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plan Card */}
        <Card 
          className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/settings")}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Current Plan</p>
              <p className="text-sm text-muted-foreground">{currentPlan}</p>
            </div>
            <Badge className="bg-primary">Active</Badge>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        {/* KYC & Risk Profile Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer hover:shadow-md transition-shadow ${kycStatus === 'verified' ? 'border-green-500/30' : 'border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20'}`}
            onClick={() => navigate("/onboarding")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${kycStatus === 'verified' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                {kycStatus === 'verified' ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">KYC Status</p>
                  <Badge variant={kycStatus === 'verified' ? 'default' : 'outline'} className={kycStatus === 'verified' ? 'bg-green-600' : 'text-yellow-600 border-yellow-600'}>
                    {kycStatus === 'verified' ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {kycStatus === 'verified' ? 'Your KYC is complete' : 'Complete your KYC to start investing'}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer hover:shadow-md transition-shadow ${riskProfileStatus === 'complete' ? 'border-green-500/30' : 'border-primary/30 bg-primary/5'}`}
            onClick={() => navigate("/risk-profile")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${riskProfileStatus === 'complete' ? 'bg-green-100 dark:bg-green-900' : 'bg-primary/10'}`}>
                <Target className={`h-6 w-6 ${riskProfileStatus === 'complete' ? 'text-green-600' : 'text-primary'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Risk Profile</p>
                  <Badge variant={riskProfileStatus === 'complete' ? 'default' : 'outline'} className={riskProfileStatus === 'complete' ? 'bg-green-600' : ''}>
                    {riskProfileStatus === 'complete' ? 'Moderate' : 'Incomplete'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {riskProfileStatus === 'complete' ? 'Based on your assessment' : 'Take quiz to get personalized recommendations'}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Borrowing Power Card */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20"
          onClick={() => navigate("/borrowing-power")}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Borrowing Power</p>
              <p className="text-sm text-muted-foreground">Check how much you can borrow</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">₹7,25,000</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Active Goals</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Investments</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">2Y</p>
                <p className="text-xs text-muted-foreground">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="text-base">{section.section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <button 
                      className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                      onClick={() => navigate(item.href)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <Badge variant="secondary">{item.badge}</Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                    {itemIndex < section.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-1 pb-4">
          <p>Tickfunds v1.0.0</p>
          <p>Made with ❤️ for Indian Families</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
