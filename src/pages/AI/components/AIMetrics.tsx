import React from 'react';
import { Users, Trophy, DollarSign, TrendingUp, Brain } from 'lucide-react';

const metrics = [
  {
    title: 'Crescimento Projetado',
    value: '+25%',
    description: 'nos próximos 3 meses',
    trend: { value: 12, isPositive: true },
    icon: TrendingUp,
    color: 'green'
  },
  {
    title: 'Retenção de Alunos',
    value: '92%',
    description: 'média últimos 6 meses',
    trend: { value: 5, isPositive: true },
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Potencial de Receita',
    value: 'R$ 15.000',
    description: 'oportunidades identificadas',
    trend: { value: 8, isPositive: true },
    icon: DollarSign,
    color: 'purple'
  },
  {
    title: 'Performance Média',
    value: '8.5',
    description: 'avaliação dos alunos',
    trend: { value: 3, isPositive: true },
    icon: Trophy,
    color: 'amber'
  }
];

export function AIMetrics() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Brain className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Métricas Inteligentes</h2>
            <p className="text-purple-100">Análise preditiva baseada em dados históricos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
        {metrics.map((metric, index) => (
          <div key={index} className="p-6">
            <div className={`text-${metric.color}-600 mb-2`}>
              <metric.icon size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.title}</p>
            <p className="text-xs text-gray-500">{metric.description}</p>
            {metric.trend && (
              <p className={`text-sm mt-1 ${metric.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend.isPositive ? '↑' : '↓'} {Math.abs(metric.trend.value)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}