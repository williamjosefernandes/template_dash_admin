import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Olá! Sou seu assistente IA. Posso ajudar com análises de dados, insights e recomendações para sua escola de futebol. O que gostaria de saber?',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'bot',
    content: 'Algumas sugestões:\n- Análise de desempenho dos alunos\n- Oportunidades de crescimento\n- Otimização de turmas\n- Tendências financeiras',
    timestamp: new Date(),
  },
];

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simula o tempo de resposta da IA
    await new Promise(resolve => setTimeout(resolve, 1500));

    let response = '';
    
    if (userMessage.toLowerCase().includes('desempenho')) {
      response = 'Analisando os dados de desempenho dos últimos 3 meses:\n\n' +
        '• 85% dos alunos mostraram melhoria técnica significativa\n' +
        '• Destaque para a categoria Sub-13 com evolução de 32%\n' +
        '• Identificamos 5 alunos com potencial para categorias avançadas\n\n' +
        'Recomendação: Considere criar um programa de elite para estes alunos destacados.';
    } else if (userMessage.toLowerCase().includes('crescimento')) {
      response = 'Baseado nos dados atuais, identifiquei estas oportunidades:\n\n' +
        '• Alta demanda não atendida para categoria Sub-9\n' +
        '• Potencial para expansão de horários aos sábados\n' +
        '• 73% dos pais indicariam a escola\n\n' +
        'Projeção: Implementando estas mudanças, podemos aumentar a receita em 25% nos próximos 6 meses.';
    } else if (userMessage.toLowerCase().includes('turma')) {
      response = 'Análise de otimização das turmas:\n\n' +
        '• Turmas da manhã estão com 65% de ocupação\n' +
        '• Pico de demanda entre 17h e 19h\n' +
        '• Possibilidade de abertura de 2 novas turmas\n\n' +
        'Sugestão: Redistribuir alguns alunos para otimizar o uso dos campos e professores.';
    } else if (userMessage.toLowerCase().includes('financeiro')) {
      response = 'Análise financeira do último trimestre:\n\n' +
        '• Crescimento de receita: +15%\n' +
        '• Taxa de inadimplência: 3.5%\n' +
        '• Margem de lucro: 32%\n\n' +
        'Oportunidade: Implementar pacotes premium com serviços adicionais pode aumentar o ticket médio em 20%.';
    } else {
      response = 'Com base nos dados atuais, posso sugerir algumas ações:\n\n' +
        '• Expansão de categorias sub-9 e sub-17\n' +
        '• Implementação de programa de indicações\n' +
        '• Otimização dos horários ociosos\n' +
        '• Desenvolvimento de pacotes premium\n\n' +
        'Gostaria de saber mais sobre algum destes tópicos?';
    }

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
    }]);

    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    await mockAIResponse(input);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Brain className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Assistente IA</h2>
            <p className="text-sm text-purple-100">Análise inteligente em tempo real</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
          >
            {message.type === 'bot' && (
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
            )}
            <div
              className={`flex-1 max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap ${
                message.type === 'user'
                  ? 'bg-green-600 text-white ml-12'
                  : 'bg-gray-100 text-gray-800 mr-12'
              }`}
            >
              {message.content}
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-green-600" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre sua escola..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}