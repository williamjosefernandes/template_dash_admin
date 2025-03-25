import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
}

interface RecentMessagesProps {
  messages: Message[];
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Mensagens Recentes</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => navigate('mensagens')}
            className="p-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                    {message.sender}
                  </h3>
                  {message.unread && (
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full" />
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900 truncate">
                  {message.subject}
                </p>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {message.preview}
                </p>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {message.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}