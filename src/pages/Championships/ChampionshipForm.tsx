import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Users, Calendar, MapPin, Trophy, DollarSign, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const championshipSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de término é obrigatória'),
  location: z.string().min(1, 'Local é obrigatório'),
  maxTeams: z.string().min(1, 'Número máximo de equipes é obrigatório'),
  format: z.string().min(1, 'Formato é obrigatório'),
  description: z.string(),
  rules: z.string(),
  prizes: z.array(z.object({
    position: z.string(),
    description: z.string()
  })).min(1, 'Adicione pelo menos um prêmio'),
  // Novos campos
  registrationFee: z.string().min(1, 'Taxa de inscrição é obrigatória'),
  transportIncluded: z.boolean(),
  transportFee: z.string().optional(),
  uniformRequired: z.boolean(),
  uniformFee: z.string().optional(),
  authorizationText: z.string().min(1, 'Texto da autorização é obrigatório'),
  paymentMethods: z.array(z.string()).min(1, 'Selecione pelo menos uma forma de pagamento'),
  deadlineDate: z.string().min(1, 'Data limite é obrigatória'),
});

type ChampionshipFormData = z.infer<typeof championshipSchema>;

export function ChampionshipForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const [showTransportFee, setShowTransportFee] = useState(false);
  const [showUniformFee, setShowUniformFee] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ChampionshipFormData>({
    resolver: zodResolver(championshipSchema),
    defaultValues: {
      prizes: [{ position: '1º Lugar', description: '' }],
      paymentMethods: [],
      authorizationText: `Eu, [NOME DO RESPONSÁVEL], autorizo o aluno [NOME DO ALUNO] a participar do campeonato [NOME DO CAMPEONATO], que será realizado no período de [DATA INÍCIO] a [DATA FIM].

Declaro estar ciente:
1. Das condições de participação estabelecidas no regulamento
2. Dos riscos inerentes à prática esportiva
3. Da necessidade de apresentar atestado médico atualizado
4. Das condições de pagamento e prazos estabelecidos

Esta autorização é válida para todas as atividades relacionadas ao campeonato, incluindo treinos preparatórios, jogos e eventuais atividades extras.`,
    },
  });

  const prizes = watch('prizes');
  const transportIncluded = watch('transportIncluded');
  const uniformRequired = watch('uniformRequired');

  const addPrize = () => {
    setValue('prizes', [...prizes, { position: '', description: '' }]);
  };

  const removePrize = (index: number) => {
    setValue('prizes', prizes.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ChampionshipFormData) => {
    console.log(data);
    navigate('/campeonatos');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/campeonatos')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Campeonato' : 'Novo Campeonato'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        {/* Informações Gerais */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações Gerais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome do Campeonato"
              {...register('name')}
              error={errors.name?.message}
            />
            
            <select
              className="input"
              {...register('category')}
            >
              <option value="">Selecione a categoria</option>
              <option value="sub-11">Sub-11</option>
              <option value="sub-13">Sub-13</option>
              <option value="sub-15">Sub-15</option>
            </select>

            <Input
              label="Data de Início"
              type="date"
              {...register('startDate')}
              error={errors.startDate?.message}
            />
            
            <Input
              label="Data de Término"
              type="date"
              {...register('endDate')}
              error={errors.endDate?.message}
            />

            <Input
              label="Local"
              {...register('location')}
              error={errors.location?.message}
            />

            <Input
              label="Número Máximo de Equipes"
              type="number"
              {...register('maxTeams')}
              error={errors.maxTeams?.message}
            />

            <select
              className="input"
              {...register('format')}
            >
              <option value="">Selecione o formato</option>
              <option value="league">Liga (Pontos Corridos)</option>
              <option value="knockout">Eliminatórias</option>
              <option value="groups">Grupos + Eliminatórias</option>
            </select>

            <Input
              label="Data Limite para Inscrição"
              type="date"
              {...register('deadlineDate')}
              error={errors.deadlineDate?.message}
            />
          </div>
        </div>

        {/* Custos e Logística */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Custos e Logística</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Taxa de Inscrição"
              type="number"
              prefix="R$"
              {...register('registrationFee')}
              error={errors.registrationFee?.message}
            />

            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('transportIncluded')}
                  onChange={(e) => {
                    register('transportIncluded').onChange(e);
                    setShowTransportFee(e.target.checked);
                  }}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span>Transporte Incluído</span>
              </label>

              {showTransportFee && (
                <Input
                  label="Taxa de Transporte"
                  type="number"
                  prefix="R$"
                  {...register('transportFee')}
                />
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('uniformRequired')}
                  onChange={(e) => {
                    register('uniformRequired').onChange(e);
                    setShowUniformFee(e.target.checked);
                  }}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span>Uniforme Necessário</span>
              </label>

              {showUniformFee && (
                <Input
                  label="Taxa do Uniforme"
                  type="number"
                  prefix="R$"
                  {...register('uniformFee')}
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formas de Pagamento Aceitas
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Dinheiro'].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register('paymentMethods')}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethods && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentMethods.message}</p>
            )}
          </div>
        </div>

        {/* Autorização */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Termo de Autorização</h2>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={FileText}
              onClick={() => window.print()}
            >
              Imprimir Modelo
            </Button>
          </div>
          
          <div>
            <textarea
              className="input h-64 font-mono text-sm"
              {...register('authorizationText')}
              error={errors.authorizationText?.message}
            />
            {errors.authorizationText && (
              <p className="mt-1 text-sm text-red-600">{errors.authorizationText.message}</p>
            )}
          </div>
        </div>

        {/* Detalhes do Campeonato */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Detalhes do Campeonato</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                className="input h-32"
                placeholder="Descreva os detalhes do campeonato"
                {...register('description')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Regulamento
              </label>
              <textarea
                className="input h-32"
                placeholder="Liste as regras e regulamentos do campeonato"
                {...register('rules')}
              />
            </div>
          </div>
        </div>

        {/* Premiação */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Premiação</h2>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={addPrize}
            >
              Adicionar Prêmio
            </Button>
          </div>
          
          <div className="space-y-3">
            {prizes.map((_, index) => (
              <div key={index} className="flex gap-4 items-start">
                <Input
                  className="flex-1"
                  placeholder="Posição (ex: 1º Lugar)"
                  {...register(`prizes.${index}.position`)}
                />
                <Input
                  className="flex-1"
                  placeholder="Descrição do prêmio"
                  {...register(`prizes.${index}.description`)}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    icon={X}
                    onClick={() => removePrize(index)}
                  />
                )}
              </div>
            ))}
            {errors.prizes && (
              <p className="text-sm text-red-600">{errors.prizes.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/campeonatos')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            icon={Save}
          >
            {isEditing ? 'Atualizar' : 'Criar'} Campeonato
          </Button>
        </div>
      </form>
    </div>
  );
}