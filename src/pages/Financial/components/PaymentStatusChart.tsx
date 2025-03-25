import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentStatusData {
  paid: number;
  pending: number;
  overdue: number;
}

interface PaymentStatusChartProps {
  data: PaymentStatusData;
}

export function PaymentStatusChart({ data }: PaymentStatusChartProps) {
  const chartData = {
    labels: ['Pago', 'Pendente', 'Atrasado'],
    datasets: [
      {
        data: [data.paid, data.pending, data.overdue],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="relative">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">{data.paid}%</p>
          <p className="text-sm text-gray-600">Pagos</p>
        </div>
      </div>
    </div>
  );
}