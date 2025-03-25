import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Brain, TrendingUp } from 'lucide-react';

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
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
  datasets: [
    {
      label: 'Alunos Ativos',
      data: [145, 152, 158, 156, 160, 162, 168, 170, 175],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Projeção',
      data: [null, null, null, null, null, null, 180, 188, 195],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderDash: [5, 5],
      tension: 0.3,
      fill: true,
    }
  ]
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
    },
  },
};

export function AITrends() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Tendências e Projeções</h2>
            <p className="text-sm text-gray-600">Análise preditiva de crescimento</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full text-purple-600 text-sm">
          <Brain size={16} />
          <span>Atualizado em tempo real</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Line data={mockData} options={options} />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <h3 className="font-medium text-green-800">Crescimento Projetado</h3>
            <p className="text-2xl font-bold text-green-600">+11.4%</p>
            <p className="text-sm text-green-700">nos próximos 3 meses</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <h3 className="font-medium text-blue-800">Meta Sugerida</h3>
            <p className="text-2xl font-bold text-blue-600">195</p>
            <p className="text-sm text-blue-700">alunos até Setembro</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <h3 className="font-medium text-purple-800">Capacidade Ótima</h3>
            <p className="text-2xl font-bold text-purple-600">85%</p>
            <p className="text-sm text-purple-700">utilização da infraestrutura</p>
          </div>
        </div>
      </div>
    </div>
  );
}