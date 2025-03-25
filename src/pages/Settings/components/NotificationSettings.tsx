import React from 'react';

export function NotificationSettings() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Configurações de Notificações</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Email</h3>
          <div className="space-y-2">
            {[
              'Novos alunos',
              'Pagamentos recebidos',
              'Avaliações realizadas',
              'Mensagens recebidas',
              'Lembretes de aulas',
            ].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Push</h3>
          <div className="space-y-2">
            {[
              'Mensagens instantâneas',
              'Alterações de horário',
              'Eventos importantes',
              'Alertas do sistema',
            ].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">SMS</h3>
          <div className="space-y-2">
            {[
              'Confirmação de pagamento',
              'Lembretes importantes',
              'Alterações de última hora',
            ].map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}