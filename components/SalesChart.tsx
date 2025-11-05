
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SaleData } from '../types';

interface SalesChartProps {
  data: SaleData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis 
            dataKey="productName" 
            tick={{ fill: '#A0AEC0' }} 
            angle={-15}
            textAnchor="end"
            height={70}
            interval={0}
            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
          />
          <YAxis tick={{ fill: '#A0AEC0' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #2D3748', color: '#E2E8F0' }}
            cursor={{fill: 'rgba(74, 85, 104, 0.3)'}}
          />
          <Legend wrapperStyle={{ color: '#E2E8F0' }} />
          <Bar dataKey="profit" fill="#48BB78" name="Profit" />
          <Bar dataKey="loss" fill="#F56565" name="Loss" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
