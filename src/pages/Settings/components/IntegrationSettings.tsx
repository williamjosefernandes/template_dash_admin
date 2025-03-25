import React from 'react';
import { Input } from '../../../components/ui/Input';

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Integrações</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure as integrações com outros serviços.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">Gateway de Pagamento</h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Chave da API"
              type="password"
              placeholder="Digite sua chave de API"
            />
            <Input
              label="Chave Secreta"
              type="password"
              placeholder="Digite sua chave secreta"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">Serviço de Email</h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="SMTP Server"
              placeholder="smtp.exemplo.com"
            />
            <Input
              label="Porta SMTP"
              type="number"
              placeholder="587"
            />
            <Input
              label="Usuário SMTP"
              placeholder="seu@email.com"
            />
            <Input
              label="Senha SMTP"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">Webhook</h4>
          <div className="space-y-4">
            <Input
              label="URL do Webhook"
              placeholder="https://sua-url.com/webhook"
            />
            <Input
              label="Token de Autenticação"
              type="password"
              placeholder="Digite o token de autenticação"
            />
          </div>
        </div>
      </div>
    </div>
  );
}