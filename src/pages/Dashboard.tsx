import React from 'react';
import { Users, Trophy, Calendar, DollarSign } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { ScheduleCard } from '../components/ScheduleCard';
import { EvaluationCard } from '../components/EvaluationCard';

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
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total de Alunos"
          value="156"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduleCard classes={mockClasses} />
        <EvaluationCard evaluations={mockEvaluations} />
      </div>
    </div>
  );
}