import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const announcementSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  priority: z.string().min(1, 'Prioridade é obrigatória'),
  targetAudience: z.array(z.string()).min(1, 'Selecione pelo menos um público-alvo'),
  validUntil: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

export function AnnouncementForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
  });

  const onSubmit = (data: AnnouncementFormData) => {
    console.log(data);
    navigate('/comunicacoes');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/comunicacoes')}
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Anúncio' : 'Novo Anúncio'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Informações do Anúncio</h2>
          
          <div className="space-y-4">
            <Input
              label="Título"
              {...register('title')}
              error={errors.title?.message}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conteúdo
              </label>
              <textarea
                className="input h-32"
                {...register('content')}
              />
              {errors.content?.message && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="input"
                {...register('category')}
              >
                <option value="">Selecione a categoria</option>
                <option value="evento">Evento</option>
                <option value="aviso">Aviso</option>
                <option value="comunicado">Comunicado</option>
              </select>

              <select
                className="input"
                {...register('priority')}
              >
                <option value="">Selecione a prioridade</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-4">Configurações de Envio</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Público-alvo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Alunos', 'Pais', 'Professores', 'Funcionários'].map((audience) => (
                  <label key={audience} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={audience.toLowerCase()}
                      {...register('targetAudience')}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span>{audience}</span>
                  </label>
                ))}
              </div>
              {errors.targetAudience && (
                <p className="mt-1 text-sm text-red-600">{errors.targetAudience.message}</p>
              )}
            </div>

            <Input
              label="Válido até"
              type="date"
              {...register('validUntil')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anexos
              </label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/comunicacoes')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            icon={Save}
          >
            {isEditing ? 'Atualizar' : 'Publicar'}
          </Button>
        </div>
      </form>
    </div>
  );
}