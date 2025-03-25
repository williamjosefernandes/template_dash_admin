import React from 'react';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GeneralSettings } from './components/GeneralSettings';
import { NotificationSettings } from './components/NotificationSettings';
import { SecuritySettings } from './components/SecuritySettings';
import { IntegrationSettings } from './components/IntegrationSettings';

const settingsSchema = z.object({
  schoolName: z.string().min(3, 'Nome da escola deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  logo: z.string().optional(),
  timezone: z.string(),
  currency: z.string(),
  language: z.string(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      schoolName: 'Fut Academy',
      email: 'contato@futacademy.com',
      phone: '(11) 98765-4321',
      address: 'Rua do Futebol, 123',
      timezone: 'America/Sao_Paulo',
      currency: 'BRL',
      language: 'pt-BR',
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <Button
          icon={Save}
          onClick={handleSubmit(onSubmit)}
        >
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GeneralSettings register={register} errors={errors} />
          <NotificationSettings />
          <SecuritySettings />
        </div>

        <div className="space-y-6">
          <IntegrationSettings />
        </div>
      </div>
    </div>
  );
}