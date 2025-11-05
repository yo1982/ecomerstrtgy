
import React from 'react';
import { Product, Platform } from '../types';

interface ProductTableProps {
  products: Product[];
  selectedPlatform: Platform;
  onSelectProduct: (product: Product) => void;
  selectedProductId?: string | null;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, selectedPlatform, onSelectProduct, selectedProductId }) => {
  
  const calculateProfit = (product: Product) => {
    const revenue = product.price * product.unitsSold;
    const commission = revenue * selectedPlatform.commissionRate;
    const tax = revenue * selectedPlatform.taxRate;
    const costOfGoods = product.capital * product.unitsSold;
    return revenue - costOfGoods - commission - tax - product.adsBudget;
  };
    
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead className="border-b-2 border-gray-600">
          <tr className="text-gray-400 text-sm">
            <th className="p-3 font-semibold">Product</th>
            <th className="p-3 font-semibold text-right">Price</th>
            <th className="p-3 font-semibold text-right hidden sm:table-cell">Units Sold</th>
            <th className="p-3 font-semibold text-right">Net Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const profit = calculateProfit(product);
            const isSelected = product.id === selectedProductId;
            return (
              <tr
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`border-b border-gray-700 cursor-pointer transition-colors duration-200 ${
                  isSelected ? 'bg-cyan-900/50' : 'hover:bg-gray-700/50'
                }`}
              >
                <td className="p-3 font-medium text-white">{product.name}</td>
                <td className="p-3 text-right">${product.price.toFixed(2)}</td>
                <td className="p-3 text-right hidden sm:table-cell">{product.unitsSold}</td>
                <td className={`p-3 text-right font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {profit >= 0 ? '+' : '-'}${Math.abs(profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
