import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Target, DollarSign, Users, Trophy, Star, BarChart2, Calendar } from 'lucide-react';

interface Insight {
  type: 'opportunity' | 'trend' | 'alert' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

const mockInsights: Insight[] = [
  {
    type: 'opportunity',
    title: 'Potencial de Expansão Identificado',
    description: 'Análise de dados mostra alta demanda não atendida nas categorias Sub-9 e Sub-17. Expansão pode gerar crescimento de 25% na receita.',
    impact: 'high',
    action: 'Abrir turmas piloto para Sub-9 e Sub-17 com foco em desenvolvimento progressivo',
    metrics: [
      { label: 'Demanda Potencial', value: '45 alunos' },
      { label: 'ROI Estimado', value: 'R$ 12.000/mês' }
    ]
  },
  {
    type: 'trend',
    title: 'Análise de Horários Ociosos',
    description: 'Dados mostram campos subutilizados nas manhãs de sábado, com 85% dos pais interessados em horários alternativos.',
    impact: 'high',
    action: 'Implementar programa "Sábado Futebol em Família" com treinos especiais',
    metrics: [
      { label: 'Ocupação Atual', value: '15%' },
      { label: 'Potencial', value: '90%' }
    ]
  },
  {
    type: 'recommendation',
    title: 'Programa de Indicação Premium',
    description: 'Alunos indicados têm taxa de retenção 40% maior. Sistema atual pode ser otimizado com gamificação.',
    impact: 'high',
    action: 'Lançar programa "Craques Multiplicadores" com benefícios progressivos',
    metrics: [
      { label: 'Conversão Atual', value: '15%' },
      { label: 'Meta Projetada', value: '35%' }
    ]
  },
  {
    type: 'alert',
    title: 'Oportunidade de Retenção',
    description: 'IA detectou 12 alunos com risco de evasão baseado em padrões de frequência e engajamento decrescente.',
    impact: 'high',
    action: 'Implementar programa personalizado de acompanhamento e incentivo',
    metrics: [
      { label: 'Valor em Risco', value: 'R$ 6.000/mês' },
      { label: 'Taxa de Recuperação', value: '75%' }
    ]
  },
  {
    type: 'opportunity',
    title: 'Monetização de Serviços Complementares',
    description: 'Análise de feedback mostra demanda por serviços adicionais como nutrição esportiva e preparação física específica.',
    impact: 'medium',
    action: 'Lançar pacotes premium com serviços integrados',
    metrics: [
      { label: 'Interesse', value: '65% dos alunos' },
      { label: 'Receita Adicional', value: 'R$ 8.500/mês' }
    ]
  },
  {
    type: 'trend',
    title: 'Otimização de Performance por IA',
    description: 'Análise de dados de desempenho indica padrões específicos de evolução técnica que podem ser acelerados.',
    impact: 'high',
    action: 'Implementar sistema de treino personalizado baseado em IA',
    metrics: [
      { label: 'Melhoria Esperada', value: '+40%' },
      { label: 'Satisfação Projetada', value: '95%' }
    ]
  },
  {
    type: 'recommendation',
    title: 'Expansão Digital Estratégica',
    description: 'Análise de mercado mostra oportunidade para conteúdo técnico online, com potencial de receita adicional.',
    impact: 'medium',
    action: 'Desenvolver plataforma de treinos online complementares',
    metrics: [
      { label: 'Mercado Potencial', value: 'R$ 15.000/mês' },
      { label: 'Custo Implementação', value: 'R$ 25.000' }
    ]
  },
  {
    type: 'opportunity',
    title: 'Parcerias com Clubes Profissionais',
    description: 'Dados de performance identificaram 5 alunos com potencial para categorias de base de clubes parceiros.',
    impact: 'high',
    action: 'Estabelecer programa de desenvolvimento elite com clubes profissionais',
    metrics: [
      { label: 'Alunos Potenciais', value: '5 atletas' },
      { label: 'Valor Reputacional', value: 'Alto' }
    ]
  }
];

const getIcon = (type: Insight['type']) => {
  switch (type) {
    case 'opportunity':
      return Lightbulb;
    case 'trend':
      return TrendingUp;
    case 'alert':
      return AlertCircle;
    case 'recommendation':
      return Target;
  }
};

const getTypeStyle = (type: Insight['type']) => {
  switch (type) {
    case 'opportunity':
      return 'bg-green-100 text-green-800';
    case 'trend':
      return 'bg-blue-100 text-blue-800';
    case 'alert':
      return 'bg-red-100 text-red-800';
    case 'recommendation':
      return 'bg-purple-100 text-purple-800';
  }
};

const getImpactStyle = (impact: Insight['impact']) => {
  switch (impact) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
  }
};

export function AIInsights() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              Insights Estratégicos
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Análise avançada de dados para crescimento do negócio
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">Atualizado em tempo real</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {mockInsights.map((insight, index) => {
          const Icon = getIcon(insight.type);
          return (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getTypeStyle(insight.type)}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{insight.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactStyle(insight.impact)}`}>
                      {insight.impact === 'high' ? 'Alto Impacto' : 
                       insight.impact === 'medium' ? 'Médio Impacto' : 
                       'Baixo Impacto'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  
                  {insight.metrics && (
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      {insight.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded-lg">
                          <p className="text-xs text-gray-600">{metric.label}</p>
                          <p className="text-sm font-semibold text-gray-900">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {insight.action && (
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                      <Target size={16} />
                      <span>Ação Recomendada: {insight.action}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}