import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Tickfunds</h3>
            <p className="text-sm text-muted-foreground">
              Empowering Indian families to build wealth through smart investing and financial planning.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Mutual Funds</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Goal Planning</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Portfolio Tracker</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Risk Assessment</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Disclaimer</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SEBI Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Tickfunds. All rights reserved.</p>
          <p className="text-center md:text-right">
            Registered with SEBI | Mutual Fund investments are subject to market risks
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
