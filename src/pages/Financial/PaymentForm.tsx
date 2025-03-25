import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const paymentSchema = z.object({
  student: z.string().min(1, 'Aluno é obrigatório'),
  amount: z.string().min(1, 'Valor é obrigatório'),
  dueDate: z.string().min(1, 'Data de vencimento é obrigatória'),
  paymentMethod: z.string().min(1, 'Método de pagamento é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  description: z.string(),
  installments: z.string().optional(),
  discount: z.string().optional(),
  fees: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = (data: PaymentFormData) => {
    console.log(data);
    navigate('/financeiro/pagamentos');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/financeiro/pagamentos')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Pagamento' : 'Novo Pagamento'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações do Pagamento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="input"
              {...register('student')}
            >
              <option value="">Selecione o aluno</option>
              <option value="1">João Silva</option>
              <option value="2">Maria Santos</option>
            </select>
            
            <Input
              label="Valor"
              type="number"
              step="0.01"
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
              {...register('paymentMethod')}
            >
              <option value="">Método de Pagamento</option>
              <option value="credit">Cartão de Crédito</option>
              <option value="debit">Cartão de Débito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">PIX</option>
            </select>

            <select
              className="input"
              {...register('status')}
            >
              <option value="">Status do Pagamento</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="overdue">Atrasado</option>
            </select>

            {paymentMethod === 'credit' && (
              <Input
                label="Parcelas"
                type="number"
                min="1"
                max="12"
                {...register('installments')}
              />
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Detalhes Adicionais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Desconto"
              type="number"
              step="0.01"
              {...register('discount')}
            />
            
            <Input
              label="Taxas"
              type="number"
              step="0.01"
              {...register('fees')}
            />
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                className="input h-32"
                placeholder="Adicione uma descrição ou observação"
                {...register('description')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/financeiro/pagamentos')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            icon={Save}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}