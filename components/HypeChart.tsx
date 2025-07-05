import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { PricePoint, HypePoint } from '../types';

interface HypeChartProps {
  priceData: PricePoint[];
  hypeData: HypePoint[];
}

const HypeChart: React.FC<HypeChartProps> = ({ priceData, hypeData }) => {
  // Combine data for charting
  const combinedChartData = priceData.map((p, index) => ({
    date: new Date(p.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: p.price,
    hype: hypeData[index] ? hypeData[index].volume : 0,
  }));

  const formatPrice = (value: number) => {
    if (value < 0.01) return `$${value.toFixed(6)}`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={combinedChartData}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#d1d5db' }} />
        <YAxis 
          yAxisId="left" 
          stroke="#818cf8" 
          tick={{ fill: '#d1d5db' }}
          tickFormatter={(value) => formatPrice(Number(value))}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          stroke="#34d399" 
          tick={{ fill: '#d1d5db' }}
          domain={[0, 1100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-800 with opacity
            borderColor: '#4b5563', // border-gray-600
            color: '#e5e7eb', // text-gray-200
          }}
          labelStyle={{ fontWeight: 'bold' }}
          formatter={(value: number, name: string) => {
            if (name === 'Price') return formatPrice(value);
            return value;
          }}
        />
        <Legend wrapperStyle={{ color: '#d1d5db' }} />
        <defs>
          <linearGradient id="colorHype" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34d399" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area 
          yAxisId="right"
          type="monotone"
          dataKey="hype"
          name="Hype Volume"
          stroke="#34d399"
          fill="url(#colorHype)"
          fillOpacity={1}
          strokeWidth={2}
        />
        <Line 
          yAxisId="left" 
          type="monotone" 
          dataKey="price" 
          name="Price"
          stroke="#818cf8" 
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default HypeChart;
