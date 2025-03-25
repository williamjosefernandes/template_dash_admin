import React from 'react';

interface Class {
  time: string;
  class: string;
  students: number;
  teacher: string;
  field: string;
}

interface ScheduleCardProps {
  classes: Class[];
}

export function ScheduleCard({ classes }: ScheduleCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Próximas Aulas</h2>
      <div className="space-y-4">
        {classes.map((aula, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-green-600 font-semibold">{aula.time}</span>
                <span className="text-sm text-gray-500">{aula.field}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{aula.class}</span>
                <span className="text-sm text-gray-500">Prof. {aula.teacher}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-600">{aula.students} alunos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}