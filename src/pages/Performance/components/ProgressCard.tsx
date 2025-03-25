import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
}

export function ProgressCard({ title, value, trend, icon: Icon }: ProgressCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <Icon className="text-green-600" size={24} />
        </div>
      </div>
    </div>
  );
}