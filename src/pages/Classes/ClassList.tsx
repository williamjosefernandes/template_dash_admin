import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';

const mockClasses = [
  {
    id: 1,
    name: 'Sub-11 Avançado',
    category: 'Sub-11',
    teacher: 'Ricardo Silva',
    schedule: 'Seg/Qua/Sex 14:00',
    students: 15,
    maxStudents: 20,
    field: 'Campo 1',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Sub-13 Iniciante',
    category: 'Sub-13',
    teacher: 'Ana Paula',
    schedule: 'Ter/Qui 15:30',
    students: 12,
    maxStudents: 18,
    field: 'Campo 2',
    status: 'Ativo',
  },
];

export function ClassList() {
  const navigate = useNavigate();

  const columns = [
    { header: 'Nome', accessor: 'name' as const },
    { header: 'Categoria', accessor: 'category' as const },
    { header: 'Professor', accessor: 'teacher' as const },
    { header: 'Horário', accessor: 'schedule' as const },
    {
      header: 'Alunos',
      accessor: 'students' as const,
      render: (value: number, item: typeof mockClasses[0]) => (
        <span className={value === item.maxStudents ? 'text-yellow-600' : ''}>
          {value}/{item.maxStudents}
        </span>
      ),
    },
    { header: 'Campo', accessor: 'field' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Ativo'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Turmas</h1>
        <Button
          icon={Plus}
          onClick={() => navigate('novo')}
        >
          Nova Turma
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar turmas..."
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
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          data={mockClasses}
          onRowClick={(classItem) => navigate(`editar/${classItem.id}`)}
        />
      </div>
    </div>
  );
}