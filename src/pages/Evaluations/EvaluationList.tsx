import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ClipboardList } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';

const mockEvaluations = [
  {
    id: 1,
    student: 'João Silva',
    category: 'Sub-11',
    date: '15/03/2024',
    evaluator: 'Ricardo Silva',
    technical: 8,
    tactical: 7,
    physical: 9,
    overall: 8,
  },
  {
    id: 2,
    student: 'Maria Santos',
    category: 'Sub-13',
    date: '14/03/2024',
    evaluator: 'Ana Paula',
    technical: 9,
    tactical: 8,
    physical: 8,
    overall: 8.3,
  },
];

export function EvaluationList() {
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const columns = [
    { header: 'Aluno', accessor: 'student' as const },
    { header: 'Categoria', accessor: 'category' as const },
    { header: 'Data', accessor: 'date' as const },
    { header: 'Avaliador', accessor: 'evaluator' as const },
    {
      header: 'Técnico',
      accessor: 'technical' as const,
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      header: 'Tático',
      accessor: 'tactical' as const,
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      header: 'Físico',
      accessor: 'physical' as const,
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      header: 'Geral',
      accessor: 'overall' as const,
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(value)}`}>
          {value.toFixed(1)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Avaliações</h1>
        <Button
          icon={Plus}
          onClick={() => navigate('novo')}
        >
          Nova Avaliação
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar avaliações..."
            className="max-w-md"
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <select className="input max-w-xs">
            <option value="">Todas as categorias</option>
            <option value="sub-11">Sub-11</option>
            <option value="sub-13">Sub-13</option>
            <option value="sub-15">Sub-15</option>
          </select>
          <select className="input max-w-xs">
            <option value="">Todos os avaliadores</option>
            <option value="1">Ricardo Silva</option>
            <option value="2">Ana Paula</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          data={mockEvaluations}
          onRowClick={(evaluation) => navigate(`editar/${evaluation.id}`)}
        />
      </div>
    </div>
  );
}