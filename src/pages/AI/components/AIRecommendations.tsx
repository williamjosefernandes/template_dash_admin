import React from 'react';
import { Brain, TrendingUp, Target, AlertCircle, ArrowRight } from 'lucide-react';

interface Recommendation {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
  action: string;
}

const recommendations: Recommendation[] = [
  {
    type: 'success',
    title: 'Oportunidade de Crescimento',
    description: 'Análise preditiva indica potencial para expansão nas categorias Sub-9 e Sub-17. Nossa IA identificou um aumento de 40% nas buscas por estas faixas etárias.',
    impact: '+25% receita',
    action: 'Expandir categorias'
  },
  {
    type: 'warning',
    title: 'Alerta de Retenção',
    description: 'IA detectou 12 alunos com padrões de comportamento indicativos de possível evasão. Principais fatores: frequência irregular e queda no desempenho.',
    impact: 'R$ 6.000/mês',
    action: 'Ver detalhes'
  },
  {
    type: 'info',
    title: 'Otimização de Horários',
    description: 'Machine Learning identificou padrões de demanda não atendida aos sábados. 85% dos pais demonstram interesse em horários alternativos.',
    impact: '+75% ocupação',
    action: 'Ajustar grade'
  }
];

export function AIRecommendations() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Inteligência Artificial</h2>
              <p className="text-green-50">Recomendações estratégicas baseadas em análise avançada</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white">Análise em tempo real</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-gray-100">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                {rec.type === 'success' && <TrendingUp className="text-green-500" size={20} />}
                {rec.type === 'warning' && <AlertCircle className="text-amber-500" size={20} />}
                {rec.type === 'info' && <Target className="text-blue-500" size={20} />}
                <h3 className="font-medium text-gray-900">{rec.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow">{rec.description}</p>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Impacto Estimado</span>
                  <span className="text-sm font-medium text-gray-900">{rec.impact}</span>
                </div>
                
                <button className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  rec.type === 'success' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                  rec.type === 'warning' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' :
                  'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}>
                  <span>{rec.action}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}