import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueData {
  revenue: number[];
  expenses: number[];
  labels: string[];
}

interface RevenueChartProps {
  data: RevenueData;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Receitas',
        data: data.revenue,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Despesas',
        data: data.expenses,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `R$ ${value.toLocaleString()}`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}