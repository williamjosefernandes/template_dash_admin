import React from 'react';
import { Target, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const opportunities = [
  {
    title: 'Expansão de Categorias',
    description: 'Potencial identificado para novas turmas Sub-9 e Sub-17',
    impact: {
      revenue: '+R$ 15.000/mês',
      students: '+45 alunos',
      timeframe: '3 meses'
    },
    requirements: [
      'Contratação de 2 professores',
      'Adequação de material esportivo',
      'Marketing direcionado'
    ],
    status: 'high'
  },
  {
    title: 'Programa Premium',
    description: 'Serviços especializados com preparação física e nutrição',
    impact: {
      revenue: '+R$ 8.500/mês',
      students: '25 alunos',
      timeframe: '2 meses'
    },
    requirements: [
      'Parceria com profissionais',
      'Estruturação do programa',
      'Material de divulgação'
    ],
    status: 'medium'
  },
  {
    title: 'Horários Alternativos',
    description: 'Alta demanda identificada para aulas aos sábados',
    impact: {
      revenue: '+R$ 12.000/mês',
      students: '+35 alunos',
      timeframe: '1 mês'
    },
    requirements: [
      'Reorganização da grade',
      'Disponibilidade de professores',
      'Comunicação com pais'
    ],
    status: 'high'
  }
];

export function AIOpportunities() {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-green-600" size={20} />
            <span className="text-sm font-medium">Oportunidades</span>
          </div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-gray-600">identificadas</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-blue-600" size={20} />
            <span className="text-sm font-medium">Potencial</span>
          </div>
          <p className="text-2xl font-bold">R$ 35.5K</p>
          <p className="text-sm text-gray-600">receita mensal</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-600" size={20} />
            <span className="text-sm font-medium">Alcance</span>
          </div>
          <p className="text-2xl font-bold">105</p>
          <p className="text-sm text-gray-600">novos alunos</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-amber-600" size={20} />
            <span className="text-sm font-medium">Prazo Médio</span>
          </div>
          <p className="text-2xl font-bold">2.5</p>
          <p className="text-sm text-gray-600">meses</p>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {opportunities.map((opportunity, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                  <p className="text-gray-600">{opportunity.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  opportunity.status === 'high'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {opportunity.status === 'high' ? 'Alta Prioridade' : 'Média Prioridade'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="text-green-600" size={16} />
                    <span className="text-sm font-medium text-green-900">Receita Potencial</span>
                  </div>
                  <p className="text-lg font-semibold text-green-700">{opportunity.impact.revenue}</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-blue-900">Novos Alunos</span>
                  </div>
                  <p className="text-lg font-semibold text-blue-700">{opportunity.impact.students}</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="text-purple-600" size={16} />
                    <span className="text-sm font-medium text-purple-900">Prazo Estimado</span>
                  </div>
                  <p className="text-lg font-semibold text-purple-700">{opportunity.impact.timeframe}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Requisitos</h4>
                <div className="space-y-2">
                  {opportunity.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-sm text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Implementar Oportunidade
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}