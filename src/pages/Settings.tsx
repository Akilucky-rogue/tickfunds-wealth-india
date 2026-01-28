import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, ChevronRight, Lock, Fingerprint, Shield,
  Bell, Mail, MessageSquare, Sun, Moon, Monitor,
  IndianRupee, Globe, FileText, HelpCircle, Phone,
  Key, Smartphone, ArrowLeft
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const navigate = useNavigate();
  
  // Mock settings state
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
  
  // Mock plan data
  const currentPlan = "Family Multiple";
  const planFeatures = ["Up to 5 family members", "All asset classes", "Priority support"];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Plan Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Current Plan
              </CardTitle>
              <Badge variant="default" className="bg-primary">{currentPlan}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm text-muted-foreground space-y-1">
              {planFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("/plans")}>
                Upgrade Plan
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Downgrade
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button 
              className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
              onClick={() => navigate("/change-password")}
            >
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Change Password</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <Separator />
            
            <button 
              className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
              onClick={() => navigate("/manage-pin")}
            >
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Manage PIN</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <Separator />
            
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Biometric Login</span>
                  <p className="text-sm text-muted-foreground">Use fingerprint or Face ID</p>
                </div>
              </div>
              <Switch 
                checked={biometricEnabled} 
                onCheckedChange={setBiometricEnabled}
              />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">2 Factor Authentication</span>
                  <p className="text-sm text-muted-foreground">Extra security for your account</p>
                </div>
              </div>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Push Notifications</span>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Email Notifications</span>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">SMS Alerts</span>
              </div>
              <Switch 
                checked={smsAlerts} 
                onCheckedChange={setSmsAlerts}
              />
            </div>
          </CardContent>
        </Card>

        {/* Theme Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={(v) => setTheme(v as typeof theme)} className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="light" className="font-medium cursor-pointer">Day</Label>
                </div>
                <RadioGroupItem value="light" id="light" />
              </div>
              <Separator />
              <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="dark" className="font-medium cursor-pointer">Night</Label>
                </div>
                <RadioGroupItem value="dark" id="dark" />
              </div>
              <Separator />
              <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="auto" className="font-medium cursor-pointer">Auto</Label>
                </div>
                <RadioGroupItem value="auto" id="auto" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <IndianRupee className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Currency</span>
              </div>
              <Badge variant="outline">INR</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Language</span>
              </div>
              <Badge variant="outline">English</Badge>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Privacy Policy</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <Separator />
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Terms & Conditions</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <Separator />
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Contact Us</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Support</CardTitle>
          </CardHeader>
          <CardContent>
            <button 
              className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
              onClick={() => navigate("/support")}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Help & Support</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
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

export default Settings;
