import React from 'react';
import { BarChart2, TrendingUp, Award, Users } from 'lucide-react';
import { PerformanceChart } from './components/PerformanceChart';
import { ProgressCard } from './components/ProgressCard';
import { StudentRanking } from './components/StudentRanking';

const mockPerformanceData = {
  technical: [8, 7.5, 8.2, 8.5, 9.0, 8.8],
  tactical: [7, 7.2, 7.8, 8.0, 8.2, 8.5],
  physical: [7.5, 8.0, 8.2, 8.5, 8.8, 9.0],
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
};

const mockProgressCards = [
  {
    title: 'Média Técnica',
    value: '8.5',
    trend: { value: 12, isPositive: true },
    icon: Award,
  },
  {
    title: 'Média Tática',
    value: '8.2',
    trend: { value: 8, isPositive: true },
    icon: TrendingUp,
  },
  {
    title: 'Média Física',
    value: '8.8',
    trend: { value: 15, isPositive: true },
    icon: Users,
  },
];

const mockRankingData = [
  {
    id: 1,
    name: 'João Silva',
    category: 'Sub-11',
    performance: 9.2,
    evolution: '+15%',
    highlights: ['Drible', 'Passe'],
  },
  {
    id: 2,
    name: 'Maria Santos',
    category: 'Sub-13',
    performance: 8.9,
    evolution: '+12%',
    highlights: ['Velocidade', 'Resistência'],
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    category: 'Sub-11',
    performance: 8.7,
    evolution: '+10%',
    highlights: ['Chute', 'Posicionamento'],
  },
];

export function Performance() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Desempenho</h1>
        <div className="flex gap-2">
          <select className="input max-w-xs">
            <option value="">Todas as categorias</option>
            <option value="sub-11">Sub-11</option>
            <option value="sub-13">Sub-13</option>
            <option value="sub-15">Sub-15</option>
          </select>
          <select className="input max-w-xs">
            <option value="6">Últimos 6 meses</option>
            <option value="12">Último ano</option>
            <option value="24">Últimos 2 anos</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProgressCards.map((card, index) => (
          <ProgressCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Evolução do Desempenho</h2>
          <PerformanceChart data={mockPerformanceData} />
        </div>

        <StudentRanking students={mockRankingData} />
      </div>
    </div>
  );
}