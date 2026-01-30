import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo with scale animation */}
        <div className="animate-scale-in">
          <div className="h-24 w-24 bg-primary-foreground rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            <span className="text-primary font-bold text-5xl">T</span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {/* Title with fade animation */}
        <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-3xl font-bold text-primary-foreground">Tick Funds</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Your Wealth Partner</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 mt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="h-1 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-foreground rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-primary-foreground/50 text-xs text-center mt-2">
            Loading...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
