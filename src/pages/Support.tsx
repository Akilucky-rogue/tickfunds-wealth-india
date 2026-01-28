import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Phone, Mail, MessageSquare, 
  HelpCircle, FileText, ChevronRight, ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I complete my KYC?",
    answer: "You can complete KYC by going to Account > KYC Status and following the steps. You'll need your PAN, Aadhaar, and bank details. The verification typically takes 24-48 hours."
  },
  {
    question: "What is the minimum investment amount?",
    answer: "For mutual funds, the minimum SIP starts at ₹500 and lumpsum at ₹1,000 depending on the fund. For PMS, minimum is ₹50 lakhs, and for AIF, it's ₹1 crore."
  },
  {
    question: "How do I withdraw my investments?",
    answer: "Go to Portfolio > Select the fund > Click Redeem. Enter the amount or units you want to redeem. The amount will be credited to your registered bank account within 2-5 business days."
  },
  {
    question: "What are the charges for transactions?",
    answer: "There are no transaction charges from Tickfunds. However, mutual funds have expense ratios (typically 0.5-2.5% annually) which are deducted from the fund's NAV."
  },
  {
    question: "How do I add a family member?",
    answer: "Go to Account > Family > Add Member. Enter their details and they'll receive an invitation to complete their KYC. Once verified, you can manage investments for the entire family."
  },
  {
    question: "How is borrowing power calculated?",
    answer: "Borrowing power is calculated based on your portfolio value (50-80% of holdings as collateral) and income (FOIR-based affordability). The combined limit considers both factors."
  },
];

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Query Submitted",
      description: "Our team will respond within 24 hours",
    });
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <main className="container px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Phone className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-sm font-medium">Call Us</p>
              <p className="text-xs text-muted-foreground">1800-123-4567</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Mail className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">support@tickfunds.com</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-sm font-medium">Chat</p>
              <p className="text-xs text-muted-foreground">Live Chat</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Query</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What's your question about?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question in detail..."
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit Query
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "User Guide", icon: FileText },
              { label: "Video Tutorials", icon: ExternalLink },
              { label: "Investment Glossary", icon: FileText },
              { label: "Regulatory Information", icon: FileText },
            ].map((item, i) => (
              <button 
                key={i}
                className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Office Address */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Registered Office</h3>
            <p className="text-sm text-muted-foreground">
              Tickfunds Wealth Management Pvt. Ltd.<br />
              123, Financial District, BKC<br />
              Mumbai - 400051, Maharashtra<br />
              India
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              SEBI Registered | AMFI Certified<br />
              CIN: U67190MH2020PTC123456
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Support;
