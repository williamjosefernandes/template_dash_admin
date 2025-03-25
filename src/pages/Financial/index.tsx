import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FinancialDashboard } from './FinancialDashboard';
import { PaymentsList } from './PaymentsList';
import { PaymentForm } from './PaymentForm';
import { ExpensesList } from './ExpensesList';
import { ExpenseForm } from './ExpenseForm';

export function Financial() {
  return (
    <Routes>
      <Route index element={<FinancialDashboard />} />
      <Route path="pagamentos" element={<PaymentsList />} />
      <Route path="pagamentos/novo" element={<PaymentForm />} />
      <Route path="pagamentos/editar/:id" element={<PaymentForm />} />
      <Route path="despesas" element={<ExpensesList />} />
      <Route path="despesas/novo" element={<ExpenseForm />} />
      <Route path="despesas/editar/:id" element={<ExpenseForm />} />
    </Routes>
  );
}