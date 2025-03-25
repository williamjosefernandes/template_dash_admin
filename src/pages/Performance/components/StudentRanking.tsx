import React from 'react';
import { Medal } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  category: string;
  performance: number;
  evolution: string;
  highlights: string[];
}

interface StudentRankingProps {
  students: Student[];
}

export function StudentRanking({ students }: StudentRankingProps) {
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return 'text-yellow-500';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-amber-600';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-6">Ranking de Alunos</h2>
      <div className="space-y-4">
        {students.map((student, index) => (
          <div
            key={student.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <Medal className={getMedalColor(index)} size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{student.performance.toFixed(1)}</p>
                  <p className="text-sm text-green-600">{student.evolution}</p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                {student.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}