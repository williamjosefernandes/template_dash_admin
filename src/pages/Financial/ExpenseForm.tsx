import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const expenseSchema = z.object({
  description: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
  amount: z.string().min(1, 'Valor é obrigatório'),
  dueDate: z.string().min(1, 'Data de vencimento é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  status: z.string().min(1, 'Status é obrigatório'),
  paymentMethod: z.string().min(1, 'Método de pagamento é obrigatório'),
  supplier: z.string().min(1, 'Fornecedor é obrigatório'),
  notes: z.string().optional(),
  recurrent: z.boolean(),
  frequency: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export function ExpenseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      recurrent: false,
    },
  });

  const isRecurrent = watch('recurrent');

  const onSubmit = (data: ExpenseFormData) => {
    console.log(data);
    navigate('/financeiro');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/financeiro')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Despesa' : 'Nova Despesa'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações da Despesa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Descrição"
              {...register('description')}
              error={errors.description?.message}
            />
            
            <Input
              label="Valor"
              type="number"
              step="0.01"
              prefix="R$"
              {...register('amount')}
              error={errors.amount?.message}
            />
            
            <Input
              label="Data de Vencimento"
              type="date"
              {...register('dueDate')}
              error={errors.dueDate?.message}
            />
            
            <select
              className="input"
              {...register('category')}
            >
              <option value="">Selecione a categoria</option>
              <option value="material">Material Esportivo</option>
              <option value="utilities">Utilidades</option>
              <option value="maintenance">Manutenção</option>
              <option value="salaries">Salários</option>
              <option value="rent">Aluguel</option>
              <option value="marketing">Marketing</option>
              <option value="others">Outros</option>
            </select>

            <select
              className="input"
              {...register('status')}
            >
              <option value="">Status da Despesa</option>
              <option value="pending">Pendente</option>
              <option value="paid">Paga</option>
              <option value="overdue">Atrasada</option>
            </select>

            <select
              className="input"
              {...register('paymentMethod')}
            >
              <option value="">Método de Pagamento</option>
              <option value="transfer">Transferência</option>
              <option value="debit">Débito</option>
              <option value="credit">Crédito</option>
              <option value="cash">Dinheiro</option>
              <option value="pix">PIX</option>
            </select>

            <Input
              label="Fornecedor"
              {...register('supplier')}
              error={errors.supplier?.message}
            />

            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('recurrent')}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span>Despesa Recorrente</span>
              </label>
            </div>

            {isRecurrent && (
              <select
                className="input"
                {...register('frequency')}
              >
                <option value="">Selecione a frequência</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
                <option value="quarterly">Trimestral</option>
                <option value="yearly">Anual</option>
              </select>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                className="input h-32"
                placeholder="Adicione observações ou detalhes adicionais"
                {...register('notes')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/financeiro')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            icon={Save}
          >
            {isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
}