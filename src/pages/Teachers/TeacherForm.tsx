import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, DollarSign, Clock, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const teacherSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  specialization: z.string().min(1, 'Especialização é obrigatória'),
  categories: z.array(z.string()).min(1, 'Selecione pelo menos uma categoria'),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  workload: z.string().min(1, 'Carga horária é obrigatória'),
  certifications: z.string(),
  experience: z.string(),
  // Novos campos de remuneração
  paymentTypes: z.array(z.string()).min(1, 'Selecione pelo menos um tipo de remuneração'),
  baseSalary: z.string().optional(),
  hourlyRate: z.string().optional(),
  classRate: z.string().optional(),
  bonusPerStudent: z.string().optional(),
  bankInfo: z.object({
    bank: z.string().min(1, 'Banco é obrigatório'),
    branch: z.string().min(1, 'Agência é obrigatória'),
    account: z.string().min(1, 'Conta é obrigatória'),
    accountType: z.string().min(1, 'Tipo de conta é obrigatório'),
    pixKey: z.string().optional()
  })
});

type TeacherFormData = z.infer<typeof teacherSchema>;

const paymentTypes = [
  { id: 'fixed', label: 'Salário Fixo', icon: DollarSign },
  { id: 'hourly', label: 'Por Hora', icon: Clock },
  { id: 'class', label: 'Por Turma', icon: Users },
];

export function TeacherForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      paymentTypes: [],
      bankInfo: {
        accountType: 'checking'
      }
    }
  });

  const onSubmit = (data: TeacherFormData) => {
    console.log(data);
    navigate('/professores');
  };

  const handlePaymentTypeChange = (type: string) => {
    setSelectedPaymentTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/professores')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Professor' : 'Novo Professor'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        {/* Informações Pessoais */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Data de Nascimento"
              type="date"
              {...register('birthDate')}
              error={errors.birthDate?.message}
            />
            <select
              className="input"
              {...register('specialization')}
            >
              <option value="">Selecione a especialização</option>
              <option value="tecnica">Técnica Individual</option>
              <option value="tatica">Tática</option>
              <option value="fisica">Preparação Física</option>
            </select>
            <Input
              label="Carga Horária Semanal"
              {...register('workload')}
              error={errors.workload?.message}
            />
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações de Contato</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Telefone"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Endereço"
              className="col-span-2"
              {...register('address')}
              error={errors.address?.message}
            />
          </div>
        </div>

        {/* Remuneração */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Remuneração</h2>

          <div className="space-y-6">
            {/* Tipos de Remuneração */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipos de Remuneração
              </label>
              <div className="grid grid-cols-3 gap-3">
                {paymentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.id}
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPaymentTypes.includes(type.id)
                          ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                          : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={type.id}
                        {...register('paymentTypes')}
                        className="sr-only"
                        onChange={() => handlePaymentTypeChange(type.id)}
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.paymentTypes && (
                <p className="mt-1 text-sm text-red-600">{errors.paymentTypes.message}</p>
              )}
            </div>

            {/* Campos específicos por tipo de remuneração */}
            <div className="space-y-4">
              {selectedPaymentTypes.includes('fixed') && (
                <Input
                  label="Salário Base Mensal"
                  type="number"
                  prefix="R$"
                  {...register('baseSalary')}
                  error={errors.baseSalary?.message}
                />
              )}

              {selectedPaymentTypes.includes('hourly') && (
                <Input
                  label="Valor por Hora"
                  type="number"
                  prefix="R$"
                  {...register('hourlyRate')}
                  error={errors.hourlyRate?.message}
                />
              )}

              {selectedPaymentTypes.includes('class') && (
                <div className="space-y-4">
                  <Input
                    label="Valor por Turma"
                    type="number"
                    prefix="R$"
                    {...register('classRate')}
                    error={errors.classRate?.message}
                  />
                  <Input
                    label="Bônus por Aluno (opcional)"
                    type="number"
                    prefix="R$"
                    {...register('bonusPerStudent')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dados Bancários */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Dados Bancários</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Banco"
              {...register('bankInfo.bank')}
              error={errors.bankInfo?.bank?.message}
            />
            <Input
              label="Agência"
              {...register('bankInfo.branch')}
              error={errors.bankInfo?.branch?.message}
            />
            <Input
              label="Conta"
              {...register('bankInfo.account')}
              error={errors.bankInfo?.account?.message}
            />
            <select
              className="input"
              {...register('bankInfo.accountType')}
            >
              <option value="checking">Conta Corrente</option>
              <option value="savings">Conta Poupança</option>
            </select>
            <Input
              label="Chave PIX (opcional)"
              {...register('bankInfo.pixKey')}
              className="col-span-2"
            />
          </div>
        </div>

        {/* Qualificações */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Qualificações</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categorias de Atuação
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Sub-11', 'Sub-13', 'Sub-15'].map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category}
                      {...register('categories')}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
              {errors.categories && (
                <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificações
              </label>
              <textarea
                className="input h-32"
                placeholder="Liste as certificações relevantes"
                {...register('certifications')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experiência Profissional
              </label>
              <textarea
                className="input h-32"
                placeholder="Descreva a experiência profissional anterior"
                {...register('experience')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/professores')}
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