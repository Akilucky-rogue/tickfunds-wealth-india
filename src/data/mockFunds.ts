// Mock data for Indian mutual funds

export interface Fund {
  id: string;
  name: string;
  fundHouse: string;
  category: string;
  subCategory: string;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  returns: {
    "1Y": number;
    "3Y": number;
    "5Y": number;
  };
  minInvestment: number;
  aum: number; // in crores
  expenseRatio: number;
  rating: number; // 1-5 stars
  nav: number;
  holdings: {
    name: string;
    percentage: number;
    sector: string;
  }[];
  sectorAllocation: {
    sector: string;
    percentage: number;
  }[];
}

export const mockFunds: Fund[] = [
  {
    id: "fund-1",
    name: "Axis Bluechip Fund",
    fundHouse: "Axis",
    category: "Equity",
    subCategory: "Large Cap",
    riskLevel: "High",
    returns: { "1Y": 18.5, "3Y": 12.3, "5Y": 14.8 },
    minInvestment: 500,
    aum: 35420,
    expenseRatio: 1.68,
    rating: 5,
    nav: 48.56,
    holdings: [
      { name: "Reliance Industries", percentage: 9.2, sector: "Energy" },
      { name: "HDFC Bank", percentage: 8.5, sector: "Financial Services" },
      { name: "Infosys", percentage: 7.8, sector: "IT" },
      { name: "TCS", percentage: 6.4, sector: "IT" },
      { name: "ICICI Bank", percentage: 5.9, sector: "Financial Services" },
      { name: "Bharti Airtel", percentage: 4.2, sector: "Telecom" },
      { name: "ITC", percentage: 3.8, sector: "FMCG" },
      { name: "Kotak Bank", percentage: 3.5, sector: "Financial Services" },
      { name: "L&T", percentage: 3.1, sector: "Infrastructure" },
      { name: "Others", percentage: 47.6, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Financial Services", percentage: 32.5 },
      { sector: "IT", percentage: 18.4 },
      { sector: "Energy", percentage: 12.8 },
      { sector: "FMCG", percentage: 10.2 },
      { sector: "Pharma", percentage: 8.6 },
      { sector: "Infrastructure", percentage: 7.2 },
      { sector: "Others", percentage: 10.3 }
    ]
  },
  {
    id: "fund-2",
    name: "Mirae Asset Large Cap Fund",
    fundHouse: "Mirae",
    category: "Equity",
    subCategory: "Large Cap",
    riskLevel: "High",
    returns: { "1Y": 16.8, "3Y": 11.9, "5Y": 15.2 },
    minInvestment: 1000,
    aum: 28650,
    expenseRatio: 1.52,
    rating: 5,
    nav: 72.34,
    holdings: [
      { name: "HDFC Bank", percentage: 10.1, sector: "Financial Services" },
      { name: "Reliance Industries", percentage: 8.8, sector: "Energy" },
      { name: "Infosys", percentage: 7.2, sector: "IT" },
      { name: "TCS", percentage: 5.9, sector: "IT" },
      { name: "ICICI Bank", percentage: 5.4, sector: "Financial Services" },
      { name: "Others", percentage: 62.6, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Financial Services", percentage: 35.2 },
      { sector: "IT", percentage: 16.8 },
      { sector: "Energy", percentage: 11.5 },
      { sector: "Consumer", percentage: 9.8 },
      { sector: "Others", percentage: 26.7 }
    ]
  },
  {
    id: "fund-3",
    name: "HDFC Flexi Cap Fund",
    fundHouse: "HDFC",
    category: "Equity",
    subCategory: "Flexicap",
    riskLevel: "High",
    returns: { "1Y": 22.4, "3Y": 18.6, "5Y": 16.1 },
    minInvestment: 100,
    aum: 42800,
    expenseRatio: 1.74,
    rating: 4,
    nav: 1456.78,
    holdings: [
      { name: "ICICI Bank", percentage: 8.9, sector: "Financial Services" },
      { name: "Axis Bank", percentage: 6.2, sector: "Financial Services" },
      { name: "NTPC", percentage: 5.8, sector: "Energy" },
      { name: "Coal India", percentage: 4.5, sector: "Mining" },
      { name: "SBI", percentage: 4.2, sector: "Financial Services" },
      { name: "Others", percentage: 70.4, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Financial Services", percentage: 28.4 },
      { sector: "Energy", percentage: 14.2 },
      { sector: "IT", percentage: 12.6 },
      { sector: "Capital Goods", percentage: 11.8 },
      { sector: "Others", percentage: 33.0 }
    ]
  },
  {
    id: "fund-4",
    name: "SBI Small Cap Fund",
    fundHouse: "SBI",
    category: "Equity",
    subCategory: "Small Cap",
    riskLevel: "Very High",
    returns: { "1Y": 28.6, "3Y": 24.2, "5Y": 22.8 },
    minInvestment: 500,
    aum: 18560,
    expenseRatio: 1.82,
    rating: 5,
    nav: 142.56,
    holdings: [
      { name: "Finolex Industries", percentage: 3.2, sector: "Manufacturing" },
      { name: "Carborundum Universal", percentage: 2.8, sector: "Capital Goods" },
      { name: "Kalpataru Projects", percentage: 2.5, sector: "Infrastructure" },
      { name: "Blue Star", percentage: 2.3, sector: "Consumer Durables" },
      { name: "Others", percentage: 89.2, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Capital Goods", percentage: 22.4 },
      { sector: "Consumer", percentage: 18.6 },
      { sector: "Chemicals", percentage: 14.2 },
      { sector: "Financial Services", percentage: 12.8 },
      { sector: "Others", percentage: 32.0 }
    ]
  },
  {
    id: "fund-5",
    name: "Kotak Emerging Equity Fund",
    fundHouse: "Kotak",
    category: "Equity",
    subCategory: "Midcap",
    riskLevel: "Very High",
    returns: { "1Y": 25.4, "3Y": 20.8, "5Y": 19.2 },
    minInvestment: 1000,
    aum: 32450,
    expenseRatio: 1.65,
    rating: 4,
    nav: 89.24,
    holdings: [
      { name: "Persistent Systems", percentage: 4.1, sector: "IT" },
      { name: "Supreme Industries", percentage: 3.8, sector: "Manufacturing" },
      { name: "Coforge", percentage: 3.5, sector: "IT" },
      { name: "Oberoi Realty", percentage: 3.2, sector: "Real Estate" },
      { name: "Others", percentage: 85.4, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "IT", percentage: 18.2 },
      { sector: "Financial Services", percentage: 16.4 },
      { sector: "Healthcare", percentage: 14.8 },
      { sector: "Consumer", percentage: 12.6 },
      { sector: "Others", percentage: 38.0 }
    ]
  },
  {
    id: "fund-6",
    name: "ICICI Pru Liquid Fund",
    fundHouse: "ICICI",
    category: "Debt",
    subCategory: "Liquid",
    riskLevel: "Low",
    returns: { "1Y": 6.8, "3Y": 5.4, "5Y": 5.9 },
    minInvestment: 100,
    aum: 45200,
    expenseRatio: 0.25,
    rating: 5,
    nav: 3245.67,
    holdings: [
      { name: "Treasury Bills", percentage: 35.2, sector: "Government" },
      { name: "Commercial Papers", percentage: 28.4, sector: "Corporate" },
      { name: "Certificates of Deposit", percentage: 22.6, sector: "Banking" },
      { name: "Others", percentage: 13.8, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Government Securities", percentage: 35.2 },
      { sector: "Banking", percentage: 32.4 },
      { sector: "NBFC", percentage: 18.6 },
      { sector: "Others", percentage: 13.8 }
    ]
  },
  {
    id: "fund-7",
    name: "HDFC Balanced Advantage Fund",
    fundHouse: "HDFC",
    category: "Hybrid",
    subCategory: "Balanced Advantage",
    riskLevel: "Moderate",
    returns: { "1Y": 14.2, "3Y": 12.8, "5Y": 11.6 },
    minInvestment: 500,
    aum: 52680,
    expenseRatio: 1.48,
    rating: 4,
    nav: 324.56,
    holdings: [
      { name: "HDFC Bank", percentage: 6.8, sector: "Financial Services" },
      { name: "Reliance Industries", percentage: 5.4, sector: "Energy" },
      { name: "Government Securities", percentage: 25.2, sector: "Debt" },
      { name: "Others", percentage: 62.6, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Debt", percentage: 38.4 },
      { sector: "Financial Services", percentage: 22.6 },
      { sector: "IT", percentage: 12.4 },
      { sector: "Energy", percentage: 8.8 },
      { sector: "Others", percentage: 17.8 }
    ]
  },
  {
    id: "fund-8",
    name: "Parag Parikh Flexi Cap Fund",
    fundHouse: "PPFAS",
    category: "Equity",
    subCategory: "Flexicap",
    riskLevel: "High",
    returns: { "1Y": 19.8, "3Y": 16.4, "5Y": 18.2 },
    minInvestment: 1000,
    aum: 38420,
    expenseRatio: 1.24,
    rating: 5,
    nav: 68.42,
    holdings: [
      { name: "Alphabet Inc", percentage: 6.2, sector: "Technology" },
      { name: "Microsoft Corp", percentage: 5.8, sector: "Technology" },
      { name: "HDFC Bank", percentage: 5.4, sector: "Financial Services" },
      { name: "ITC", percentage: 4.8, sector: "FMCG" },
      { name: "Bajaj Holdings", percentage: 4.2, sector: "Financial Services" },
      { name: "Others", percentage: 73.6, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Technology", percentage: 24.5 },
      { sector: "Financial Services", percentage: 22.8 },
      { sector: "FMCG", percentage: 14.6 },
      { sector: "IT Services", percentage: 12.4 },
      { sector: "Others", percentage: 25.7 }
    ]
  },
  {
    id: "fund-9",
    name: "Nippon India Small Cap Fund",
    fundHouse: "Nippon",
    category: "Equity",
    subCategory: "Small Cap",
    riskLevel: "Very High",
    returns: { "1Y": 32.4, "3Y": 28.6, "5Y": 24.8 },
    minInvestment: 100,
    aum: 28640,
    expenseRatio: 1.86,
    rating: 4,
    nav: 124.68,
    holdings: [
      { name: "Tube Investments", percentage: 2.8, sector: "Auto" },
      { name: "KPIT Technologies", percentage: 2.6, sector: "IT" },
      { name: "Multi Commodity Exchange", percentage: 2.4, sector: "Financial Services" },
      { name: "Others", percentage: 92.2, sector: "Various" }
    ],
    sectorAllocation: [
      { sector: "Capital Goods", percentage: 20.4 },
      { sector: "Financial Services", percentage: 16.8 },
      { sector: "Healthcare", percentage: 14.2 },
      { sector: "Consumer", percentage: 12.6 },
      { sector: "Others", percentage: 36.0 }
    ]
  },
  {
    id: "fund-10",
    name: "Tata Digital India Fund",
    fundHouse: "Tata",
    category: "Equity",
    subCategory: "Sectoral",
    riskLevel: "Very High",
    returns: { "1Y": 15.6, "3Y": 8.4, "5Y": 21.2 },
    minInvestment: 500,
    aum: 8420,
    expenseRatio: 0.42,
    rating: 4,
    nav: 42.86,
    holdings: [
      { name: "Infosys", percentage: 18.4, sector: "IT" },
      { name: "TCS", percentage: 16.2, sector: "IT" },
      { name: "HCL Tech", percentage: 8.6, sector: "IT" },
      { name: "Wipro", percentage: 6.4, sector: "IT" },
      { name: "Tech Mahindra", percentage: 5.8, sector: "IT" },
      { name: "Others", percentage: 44.6, sector: "IT" }
    ],
    sectorAllocation: [
      { sector: "IT Services", percentage: 68.4 },
      { sector: "Software Products", percentage: 18.6 },
      { sector: "IT Consulting", percentage: 8.4 },
      { sector: "Others", percentage: 4.6 }
    ]
  }
];

export const fundHouses = ["Axis", "Mirae", "HDFC", "SBI", "Kotak", "ICICI", "PPFAS", "Nippon", "Tata"];
export const riskLevels = ["Low", "Moderate", "High", "Very High"];
export const categories = ["Equity", "Debt", "Hybrid", "Solution", "Others"];
