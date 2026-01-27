import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import Borrow from "./pages/Borrow";
import Portfolio from "./pages/Portfolio";
import Account from "./pages/Account";
import FundDetail from "./pages/FundDetail";
import CompareFunds from "./pages/CompareFunds";
import Onboarding from "./pages/Onboarding";
import RiskProfile from "./pages/RiskProfile";
import BorrowingPower from "./pages/BorrowingPower";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/fund/:id" element={<FundDetail />} />
          <Route path="/compare" element={<CompareFunds />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/borrowing-power" element={<BorrowingPower />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/account" element={<Account />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/risk-profile" element={<RiskProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
