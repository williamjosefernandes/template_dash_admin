import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../../components/ui/Table';

interface Transaction {
  id: number;
  student: string;
  amount: number;
  status: string;
  date: string;
  paymentMethod: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const navigate = useNavigate();

  const columns = [
    { header: 'Aluno', accessor: 'student' as const },
    {
      header: 'Valor',
      accessor: 'amount' as const,
      render: (value: number) => `R$ ${value.toFixed(2)}`,
    },
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
    { header: 'Data', accessor: 'date' as const },
    { header: 'Método', accessor: 'paymentMethod' as const },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Transações Recentes</h2>
      </div>
      <Table
        columns={columns}
        data={transactions}
        onRowClick={(transaction) => navigate(`pagamentos/editar/${transaction.id}`)}
      />
    </div>
  );
}