import React from 'react';
import { Input } from '../../../components/ui/Input';

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Informações Gerais</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure as informações básicas da sua escola de futebol.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Nome da Escola"
          placeholder="Digite o nome da sua escola"
          defaultValue="Fut Academy"
        />
        
        <Input
          label="Email de Contato"
          type="email"
          placeholder="contato@escola.com"
          defaultValue="contato@futacademy.com"
        />

        <Input
          label="Telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          defaultValue="(11) 99999-9999"
        />

        <Input
          label="CNPJ"
          placeholder="00.000.000/0000-00"
          defaultValue="12.345.678/0001-90"
        />

        <div className="sm:col-span-2">
          <Input
            label="Endereço"
            placeholder="Digite o endereço completo"
            defaultValue="Rua do Futebol, 123 - Campo Grande - São Paulo/SP"
          />
        </div>
      </div>
    </div>
  );
}