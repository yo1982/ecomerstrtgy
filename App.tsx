
import React, { useState, useMemo } from 'react';
import { Product, Platform } from './types';
import DashboardCard from './components/DashboardCard';
import ProductTable from './components/ProductTable';
import StrategyAdvisor from './components/StrategyAdvisor';
import SalesChart from './components/SalesChart';

// --- Mock Data ---
const PLATFORMS: Platform[] = [
  { id: 'amazon', name: 'Amazon', commissionRate: 0.15, taxRate: 0.08 },
  { id: 'shopify', name: 'Shopify', commissionRate: 0.029, taxRate: 0.08 },
  { id: 'etsy', name: 'Etsy', commissionRate: 0.065, taxRate: 0.08 },
];

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Wireless Headphones', capital: 45, price: 99.99, unitsSold: 120, competitorPrices: [95, 105, 98], adsBudget: 500, seoScore: 85, rating: 4.8 },
  { id: 'p2', name: 'Ergonomic Keyboard', capital: 70, price: 129.99, unitsSold: 75, competitorPrices: [135, 125], adsBudget: 300, seoScore: 92, rating: 4.9 },
  { id: 'p3', name: 'Smart Water Bottle', capital: 15, price: 39.99, unitsSold: 350, competitorPrices: [42, 38, 39], adsBudget: 800, seoScore: 78, rating: 4.5 },
  { id: 'p4', name: 'Gaming Mouse', capital: 30, price: 59.99, unitsSold: 210, competitorPrices: [65, 58], adsBudget: 450, seoScore: 88, rating: 4.7 },
  { id: 'p5', name: 'Yoga Mat (Eco-Friendly)', capital: 22, price: 25.99, unitsSold: 90, competitorPrices: [30, 28], adsBudget: 150, seoScore: 70, rating: 4.2 },
];
// --- End Mock Data ---


const App: React.FC = () => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [platforms] = useState<Platform[]>(PLATFORMS);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platforms[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);

  const platformData = useMemo(() => {
    const revenue = products.reduce((acc, p) => acc + p.price * p.unitsSold, 0);
    const costOfGoods = products.reduce((acc, p) => acc + p.capital * p.unitsSold, 0);
    const commissions = revenue * selectedPlatform.commissionRate;
    const taxes = revenue * selectedPlatform.taxRate;
    const ads = products.reduce((acc, p) => acc + p.adsBudget, 0);
    
    const totalExpenses = costOfGoods + commissions + taxes + ads;
    const grossProfit = revenue - totalExpenses;
    
    return {
      totalRevenue: revenue,
      totalProfit: grossProfit > 0 ? grossProfit : 0,
      totalLoss: grossProfit < 0 ? Math.abs(grossProfit) : 0,
    };
  }, [products, selectedPlatform]);

  const salesChartData = useMemo(() => {
    return products.map(product => {
      const revenue = product.price * product.unitsSold;
      const costOfGoods = product.capital * product.unitsSold;
      const commission = revenue * selectedPlatform.commissionRate;
      const tax = revenue * selectedPlatform.taxRate;
      
      const profit = revenue - costOfGoods - commission - tax - product.adsBudget;
      
      return {
        productName: product.name,
        profit: profit > 0 ? profit : 0,
        loss: profit < 0 ? Math.abs(profit) : 0,
      };
    });
  }, [products, selectedPlatform]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">E-Commerce Strategy Advisor</h1>
          <p className="text-gray-400 mt-2">Centralized control panel for multi-platform sales analysis and AI-powered strategy.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Platform Selector & Metrics */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-0">Platform Overview</h2>
                <div className="flex space-x-2 bg-gray-700 rounded-full p-1">
                  {platforms.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlatform(p)}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${selectedPlatform.id === p.id ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <DashboardCard title="Total Revenue" value={`$${platformData.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                <DashboardCard title="Net Profit" value={`$${platformData.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} isProfit={true}/>
                <DashboardCard title="Net Loss" value={`$${platformData.totalLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} isLoss={true} />
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">Product Performance</h2>
                <ProductTable 
                    products={products}
                    selectedPlatform={selectedPlatform}
                    onSelectProduct={setSelectedProduct}
                    selectedProductId={selectedProduct?.id}
                />
            </div>
            
             {/* Sales Chart */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                 <h2 className="text-2xl font-semibold text-white mb-4">Profit/Loss by Product</h2>
                 <SalesChart data={salesChartData} />
            </div>

          </div>

          {/* Right Column (Sticky) */}
          <aside className="lg:col-span-4">
             <div className="sticky top-8">
                <StrategyAdvisor 
                    key={selectedProduct?.id} // Re-mount component on product change
                    product={selectedProduct} 
                    platform={selectedPlatform}
                />
             </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default App;
