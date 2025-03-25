import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';

const mockTeachers = [
  {
    id: 1,
    name: 'Ricardo Silva',
    specialization: 'Técnica Individual',
    categories: ['Sub-11', 'Sub-13'],
    phone: '(11) 98765-4321',
    status: 'Ativo',
    workload: '32h/semana',
  },
  {
    id: 2,
    name: 'Ana Paula Santos',
    specialization: 'Preparação Física',
    categories: ['Sub-15'],
    phone: '(11) 98765-4322',
    status: 'Ativo',
    workload: '20h/semana',
  },
];

export function TeacherList() {
  const navigate = useNavigate();

  const columns = [
    { header: 'Nome', accessor: 'name' as const },
    { header: 'Especialização', accessor: 'specialization' as const },
    {
      header: 'Categorias',
      accessor: 'categories' as const,
      render: (value: string[]) => value.join(', '),
    },
    { header: 'Telefone', accessor: 'phone' as const },
    { header: 'Carga Horária', accessor: 'workload' as const },
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
        <h1 className="text-2xl font-bold text-gray-900">Professores</h1>
        <Button
          icon={UserPlus}
          onClick={() => navigate('novo')}
        >
          Novo Professor
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar professores..."
            className="max-w-md"
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <select className="input max-w-xs">
            <option value="">Todas as especializações</option>
            <option value="tecnica">Técnica Individual</option>
            <option value="tatica">Tática</option>
            <option value="fisica">Preparação Física</option>
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
          data={mockTeachers}
          onRowClick={(teacher) => navigate(`editar/${teacher.id}`)}
        />
      </div>
    </div>
  );
}