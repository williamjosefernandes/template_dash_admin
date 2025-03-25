import React from 'react';
import { Brain, TrendingUp, AlertCircle, Target, Users, DollarSign } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const performanceData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Desempenho Médio',
      data: [7.5, 7.8, 8.1, 8.3, 8.5, 8.8],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.3,
      fill: true,
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 6,
      max: 10,
    },
  },
};

export function AIQuickAnalysis() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Desempenho</h3>
              <p className="text-sm text-gray-600">Evolução média</p>
            </div>
          </div>
          <div className="h-[200px]">
            <Line data={performanceData} options={options} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Alunos em Destaque</h3>
              <p className="text-sm text-gray-600">Últimos 30 dias</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: 'João Silva', improvement: '+15%', skill: 'Drible' },
              { name: 'Maria Santos', improvement: '+12%', skill: 'Passe' },
              { name: 'Pedro Costa', improvement: '+10%', skill: 'Chute' },
            ].map((student, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.skill}</p>
                </div>
                <span className="text-green-600 font-medium">{student.improvement}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertCircle className="text-amber-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Pontos de Atenção</h3>
              <p className="text-sm text-gray-600">Requerem ação</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { issue: 'Frequência Irregular', count: 8, type: 'alunos' },
              { issue: 'Queda de Rendimento', count: 5, type: 'alunos' },
              { issue: 'Risco de Evasão', count: 3, type: 'alunos' },
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <p className="font-medium">{alert.issue}</p>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  {alert.count} {alert.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Análise de Desempenho</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Pontos Fortes</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  85% dos alunos mostraram evolução técnica
                </li>
                <li className="flex items-center gap-2 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Categoria Sub-13 com melhor desenvolvimento
                </li>
                <li className="flex items-center gap-2 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Alta satisfação com metodologia (92%)
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Áreas de Melhoria</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-amber-800">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Frequência irregular em 15% dos alunos
                </li>
                <li className="flex items-center gap-2 text-amber-800">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Necessidade de reforço tático Sub-15
                </li>
                <li className="flex items-center gap-2 text-amber-800">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Ocupação abaixo do ideal nas manhãs
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Recomendações Imediatas</h3>
          <div className="space-y-4">
            <button className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-purple-900">Programa de Retenção</p>
                  <p className="text-sm text-purple-700">
                    Implementar acompanhamento personalizado para 8 alunos
                  </p>
                </div>
                <span className="text-purple-600">→</span>
              </div>
            </button>

            <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900">Otimização de Grade</p>
                  <p className="text-sm text-blue-700">
                    Reorganizar horários para maior aproveitamento
                  </p>
                </div>
                <span className="text-blue-600">→</span>
              </div>
            </button>

            <button className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-900">Programa de Elite</p>
                  <p className="text-sm text-green-700">
                    Criar turma especial para 5 alunos destacados
                  </p>
                </div>
                <span className="text-green-600">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}