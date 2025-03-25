import React, { useState } from 'react';
import { Brain, X, MessageSquare, Sparkles } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white shadow-lg hover:shadow-xl transition-shadow z-50 group"
      >
        <Brain className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:w-[480px] sm:rounded-2xl shadow-xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-600 sm:rounded-t-2xl">
              <div className="flex items-center gap-3 text-white">
                <Brain className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Assistente IA</h3>
                  <p className="text-sm text-purple-100">Análise inteligente em tempo real</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 bg-gray-100 rounded-2xl p-4 space-y-2">
                  <p className="text-gray-800">
                    Olá! Estou analisando seus dados em tempo real. Aqui estão alguns insights importantes:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Potencial de crescimento de 25% identificado na categoria Sub-11
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      12 alunos mostram sinais de possível evasão
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Oportunidade de expansão para horários aos sábados
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Faça uma pergunta sobre seus dados..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}