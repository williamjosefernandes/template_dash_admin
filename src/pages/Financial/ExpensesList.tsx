import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { MonthYearSelector } from '../../components/ui/MonthYearSelector';

const mockExpenses = [
  {
    id: 1,
    description: 'Material Esportivo',
    amount: 1500,
    dueDate: '15/03/2024',
    category: 'Material',
    status: 'Pendente',
    supplier: 'Sports Ltda',
    recurrent: true,
  },
  {
    id: 2,
    description: 'Manutenção do Campo',
    amount: 800,
    dueDate: '20/03/2024',
    category: 'Manutenção',
    status: 'Pago',
    supplier: 'Serviços Gerais ME',
    recurrent: false,
  },
];

export function ExpensesList() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Calculate period range
  const periodStart = startOfMonth(selectedDate);
  const periodEnd = endOfMonth(selectedDate);

  // Filter expenses
  const filteredExpenses = mockExpenses.filter(expense => {
    const expenseDate = new Date(expense.dueDate.split('/').reverse().join('-'));
    const matchesDate = expenseDate >= periodStart && expenseDate <= periodEnd;
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || expense.category === categoryFilter;
    const matchesStatus = !statusFilter || expense.status === statusFilter;

    return matchesDate && matchesSearch && matchesCategory && matchesStatus;
  });

  const columns = [
    { header: 'Descrição', accessor: 'description' as const },
    {
      header: 'Valor',
      accessor: 'amount' as const,
      render: (value: number) => `R$ ${value.toFixed(2)}`,
    },
    { header: 'Vencimento', accessor: 'dueDate' as const },
    { header: 'Categoria', accessor: 'category' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Pago'
              ? 'bg-green-100 text-green-800'
              : value === 'Pendente'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    { header: 'Fornecedor', accessor: 'supplier' as const },
    {
      header: 'Recorrente',
      accessor: 'recurrent' as const,
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Sim' : 'Não'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Despesas</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <MonthYearSelector
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <Button
            icon={Plus}
            onClick={() => navigate('novo')}
          >
            Nova Despesa
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar despesas..."
            className="max-w-md"
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="input max-w-xs"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="material">Material Esportivo</option>
            <option value="utilities">Utilidades</option>
            <option value="maintenance">Manutenção</option>
            <option value="salaries">Salários</option>
            <option value="rent">Aluguel</option>
            <option value="marketing">Marketing</option>
            <option value="others">Outros</option>
          </select>
          <select
            className="input max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="overdue">Atrasado</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          data={filteredExpenses}
          onRowClick={(expense) => navigate(`editar/${expense.id}`)}
        />
      </div>
    </div>
  );
}