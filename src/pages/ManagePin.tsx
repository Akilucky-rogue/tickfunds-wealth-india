import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type PinMode = "view" | "create" | "change" | "verify";

const ManagePin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [hasPin, setHasPin] = useState(true); // Mock - user already has PIN
  const [mode, setMode] = useState<PinMode>("view");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleCreatePin = () => {
    if (newPin.length !== 4 || confirmPin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4 digits",
        variant: "destructive",
      });
      return;
    }

    if (newPin !== confirmPin) {
      toast({
        title: "PIN Mismatch",
        description: "PINs do not match. Please try again.",
        variant: "destructive",
      });
      setNewPin("");
      setConfirmPin("");
      return;
    }

    // Mock PIN creation
    setHasPin(true);
    setMode("view");
    setNewPin("");
    setConfirmPin("");
    toast({
      title: "PIN Created",
      description: "Your transaction PIN has been set successfully",
    });
  };

  const handleChangePin = () => {
    if (currentPin !== "1234") { // Mock current PIN
      toast({
        title: "Incorrect PIN",
        description: "Current PIN is incorrect",
        variant: "destructive",
      });
      return;
    }

    if (newPin.length !== 4 || confirmPin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4 digits",
        variant: "destructive",
      });
      return;
    }

    if (newPin !== confirmPin) {
      toast({
        title: "PIN Mismatch",
        description: "New PINs do not match",
        variant: "destructive",
      });
      setNewPin("");
      setConfirmPin("");
      return;
    }

    // Mock PIN change
    setMode("view");
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    toast({
      title: "PIN Changed",
      description: "Your transaction PIN has been updated",
    });
  };

  const handleDeletePin = () => {
    setHasPin(false);
    toast({
      title: "PIN Removed",
      description: "Your transaction PIN has been removed",
    });
  };

  const renderPinInput = (value: string, onChange: (v: string) => void, label: string) => (
    <div className="space-y-3">
      <p className="text-sm font-medium text-center">{label}</p>
      <div className="flex justify-center">
        <InputOTP maxLength={4} value={value} onChange={onChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => mode === "view" ? navigate(-1) : setMode("view")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Manage PIN</h1>
        </div>

        {mode === "view" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Transaction PIN
                </CardTitle>
                <CardDescription>
                  Your PIN is used to authorize transactions and sensitive operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasPin ? (
                  <>
                    <div className="flex items-center justify-center gap-2 py-4">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      PIN is set and active
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setMode("change")}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Change PIN
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={handleDeletePin}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove PIN
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center py-6 space-y-2">
                      <Lock className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">No PIN set</p>
                      <p className="text-sm text-muted-foreground">
                        Set a 4-digit PIN for secure transactions
                      </p>
                    </div>
                    <Button className="w-full" onClick={() => setMode("create")}>
                      Create PIN
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">PIN Security Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Never share your PIN with anyone</li>
                    <li>Avoid using birth dates or sequential numbers</li>
                    <li>Change your PIN regularly</li>
                    <li>Don't write down your PIN</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {mode === "create" && (
          <Card>
            <CardHeader>
              <CardTitle>Create Transaction PIN</CardTitle>
              <CardDescription>
                Set a 4-digit PIN to secure your transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderPinInput(newPin, setNewPin, "Enter New PIN")}
              {newPin.length === 4 && (
                renderPinInput(confirmPin, setConfirmPin, "Confirm PIN")
              )}
              <Button 
                className="w-full" 
                onClick={handleCreatePin}
                disabled={newPin.length !== 4 || confirmPin.length !== 4}
              >
                Create PIN
              </Button>
            </CardContent>
          </Card>
        )}

        {mode === "change" && (
          <Card>
            <CardHeader>
              <CardTitle>Change Transaction PIN</CardTitle>
              <CardDescription>
                Enter your current PIN and set a new one
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderPinInput(currentPin, setCurrentPin, "Enter Current PIN")}
              {currentPin.length === 4 && (
                <>
                  {renderPinInput(newPin, setNewPin, "Enter New PIN")}
                  {newPin.length === 4 && (
                    renderPinInput(confirmPin, setConfirmPin, "Confirm New PIN")
                  )}
                </>
              )}
              <Button 
                className="w-full" 
                onClick={handleChangePin}
                disabled={currentPin.length !== 4 || newPin.length !== 4 || confirmPin.length !== 4}
              >
                Update PIN
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default ManagePin;
