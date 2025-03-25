import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export function SecuritySettings() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Configurações de Segurança</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Alterar Senha</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="password"
              label="Senha Atual"
              placeholder="Digite sua senha atual"
            />
            <Input
              type="password"
              label="Nova Senha"
              placeholder="Digite a nova senha"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Autenticação em Duas Etapas</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Status: <span className="text-red-600">Desativado</span></p>
              <p className="text-sm text-gray-600 mt-1">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
            <Button variant="secondary">Ativar</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Sessões Ativas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Chrome - Windows</p>
                <p className="text-sm text-gray-600">São Paulo, Brasil • Ativo agora</p>
              </div>
              <Button variant="secondary" size="sm">Encerrar</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Safari - iPhone</p>
                <p className="text-sm text-gray-600">São Paulo, Brasil • 2 horas atrás</p>
              </div>
              <Button variant="secondary" size="sm">Encerrar</Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Histórico de Atividades</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Login bem-sucedido</p>
              <p className="text-sm text-gray-600">Chrome - Windows • São Paulo, Brasil</p>
              <p className="text-xs text-gray-500 mt-1">15/03/2024 14:30</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Alteração de senha</p>
              <p className="text-sm text-gray-600">Safari - iPhone • São Paulo, Brasil</p>
              <p className="text-xs text-gray-500 mt-1">14/03/2024 10:15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}