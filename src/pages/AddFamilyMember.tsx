import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddFamilyMember = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    email: "",
    phone: "",
    pan: "",
    dob: "",
  });

  const relations = [
    "Spouse",
    "Father",
    "Mother",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
    "Guardian",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name || !formData.relation || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Mock add family member
    toast({
      title: "Family Member Added",
      description: `${formData.name} has been added to your family`,
    });
    navigate("/family");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Add Family Member</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
            <CardDescription>
              Add a family member to manage their investments together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name as per PAN"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relation">Relation *</Label>
                <Select 
                  value={formData.relation} 
                  onValueChange={(v) => setFormData({ ...formData, relation: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {relations.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="member@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted rounded-md text-sm">
                    +91
                  </div>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  Optional - Required for KYC verification later
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full">
                  Add Family Member
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  An invitation will be sent to complete their KYC
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default AddFamilyMember;
