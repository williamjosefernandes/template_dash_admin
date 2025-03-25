import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const evaluationSchema = z.object({
  student: z.string().min(1, 'Aluno é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  evaluator: z.string().min(1, 'Avaliador é obrigatório'),
  technical: z.object({
    ballControl: z.string().min(1, 'Nota obrigatória'),
    passing: z.string().min(1, 'Nota obrigatória'),
    shooting: z.string().min(1, 'Nota obrigatória'),
    dribbling: z.string().min(1, 'Nota obrigatória'),
  }),
  tactical: z.object({
    positioning: z.string().min(1, 'Nota obrigatória'),
    gameReading: z.string().min(1, 'Nota obrigatória'),
    decision: z.string().min(1, 'Nota obrigatória'),
    teamwork: z.string().min(1, 'Nota obrigatória'),
  }),
  physical: z.object({
    speed: z.string().min(1, 'Nota obrigatória'),
    strength: z.string().min(1, 'Nota obrigatória'),
    agility: z.string().min(1, 'Nota obrigatória'),
    resistance: z.string().min(1, 'Nota obrigatória'),
  }),
  observations: z.string(),
  recommendations: z.string(),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

export function EvaluationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
  });

  const onSubmit = (data: EvaluationFormData) => {
    console.log(data);
    navigate('/avaliacoes');
  };

  const renderScoreInputs = (category: string, fields: string[], prefix: keyof EvaluationFormData) => (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">{category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field} className="flex items-center gap-4">
            <label className="flex-1 text-sm text-gray-600">{field}</label>
            <Input
              type="number"
              min="0"
              max="10"
              step="0.5"
              className="w-20"
              {...register(`${prefix}.${field.toLowerCase()}` as any)}
              error={errors[prefix]?.[field.toLowerCase() as keyof typeof errors[typeof prefix]]?.message}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/avaliacoes')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Avaliação' : 'Nova Avaliação'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações Gerais</h2>
          
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
              type="date"
              label="Data da Avaliação"
              {...register('date')}
              error={errors.date?.message}
            />
            <select
              className="input"
              {...register('evaluator')}
            >
              <option value="">Selecione o avaliador</option>
              <option value="1">Ricardo Silva</option>
              <option value="2">Ana Paula</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Avaliação de Desempenho</h2>
          
          {renderScoreInputs('Aspectos Técnicos', ['BallControl', 'Passing', 'Shooting', 'Dribbling'], 'technical')}
          {renderScoreInputs('Aspectos Táticos', ['Positioning', 'GameReading', 'Decision', 'Teamwork'], 'tactical')}
          {renderScoreInputs('Aspectos Físicos', ['Speed', 'Strength', 'Agility', 'Resistance'], 'physical')}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Observações e Recomendações</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações Gerais
              </label>
              <textarea
                className="input h-32"
                placeholder="Descreva as observações sobre o desempenho do aluno"
                {...register('observations')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recomendações de Desenvolvimento
              </label>
              <textarea
                className="input h-32"
                placeholder="Liste as recomendações para melhorar o desempenho"
                {...register('recommendations')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/avaliacoes')}
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