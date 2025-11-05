
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  isProfit?: boolean;
  isLoss?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, isProfit = false, isLoss = false }) => {
    let valueColor = 'text-white';
    if (isProfit && parseFloat(value.replace(/[^0-9.-]+/g,"")) > 0) {
        valueColor = 'text-green-400';
    } else if (isLoss && parseFloat(value.replace(/[^0-9.-]+/g,"")) > 0) {
        valueColor = 'text-red-400';
    }

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg shadow-md flex flex-col">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className={`text-3xl font-bold mt-1 ${valueColor}`}>{value}</p>
    </div>
  );
};

export default DashboardCard;
