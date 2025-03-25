import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ScheduleEvent {
  id: number;
  time: string;
  title: string;
  category: string;
  teacher: string;
  field: string;
  students: number;
}

const mockSchedule: Record<string, ScheduleEvent[]> = {
  '2024-03-18': [
    {
      id: 1,
      time: '14:00',
      title: 'Treino Técnico',
      category: 'Sub-11',
      teacher: 'Ricardo Silva',
      field: 'Campo 1',
      students: 15,
    },
    {
      id: 2,
      time: '15:30',
      title: 'Treino Tático',
      category: 'Sub-13',
      teacher: 'Ana Paula',
      field: 'Campo 2',
      students: 12,
    },
  ],
  '2024-03-19': [
    {
      id: 3,
      time: '14:00',
      title: 'Preparação Física',
      category: 'Sub-15',
      teacher: 'Carlos Santos',
      field: 'Campo 1',
      students: 18,
    },
  ],
};

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrentWeek, i));

  const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
  const eventsForSelectedDate = mockSchedule[formattedSelectedDate] || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
        <Button
          icon={Plus}
          onClick={() => setShowNewEventModal(true)}
        >
          Novo Agendamento
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-semibold">
              {format(startOfCurrentWeek, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          {weekDays.map((day) => (
            <button
              key={day.toString()}
              className={`p-4 rounded-lg text-center transition-colors ${
                isSameDay(day, selectedDate)
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-xs mb-1">
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div className="font-semibold">
                {format(day, 'd')}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h3>
          
          {eventsForSelectedDate.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum agendamento para este dia
            </p>
          ) : (
            <div className="space-y-3">
              {eventsForSelectedDate.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-20 text-center">
                    <span className="text-green-600 font-semibold">{event.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {event.category} • Prof. {event.teacher}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.field}</p>
                    <p className="text-sm text-gray-600">{event.students} alunos</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}