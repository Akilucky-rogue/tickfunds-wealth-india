import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password validation rules
  const validations = [
    { label: "At least 8 characters", valid: newPassword.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(newPassword) },
    { label: "One lowercase letter", valid: /[a-z]/.test(newPassword) },
    { label: "One number", valid: /\d/.test(newPassword) },
    { label: "One special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ];

  const allValid = validations.every(v => v.valid);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allValid || !passwordsMatch) {
      toast({
        title: "Invalid Password",
        description: "Please meet all password requirements",
        variant: "destructive",
      });
      return;
    }

    // Mock password change
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully",
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Change Password</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Update your password</CardTitle>
            <CardDescription>
              Enter your current password and choose a new secure password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowCurrent(!showCurrent)}
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <div className="relative">
                  <Input
                    id="new"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Password Requirements */}
              {newPassword.length > 0 && (
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium">Password Requirements:</p>
                  {validations.map((validation, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {validation.valid ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                      <span className={validation.valid ? "text-green-600" : "text-muted-foreground"}>
                        {validation.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {confirmPassword.length > 0 && (
                  <p className={`text-sm ${passwordsMatch ? "text-green-600" : "text-destructive"}`}>
                    {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={!allValid || !passwordsMatch || !currentPassword}
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default ChangePassword;
