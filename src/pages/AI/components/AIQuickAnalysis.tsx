import React, { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, Target, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface QuickAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickAnalysisModal({ isOpen, onClose }: QuickAnalysisModalProps) {
  const [analysisStep, setAnalysisStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  React.useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Análise Rápida</h2>
              <p className="text-sm text-purple-100">Processando dados em tempo real</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {isAnalyzing ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900">Analisando dados...</p>
              <p className="text-sm text-gray-600 mt-2">
                Nossa IA está processando informações de todas as áreas
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <h3 className="font-medium text-green-900">Crescimento</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700">+25%</p>
                  <p className="text-sm text-green-600">potencial identificado</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-yellow-600" size={20} />
                    <h3 className="font-medium text-yellow-900">Atenção</h3>
                  </div>
                  <p className="text-2xl font-bold text-yellow-700">12</p>
                  <p className="text-sm text-yellow-600">alunos em risco</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-blue-600" size={20} />
                    <h3 className="font-medium text-blue-900">Oportunidades</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">5</p>
                  <p className="text-sm text-blue-600">áreas de melhoria</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Insights Principais</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800">
                      • Potencial para expansão nas categorias Sub-9 e Sub-17 com base em análise de mercado
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800">
                      • 12 alunos apresentam sinais de possível evasão nos próximos 2 meses
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">
                      • Horários da manhã com ocupação de apenas 65% - oportunidade de otimização
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Ações Recomendadas</h3>
                
                <div className="space-y-3">
                  <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-purple-900">Programa de Retenção Personalizado</p>
                        <p className="text-sm text-purple-700">Implementar para 12 alunos em risco</p>
                      </div>
                      <span className="text-purple-600">→</span>
                    </div>
                  </button>

                  <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-purple-900">Expansão de Categorias</p>
                        <p className="text-sm text-purple-700">Planejar abertura de turmas Sub-9 e Sub-17</p>
                      </div>
                      <span className="text-purple-600">→</span>
                    </div>
                  </button>

                  <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-purple-900">Otimização de Grade</p>
                        <p className="text-sm text-purple-700">Reorganizar horários para maior ocupação</p>
                      </div>
                      <span className="text-purple-600">→</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Fechar
                </Button>
                <Button>
                  Ver Relatório Completo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}