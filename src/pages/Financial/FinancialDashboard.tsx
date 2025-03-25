import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, AlertCircle, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { DashboardCard } from '../../components/DashboardCard';
import { RevenueChart } from './components/RevenueChart';
import { PaymentStatusChart } from './components/PaymentStatusChart';
import { RecentTransactions } from './components/RecentTransactions';
import { MonthYearSelector } from '../../components/ui/MonthYearSelector';

const mockRevenueData = {
  revenue: [15000, 17500, 16800, 18200, 19500, 21000],
  expenses: [8000, 8500, 8200, 8800, 9000, 9500],
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
};

const mockStatusData = {
  paid: 85,
  pending: 10,
  overdue: 5,
};

const mockTransactions = [
  {
    id: 1,
    student: 'João Silva',
    amount: 250,
    status: 'Pago',
    date: '15/03/2024',
    paymentMethod: 'Cartão de Crédito',
  },
  {
    id: 2,
    student: 'Maria Santos',
    amount: 250,
    status: 'Pendente',
    date: '14/03/2024',
    paymentMethod: 'Boleto',
  },
  {
    id: 3,
    student: 'Pedro Oliveira',
    amount: 250,
    status: 'Atrasado',
    date: '10/03/2024',
    paymentMethod: 'Boleto',
  },
];

export function FinancialDashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calculate period range
  const periodStart = startOfMonth(selectedDate);
  const periodEnd = endOfMonth(selectedDate);

  // Filter transactions for selected month
  const filteredTransactions = mockTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.date.split('/').reverse().join('-'));
    return transactionDate >= periodStart && transactionDate <= periodEnd;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <MonthYearSelector
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={ArrowDownRight}
              onClick={() => navigate('despesas/novo')}
            >
              Nova Despesa
            </Button>
            <Button
              icon={ArrowUpRight}
              onClick={() => navigate('pagamentos/novo')}
            >
              Nova Receita
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Receita do Mês"
          value="R$ 21.000"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Despesas do Mês"
          value="R$ 9.500"
          icon={ArrowDownRight}
          trend={{ value: 5, isPositive: false }}
        />
        <DashboardCard
          title="Mensalidades Pagas"
          value="85%"
          icon={CreditCard}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Despesas Pendentes"
          value="R$ 2.500"
          icon={AlertCircle}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Receitas e Despesas</h2>
          <RevenueChart data={mockRevenueData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Status dos Pagamentos</h2>
          <PaymentStatusChart data={mockStatusData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Últimas Receitas</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('pagamentos')}
            >
              Ver todas
            </Button>
          </div>
          <RecentTransactions transactions={filteredTransactions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Últimas Despesas</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('despesas')}
            >
              Ver todas
            </Button>
          </div>
          <RecentTransactions transactions={filteredTransactions} />
        </div>
      </div>
    </div>
  );
}