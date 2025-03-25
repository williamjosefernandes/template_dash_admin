import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Brain } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const mockData = {
  labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
  actual: [145, 152, 158, 156, 160, 162, 168, 170, 175],
  predicted: [null, null, null, null, null, null, 180, 188, 195],
};

export function PredictiveMetrics() {
  const data = {
    labels: mockData.labels,
    datasets: [
      {
        label: 'Alunos Atuais',
        data: mockData.actual,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Projeção IA',
        data: mockData.predicted,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderDash: [5, 5],
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Brain className="text-blue-500" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Projeção Inteligente</h2>
          <p className="text-sm text-gray-600">
            Análise preditiva de crescimento
          </p>
        </div>
      </div>
      
      <Line data={data} options={options} />
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <p className="text-sm font-medium text-green-800">Crescimento Projetado</p>
          <p className="text-2xl font-bold text-green-600">+11.4%</p>
          <p className="text-xs text-green-700">nos próximos 3 meses</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <p className="text-sm font-medium text-blue-800">Meta Sugerida</p>
          <p className="text-2xl font-bold text-blue-600">195</p>
          <p className="text-xs text-blue-700">alunos até Março</p>
        </div>
      </div>
    </div>
  );
}