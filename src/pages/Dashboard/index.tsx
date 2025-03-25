import React from 'react';
import { Users, Trophy, Calendar, DollarSign, Brain, Zap } from 'lucide-react';
import { DashboardCard } from '../../components/DashboardCard';
import { ScheduleCard } from '../../components/ScheduleCard';
import { EvaluationCard } from '../../components/EvaluationCard';
import { AIInsights } from './components/AIInsights';
import { PredictiveMetrics } from './components/PredictiveMetrics';
import { AIChatbot } from './components/AIChatbot';

const mockClasses = [
  {
    time: '14:00',
    class: 'Sub-12 Avançado',
    students: 15,
    teacher: 'Ricardo Silva',
    field: 'Campo 1'
  },
  {
    time: '15:30',
    class: 'Sub-10 Iniciante',
    students: 12,
    teacher: 'Ana Paula',
    field: 'Campo 2'
  },
  {
    time: '17:00',
    class: 'Sub-15 Intermediário',
    students: 18,
    teacher: 'Carlos Santos',
    field: 'Campo 1'
  }
];

const mockEvaluations = [
  {
    name: 'Pedro Silva',
    age: 12,
    performance: 'Excelente' as const,
    date: '15/03/2024',
    skills: {
      technical: 9,
      tactical: 8,
      physical: 9
    }
  },
  {
    name: 'Maria Santos',
    age: 10,
    performance: 'Bom' as const,
    date: '14/03/2024',
    skills: {
      technical: 7,
      tactical: 8,
      physical: 7
    }
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header with AI Status */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Análise inteligente do seu negócio</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <Brain className="text-purple-500" size={20} />
            <span className="text-sm font-medium text-gray-600">IA Ativa</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Análise em tempo real</span>
          </div>
        </div>
      </div>

      {/* AI Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-3">
            <Zap size={24} />
            <div className="text-left">
              <h3 className="font-semibold">Análise Rápida</h3>
              <p className="text-sm opacity-90">Gerar insights instantâneos</p>
            </div>
          </div>
        </button>
        <button className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-3">
            <Brain size={24} />
            <div className="text-left">
              <h3 className="font-semibold">Previsões</h3>
              <p className="text-sm opacity-90">Ver projeções futuras</p>
            </div>
          </div>
        </button>
        <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-3">
            <Trophy size={24} />
            <div className="text-left">
              <h3 className="font-semibold">Oportunidades</h3>
              <p className="text-sm opacity-90">Descobrir potenciais</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <DashboardCard
              title="Total de Alunos"
              value="175"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <DashboardCard
              title="Professores"
              value="8"
              icon={Trophy}
              trend={{ value: 1, isPositive: true }}
            />
            <DashboardCard
              title="Aulas Hoje"
              value="12"
              icon={Calendar}
            />
            <DashboardCard
              title="Receita Mensal"
              value="R$ 45.890"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
            />
          </div>

          {/* Operational Data */}
          <ScheduleCard classes={mockClasses} />
          <EvaluationCard evaluations={mockEvaluations} />
        </div>

        {/* Right Column - AI Chat */}
        <div className="space-y-6">
          <AIChatbot />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIInsights />
        </div>
        <PredictiveMetrics />
      </div>
    </div>
  );
}