import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { MonthYearSelector } from '../../components/ui/MonthYearSelector';

const mockPayments = [
  {
    id: 1,
    student: 'João Silva',
    category: 'Sub-11',
    amount: 250,
    dueDate: '15/03/2024',
    status: 'Pago',
    paymentMethod: 'Cartão de Crédito',
  },
  {
    id: 2,
    student: 'Maria Santos',
    category: 'Sub-13',
    amount: 250,
    dueDate: '20/03/2024',
    status: 'Pendente',
    paymentMethod: 'Boleto',
  },
];

export function PaymentsList() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Calculate period range
  const periodStart = startOfMonth(selectedDate);
  const periodEnd = endOfMonth(selectedDate);

  // Filter payments
  const filteredPayments = mockPayments.filter(payment => {
    const paymentDate = new Date(payment.dueDate.split('/').reverse().join('-'));
    const matchesDate = paymentDate >= periodStart && paymentDate <= periodEnd;
    const matchesSearch = payment.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || payment.category === categoryFilter;
    const matchesStatus = !statusFilter || payment.status === statusFilter;

    return matchesDate && matchesSearch && matchesCategory && matchesStatus;
  });

  const columns = [
    { header: 'Aluno', accessor: 'student' as const },
    { header: 'Categoria', accessor: 'category' as const },
    {
      header: 'Valor',
      accessor: 'amount' as const,
      render: (value: number) => `R$ ${value.toFixed(2)}`,
    },
    { header: 'Vencimento', accessor: 'dueDate' as const },
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
    { header: 'Método', accessor: 'paymentMethod' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Pagamentos</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <MonthYearSelector
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <Button
            icon={Plus}
            onClick={() => navigate('novo')}
          >
            Novo Pagamento
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar pagamentos..."
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
            <option value="sub-11">Sub-11</option>
            <option value="sub-13">Sub-13</option>
            <option value="sub-15">Sub-15</option>
          </select>
          <select
            className="input max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="paid">Pago</option>
            <option value="pending">Pendente</option>
            <option value="overdue">Atrasado</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          data={filteredPayments}
          onRowClick={(payment) => navigate(`editar/${payment.id}`)}
        />
      </div>
    </div>
  );
}