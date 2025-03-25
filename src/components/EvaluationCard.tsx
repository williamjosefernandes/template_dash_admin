import React from 'react';

interface Evaluation {
  name: string;
  age: number;
  performance: 'Excelente' | 'Bom' | 'Regular';
  date: string;
  skills: {
    technical: number;
    tactical: number;
    physical: number;
  };
}

interface EvaluationCardProps {
  evaluations: Evaluation[];
}

export function EvaluationCard({ evaluations }: EvaluationCardProps) {
  const getSkillColor = (value: number) => {
    if (value >= 8) return 'bg-green-100 text-green-800';
    if (value >= 6) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Últimas Avaliações</h2>
      <div className="space-y-4">
        {evaluations.map((aluno, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{aluno.name}</p>
                <p className="text-sm text-gray-600">{aluno.age} anos • {aluno.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                aluno.performance === 'Excelente' ? 'bg-green-100 text-green-800' :
                aluno.performance === 'Bom' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {aluno.performance}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className={`text-center p-1 rounded ${getSkillColor(aluno.skills.technical)}`}>
                <p className="text-xs">Técnico</p>
                <p className="font-semibold">{aluno.skills.technical}</p>
              </div>
              <div className={`text-center p-1 rounded ${getSkillColor(aluno.skills.tactical)}`}>
                <p className="text-xs">Tático</p>
                <p className="font-semibold">{aluno.skills.tactical}</p>
              </div>
              <div className={`text-center p-1 rounded ${getSkillColor(aluno.skills.physical)}`}>
                <p className="text-xs">Físico</p>
                <p className="font-semibold">{aluno.skills.physical}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}