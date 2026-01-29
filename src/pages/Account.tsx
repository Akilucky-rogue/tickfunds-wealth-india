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
  Users, Heart, ShoppingCart, Settings, Crown,
  CreditCard, Banknote, ArrowLeft
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Account = () => {
  const navigate = useNavigate();
  const [contextMode, setContextMode] = useState<"self" | "family">("self");
  
  // Mock KYC status
  const kycStatus = {
    self: "pending" as "pending" | "verified" | "incomplete",
    family: [
      { name: "Priya Vora", status: "verified" },
      { name: "Rohan Vora", status: "pending" }
    ]
  };
  
  const riskProfileStatus = "incomplete" as "incomplete" | "complete";
  const currentPlan = "Family Multiple";

  // Mock accounts data
  const accountsData = {
    self: {
      demat: "1234567890",
      bank: "HDFC Bank - ****4567",
      pan: "ABCDE1234F"
    },
    family: [
      { name: "Priya Vora", demat: "0987654321", bank: "ICICI Bank - ****7890" },
      { name: "Rohan Vora", demat: "5678901234", bank: "SBI - ****1234" }
    ]
  };

  // Mock mandates data
  const mandatesData = {
    self: [
      { bank: "HDFC Bank", type: "E-Mandate", limit: 100000, status: "Active" },
      { bank: "ICICI Bank", type: "NACH", limit: 50000, status: "Active" }
    ],
    family: [
      { member: "Priya Vora", bank: "ICICI Bank", limit: 75000, status: "Active" }
    ]
  };

  const menuItems = [
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
        {/* Profile Header */}
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

        {/* Main Tabs: Plan, KYC, Accounts, Mandates, Security, etc. */}
        <Tabs defaultValue="plan" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="plan" className="text-xs py-2">Plan</TabsTrigger>
            <TabsTrigger value="kyc" className="text-xs py-2">KYC</TabsTrigger>
            <TabsTrigger value="accounts" className="text-xs py-2">Accounts</TabsTrigger>
            <TabsTrigger value="mandates" className="text-xs py-2">Mandates</TabsTrigger>
            <TabsTrigger value="security" className="text-xs py-2">Security</TabsTrigger>
          </TabsList>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Current Plan</p>
                    <p className="text-sm text-muted-foreground">{currentPlan}</p>
                  </div>
                  <Badge className="bg-primary">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Plan Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Up to 5 family members
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      All asset classes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Priority support
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="default" className="w-full">Upgrade</Button>
                  <Button variant="outline" className="w-full">Downgrade</Button>
                </div>
              </CardContent>
            </Card>

            {/* Plan Types */}
            <div className="grid gap-3">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Self Single</p>
                    <p className="text-sm text-muted-foreground">For individual investors</p>
                  </div>
                  <Badge variant="outline">₹199/mo</Badge>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Self Multiple</p>
                    <p className="text-sm text-muted-foreground">Multiple accounts for yourself</p>
                  </div>
                  <Badge variant="outline">₹399/mo</Badge>
                </CardContent>
              </Card>
              <Card className="border-primary cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Family Multiple</p>
                    <Badge className="bg-primary text-xs">Current</Badge>
                  </div>
                  <Badge variant="outline">₹599/mo</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* KYC Tab */}
          <TabsContent value="kyc" className="space-y-4">
            {/* Context Toggle */}
            <div className="flex gap-2">
              <Button 
                variant={contextMode === "self" ? "default" : "outline"} 
                size="sm"
                onClick={() => setContextMode("self")}
              >
                Self
              </Button>
              <Button 
                variant={contextMode === "family" ? "default" : "outline"} 
                size="sm"
                onClick={() => setContextMode("family")}
              >
                Family
              </Button>
            </div>

            {contextMode === "self" ? (
              <Card 
                className={`cursor-pointer hover:shadow-md transition-shadow ${kycStatus.self === 'verified' ? 'border-green-500/30' : 'border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20'}`}
                onClick={() => navigate("/onboarding")}
              >
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${kycStatus.self === 'verified' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                    {kycStatus.self === 'verified' ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">KYC Status</p>
                      <Badge variant={kycStatus.self === 'verified' ? 'default' : 'outline'} className={kycStatus.self === 'verified' ? 'bg-green-600' : 'text-yellow-600 border-yellow-600'}>
                        {kycStatus.self === 'verified' ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {kycStatus.self === 'verified' ? 'Your KYC is complete' : 'Complete your KYC to start investing'}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {kycStatus.family.map((member, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer hover:shadow-md transition-shadow ${member.status === 'verified' ? 'border-green-500/30' : 'border-yellow-500/30'}`}
                    onClick={() => navigate("/onboarding")}
                  >
                    <CardContent className="pt-4 flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <Badge variant={member.status === 'verified' ? 'default' : 'outline'} className={member.status === 'verified' ? 'bg-green-600' : 'text-yellow-600 border-yellow-600'}>
                          {member.status === 'verified' ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate("/family/add")}>
                  <Users className="h-4 w-4 mr-2" />
                  Add Family Member
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-4">
            {/* Context Toggle */}
            <div className="flex gap-2">
              <Button 
                variant={contextMode === "self" ? "default" : "outline"} 
                size="sm"
                onClick={() => setContextMode("self")}
              >
                Self
              </Button>
              <Button 
                variant={contextMode === "family" ? "default" : "outline"} 
                size="sm"
                onClick={() => setContextMode("family")}
              >
                Family
              </Button>
            </div>

            {contextMode === "self" ? (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Demat Account</p>
                        <p className="text-sm text-muted-foreground">{accountsData.self.demat}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Banknote className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-muted-foreground">{accountsData.self.bank}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">PAN</p>
                        <p className="text-sm text-muted-foreground">{accountsData.self.pan}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">Verified</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {accountsData.family.map((member, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Demat</span>
                        <span className="text-sm">{member.demat}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Bank</span>
                        <span className="text-sm">{member.bank}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Mandates Tab */}
          <TabsContent value="mandates" className="space-y-4">
            {/* Context Toggle */}
            <div className="flex gap-2">
              <Button 
                variant={contextMode === "self" ? "default" : "outline"} 
                size="sm"
                onClick={() => setContextMode("self")}
              >
                Self
              </Button>
              <Button 
                variant={contextMode === "family" ? "default" : "outline"} 
                size="sm"
                onClick={() => setContextMode("family")}
              >
                Family
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Active payment mandates</p>
              <Button size="sm" variant="outline">Add Mandate</Button>
            </div>

            {contextMode === "self" ? (
              <div className="space-y-3">
                {mandatesData.self.map((mandate, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{mandate.bank}</p>
                          <p className="text-sm text-muted-foreground">{mandate.type}</p>
                        </div>
                        <Badge className="bg-green-600">{mandate.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Limit</span>
                        <span className="font-semibold">₹{mandate.limit.toLocaleString('en-IN')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {mandatesData.family.map((mandate, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{mandate.member}</p>
                          <p className="text-sm text-muted-foreground">{mandate.bank}</p>
                        </div>
                        <Badge className="bg-green-600">{mandate.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Limit</span>
                        <span className="font-semibold">₹{mandate.limit.toLocaleString('en-IN')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/risk-profile")}
            >
              <CardContent className="pt-4 flex items-center gap-4">
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

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/borrowing-power")}
            >
              <CardContent className="pt-4 flex items-center gap-4">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <button 
                  className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                  onClick={() => navigate("/change-password")}
                >
                  <span className="font-medium">Change Password</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <Separator />
                <button 
                  className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                  onClick={() => navigate("/manage-pin")}
                >
                  <span className="font-medium">Manage PIN</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <Separator />
                <button 
                  className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                  onClick={() => navigate("/settings")}
                >
                  <span className="font-medium">Biometric & 2FA</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/family")}>
            <CardContent className="pt-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs font-medium">Family</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/wishlist")}>
            <CardContent className="pt-4 text-center">
              <Heart className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs font-medium">Wishlist</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/orders")}>
            <CardContent className="pt-4 text-center">
              <ShoppingCart className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs font-medium">Orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Card */}
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

        {/* Menu Items */}
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
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                    {itemIndex < section.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sign Out */}
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
