import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, Mail, Phone, MapPin, Shield, Bell, 
  FileText, HelpCircle, LogOut, ChevronRight 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Account = () => {
  const menuItems = [
    {
      section: "Profile",
      items: [
        { icon: User, label: "Personal Information", href: "#" },
        { icon: Mail, label: "Email & Password", href: "#" },
        { icon: Phone, label: "Phone Number", href: "#" },
        { icon: MapPin, label: "Address", href: "#" }
      ]
    },
    {
      section: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", href: "#" },
        { icon: Shield, label: "Privacy & Security", href: "#" }
      ]
    },
    {
      section: "Support",
      items: [
        { icon: FileText, label: "Documents", href: "#" },
        { icon: HelpCircle, label: "Help & Support", href: "#" }
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
              <Button variant="outline">Edit</Button>
            </div>
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
                    <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
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
