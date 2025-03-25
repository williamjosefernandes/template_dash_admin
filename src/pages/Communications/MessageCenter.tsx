import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const mockContacts = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Responsável - João Silva',
    lastMessage: 'Olá, gostaria de confirmar...',
    date: '15/03/2024',
    unread: true,
  },
  {
    id: 2,
    name: 'Ricardo Santos',
    role: 'Professor',
    lastMessage: 'Os treinos de amanhã...',
    date: '14/03/2024',
    unread: false,
  },
];

export function MessageCenter() {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedContactData = mockContacts.find(contact => contact.id === selectedContact);

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
        <h1 className="text-2xl font-bold text-gray-900">Central de Mensagens</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm flex h-[600px]">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <Input
              placeholder="Buscar conversas..."
              icon={Search}
            />
          </div>
          <div className="divide-y divide-gray-200">
            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedContact === contact.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.unread && (
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{contact.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-medium">{selectedContactData?.name}</h2>
                <p className="text-sm text-gray-500">{selectedContactData?.role}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Add messages here */}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button icon={Send}>Enviar</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Selecione uma conversa para começar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}