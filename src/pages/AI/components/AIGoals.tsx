import React, { useState } from 'react';
import { Target, TrendingUp, Users, DollarSign, Calendar, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'financial' | 'students' | 'performance' | 'growth';
  status: 'on_track' | 'at_risk' | 'behind';
  aiSuggestions: string[];
}

const mockGoals: Goal[] = [
  {
    id: 1,
    title: 'Crescimento de Alunos',
    target: 350,
    current: 175,
    unit: 'alunos',
    deadline: '2024-12-31',
    category: 'students',
    status: 'on_track',
    aiSuggestions: [
      'Intensificar marketing digital nas áreas próximas',
      'Implementar programa de indicação premiada',
      'Criar eventos de demonstração gratuitos'
    ]
  },
  {
    id: 2,
    title: 'Receita Mensal',
    target: 85000,
    current: 45000,
    unit: 'reais',
    deadline: '2024-12-31',
    category: 'financial',
    status: 'on_track',
    aiSuggestions: [
      'Lançar pacotes premium com serviços adicionais',
      'Otimizar precificação por horário',
      'Implementar programa de fidelidade'
    ]
  },
  {
    id: 3,
    title: 'Média de Avaliação',
    target: 9.5,
    current: 8.2,
    unit: 'pontos',
    deadline: '2024-12-31',
    category: 'performance',
    status: 'at_risk',
    aiSuggestions: [
      'Aumentar frequência de treinos técnicos',
      'Implementar avaliações semanais',
      'Criar programa de reforço personalizado'
    ]
  }
];

export function AIGoals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'on_track':
        return 'bg-green-100 text-green-800';
      case 'at_risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'behind':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: Goal['status']) => {
    switch (status) {
      case 'on_track':
        return 'No Caminho';
      case 'at_risk':
        return 'Em Risco';
      case 'behind':
        return 'Atrasado';
    }
  };

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'financial':
        return DollarSign;
      case 'students':
        return Users;
      case 'performance':
        return TrendingUp;
      case 'growth':
        return Target;
    }
  };

  const getProgress = (goal: Goal) => {
    return Math.round((goal.current / goal.target) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Target className="text-amber-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Metas Inteligentes</h2>
            <p className="text-sm text-gray-600">Definidas e monitoradas por IA</p>
          </div>
        </div>
        <Button
          icon={Plus}
          onClick={() => setShowNewGoalModal(true)}
        >
          Nova Meta
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const Icon = getCategoryIcon(goal.category);
          const progress = getProgress(goal);
          
          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      goal.category === 'financial' ? 'bg-green-100' :
                      goal.category === 'students' ? 'bg-blue-100' :
                      goal.category === 'performance' ? 'bg-purple-100' :
                      'bg-amber-100'
                    }`}>
                      <Icon className={`${
                        goal.category === 'financial' ? 'text-green-600' :
                        goal.category === 'students' ? 'text-blue-600' :
                        goal.category === 'performance' ? 'text-purple-600' :
                        'text-amber-600'
                      }`} size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-sm text-gray-600">
                        Meta: {goal.target} {goal.unit}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {getStatusText(goal.status)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{progress}% concluído</span>
                    <span className="text-gray-600">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        progress >= 90 ? 'bg-green-500' :
                        progress >= 60 ? 'bg-blue-500' :
                        progress >= 30 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Sugestões da IA</h4>
                  <div className="space-y-1">
                    {goal.aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Edit2}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Goal Modal */}
      <Modal
        isOpen={showNewGoalModal}
        onClose={() => setShowNewGoalModal(false)}
        title="Nova Meta"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                className="input"
                placeholder="Nome da meta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select className="input">
                <option value="financial">Financeira</option>
                <option value="students">Alunos</option>
                <option value="performance">Desempenho</option>
                <option value="growth">Crescimento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta
              </label>
              <input
                type="number"
                className="input"
                placeholder="Valor alvo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unidade
              </label>
              <input
                type="text"
                className="input"
                placeholder="Ex: alunos, reais, pontos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Limite
              </label>
              <input
                type="date"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Inicial
              </label>
              <select className="input">
                <option value="on_track">No Caminho</option>
                <option value="at_risk">Em Risco</option>
                <option value="behind">Atrasado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              className="input h-24"
              placeholder="Descreva os detalhes e objetivos desta meta"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowNewGoalModal(false)}
            >
              Cancelar
            </Button>
            <Button
              icon={CheckCircle}
            >
              Criar Meta
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Goal Modal */}
      {selectedGoal && (
        <Modal
          isOpen={!!selectedGoal}
          onClose={() => setSelectedGoal(null)}
          title="Editar Meta"
          size="lg"
        >
          {/* Similar form to New Goal Modal, but pre-filled with selectedGoal data */}
        </Modal>
      )}
    </div>
  );
}