import React from 'react';
import { Brain, TrendingUp, Users, DollarSign, Calendar, BarChart2 } from 'lucide-react';
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
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const growthData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
  datasets: [
    {
      label: 'Crescimento Real',
      data: [150, 158, 165, 172, 180, 185, 190, 195, 200],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Projeção Otimista',
      data: [200, 210, 222, 235, 250, 268, 288, 310, 335],
      borderColor: 'rgba(99, 102, 241, 0.5)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderDash: [5, 5],
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Projeção Conservadora',
      data: [200, 205, 212, 220, 229, 239, 250, 262, 275],
      borderColor: 'rgba(234, 179, 8, 0.5)',
      backgroundColor: 'rgba(234, 179, 8, 0.1)',
      borderDash: [5, 5],
      tension: 0.3,
      fill: true,
    }
  ]
};

const revenueData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Receita Projetada',
      data: [45000, 48000, 52000, 56000, 61000, 67000],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
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

const revenueOptions = {
  ...options,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) => `R$ ${value.toLocaleString()}`,
      },
    },
  },
};

export function AIPredictions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Previsões Inteligentes</h2>
              <p className="text-sm text-gray-600">Análise preditiva baseada em Machine Learning</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Atualizado em tempo real</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-600" size={20} />
              <span className="text-sm font-medium text-purple-900">Crescimento Projetado</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">67.5%</p>
            <p className="text-sm text-purple-600">próximos 6 meses</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-blue-600" size={20} />
              <span className="text-sm font-medium text-blue-900">Alunos Estimados</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">335</p>
            <p className="text-sm text-blue-600">até setembro</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-green-600" size={20} />
              <span className="text-sm font-medium text-green-900">Receita Projetada</span>
            </div>
            <p className="text-2xl font-bold text-green-700">R$ 67K</p>
            <p className="text-sm text-green-600">mensal</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-amber-600" size={20} />
              <span className="text-sm font-medium text-amber-900">Melhor Período</span>
            </div>
            <p className="text-2xl font-bold text-amber-700">Ago/24</p>
            <p className="text-sm text-amber-600">maior crescimento</p>
          </div>
        </div>
      </div>

      {/* Growth Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              <h3 className="font-semibold">Projeção de Crescimento</h3>
            </div>
            <select className="input max-w-xs text-sm">
              <option value="6">Próximos 6 meses</option>
              <option value="12">Próximos 12 meses</option>
            </select>
          </div>
          <Line data={growthData} options={options} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="text-green-600" size={20} />
              <h3 className="font-semibold">Projeção de Receita</h3>
            </div>
            <select className="input max-w-xs text-sm">
              <option value="monthly">Mensal</option>
              <option value="quarterly">Trimestral</option>
            </select>
          </div>
          <Bar data={revenueData} options={revenueOptions} />
        </div>
      </div>

      {/* Detailed Predictions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Análise Detalhada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Fatores de Crescimento</h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Marketing digital otimizado (+25% eficiência)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Expansão de categorias (Sub-9 e Sub-17)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Programa de indicações aprimorado
                </li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Oportunidades Identificadas</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Horários alternativos aos sábados
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Parcerias com escolas locais
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Programa de treinamento avançado
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Projeções Financeiras</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Aumento de 48% na receita anual
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Redução de 15% nos custos operacionais
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  ROI de marketing: 320%
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Pontos de Atenção</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Necessidade de contratação de professores
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Ampliação da infraestrutura
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Investimento em equipamentos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}