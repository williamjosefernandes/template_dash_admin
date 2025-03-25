import React, { useState } from 'react';
import { Brain, TrendingUp, Target, AlertCircle, Users, DollarSign, Trophy, Calendar, BarChart2, Zap } from 'lucide-react';
import { AIMetrics } from './components/AIMetrics';
import { AIRecommendations } from './components/AIRecommendations';
import { AITrends } from './components/AITrends';
import { AIAssistant } from './components/AIAssistant';
import { QuickAnalysisModal } from './components/AIQuickAnalysis';
import { AIPredictions } from './components/AIPredictions';
import { AIOpportunities } from './components/AIOpportunities';
import { AIQuickAnalysis } from './components/AIQuickAnalysisDashboard';
import { AIGoals } from './components/AIGoals';

export function AI() {
  const [showQuickAnalysis, setShowQuickAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'predictions' | 'analysis' | 'opportunities' | 'goals'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'predictions':
        return <AIPredictions />;
      case 'analysis':
        return <AIQuickAnalysis />;
      case 'opportunities':
        return <AIOpportunities />;
      case 'goals':
        return <AIGoals />;
      default:
        return (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button 
                onClick={() => setActiveTab('analysis')}
                className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <Zap size={24} />
                  <div className="text-left">
                    <h3 className="font-semibold">Análise Rápida</h3>
                    <p className="text-sm opacity-90">Gerar insights instantâneos</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('predictions')}
                className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <Brain size={24} />
                  <div className="text-left">
                    <h3 className="font-semibold">Previsões</h3>
                    <p className="text-sm opacity-90">Ver projeções futuras</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('opportunities')}
                className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <Trophy size={24} />
                  <div className="text-left">
                    <h3 className="font-semibold">Oportunidades</h3>
                    <p className="text-sm opacity-90">Descobrir potenciais</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('goals')}
                className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <Target size={24} />
                  <div className="text-left">
                    <h3 className="font-semibold">Metas</h3>
                    <p className="text-sm opacity-90">Definir objetivos</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Métricas e Insights */}
              <div className="lg:col-span-2 space-y-6">
                <AIMetrics />
                <AIRecommendations />
              </div>

              {/* Assistente IA */}
              <div>
                <AIAssistant />
              </div>
            </div>

            {/* Tendências e Projeções */}
            <AITrends />
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inteligência Artificial</h1>
          <p className="text-gray-600 mt-1">Análise inteligente e insights estratégicos</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <Brain className="text-purple-500" size={20} />
            <span className="text-sm font-medium text-gray-600">IA Ativa</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Análise em tempo real</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${
            activeTab === 'dashboard'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
          {activeTab === 'dashboard' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${
            activeTab === 'analysis'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('analysis')}
        >
          Análise Rápida
          {activeTab === 'analysis' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${
            activeTab === 'predictions'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('predictions')}
        >
          Previsões
          {activeTab === 'predictions' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${
            activeTab === 'opportunities'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('opportunities')}
        >
          Oportunidades
          {activeTab === 'opportunities' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${
            activeTab === 'goals'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('goals')}
        >
          Metas
          {activeTab === 'goals' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
      </div>

      {renderContent()}

      {/* Quick Analysis Modal */}
      <QuickAnalysisModal 
        isOpen={showQuickAnalysis}
        onClose={() => setShowQuickAnalysis(false)}
      />
    </div>
  );
}