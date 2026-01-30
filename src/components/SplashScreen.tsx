import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="h-20 w-20 bg-primary-foreground rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-primary font-bold text-4xl">T</span>
        </div>
        <h1 className="text-3xl font-bold text-primary-foreground">Tick Funds</h1>
        <p className="text-primary-foreground/70 text-sm">Your Wealth Partner</p>
      </div>
    </div>
  );
};

export default SplashScreen;
