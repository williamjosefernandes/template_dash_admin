import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const classSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  teacher: z.string().min(1, 'Professor é obrigatório'),
  maxStudents: z.string().min(1, 'Número máximo de alunos é obrigatório'),
  field: z.string().min(1, 'Campo é obrigatório'),
  schedule: z.array(z.object({
    day: z.string(),
    time: z.string(),
  })).min(1, 'Adicione pelo menos um horário'),
  description: z.string(),
  objectives: z.string(),
});

type ClassFormData = z.infer<typeof classSchema>;

export function ClassForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      schedule: [{ day: '', time: '' }],
    },
  });

  const schedule = watch('schedule');

  const addSchedule = () => {
    setValue('schedule', [...schedule, { day: '', time: '' }]);
  };

  const removeSchedule = (index: number) => {
    setValue('schedule', schedule.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ClassFormData) => {
    console.log(data);
    navigate('/turmas');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/turmas')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Turma' : 'Nova Turma'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações da Turma</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome da Turma"
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
            <select
              className="input"
              {...register('teacher')}
            >
              <option value="">Selecione o professor</option>
              <option value="1">Ricardo Silva</option>
              <option value="2">Ana Paula</option>
            </select>
            <Input
              label="Número Máximo de Alunos"
              type="number"
              {...register('maxStudents')}
              error={errors.maxStudents?.message}
            />
            <select
              className="input"
              {...register('field')}
            >
              <option value="">Selecione o campo</option>
              <option value="campo1">Campo 1</option>
              <option value="campo2">Campo 2</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Horários</h2>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={addSchedule}
            >
              Adicionar Horário
            </Button>
          </div>
          
          <div className="space-y-3">
            {schedule.map((_, index) => (
              <div key={index} className="flex gap-4 items-start">
                <select
                  className="input flex-1"
                  {...register(`schedule.${index}.day`)}
                >
                  <option value="">Dia da semana</option>
                  <option value="segunda">Segunda-feira</option>
                  <option value="terca">Terça-feira</option>
                  <option value="quarta">Quarta-feira</option>
                  <option value="quinta">Quinta-feira</option>
                  <option value="sexta">Sexta-feira</option>
                  <option value="sabado">Sábado</option>
                </select>
                <Input
                  type="time"
                  className="flex-1"
                  {...register(`schedule.${index}.time`)}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    icon={X}
                    onClick={() => removeSchedule(index)}
                  />
                )}
              </div>
            ))}
            {errors.schedule && (
              <p className="text-sm text-red-600">{errors.schedule.message}</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Detalhes do Treinamento</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição da Turma
              </label>
              <textarea
                className="input h-32"
                placeholder="Descreva os detalhes e características da turma"
                {...register('description')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objetivos
              </label>
              <textarea
                className="input h-32"
                placeholder="Liste os principais objetivos e metas da turma"
                {...register('objectives')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/turmas')}
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