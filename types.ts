
export interface Platform {
  id: string;
  name: string;
  commissionRate: number;
  taxRate: number;
}

export interface Product {
  id: string;
  name: string;
  capital: number;
  price: number;
  competitorPrices: number[];
  unitsSold: number;
  adsBudget: number;
  seoScore: number; // 0-100
  rating: number; // 0-5
}

export interface SaleData {
  productName: string;
  profit: number;
  loss: number;
}
