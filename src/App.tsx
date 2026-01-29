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
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import ManagePin from "./pages/ManagePin";
import FamilyManagement from "./pages/FamilyManagement";
import AddFamilyMember from "./pages/AddFamilyMember";
import WishList from "./pages/WishList";
import Orders from "./pages/Orders";
import CompanyFD from "./pages/CompanyFD";
import Bonds from "./pages/Bonds";
import DigitalGold from "./pages/DigitalGold";
import PMSAIF from "./pages/PMSAIF";
import Support from "./pages/Support";
import Alerts from "./pages/Alerts";
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
          <Route path="/settings" element={<Settings />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/manage-pin" element={<ManagePin />} />
          <Route path="/family" element={<FamilyManagement />} />
          <Route path="/family/add" element={<AddFamilyMember />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/fd" element={<CompanyFD />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/gold" element={<DigitalGold />} />
          <Route path="/pms-aif" element={<PMSAIF />} />
          <Route path="/support" element={<Support />} />
          <Route path="/alerts" element={<Alerts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
