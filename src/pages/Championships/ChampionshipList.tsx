import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Medal, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const mockChampionships = [
  {
    id: 1,
    name: 'Copa Fut Academy Sub-13',
    status: 'Em Andamento',
    startDate: '15/03/2024',
    endDate: '30/03/2024',
    location: 'Campo Principal',
    teams: 8,
    category: 'Sub-13',
    matches: 15,
    nextMatch: {
      date: '18/03/2024',
      time: '14:00',
      teams: 'Águias vs Leões'
    }
  },
  {
    id: 2,
    name: 'Torneio de Inverno 2024',
    status: 'Planejado',
    startDate: '01/07/2024',
    endDate: '15/07/2024',
    location: 'Campos 1 e 2',
    teams: 12,
    category: 'Sub-15',
    matches: 22,
  },
];

export function ChampionshipList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Campeonatos</h1>
        <Button
          icon={Plus}
          onClick={() => navigate('novo')}
        >
          Novo Campeonato
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar campeonatos..."
            className="max-w-md"
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <select className="input max-w-xs">
            <option value="">Todas as categorias</option>
            <option value="sub-11">Sub-11</option>
            <option value="sub-13">Sub-13</option>
            <option value="sub-15">Sub-15</option>
          </select>
          <select className="input max-w-xs">
            <option value="">Todos os status</option>
            <option value="planned">Planejado</option>
            <option value="ongoing">Em Andamento</option>
            <option value="finished">Finalizado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockChampionships.map((championship) => (
          <div
            key={championship.id}
            onClick={() => navigate(`${championship.id}`)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{championship.name}</h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    championship.status === 'Em Andamento'
                      ? 'bg-green-100 text-green-800'
                      : championship.status === 'Planejado'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {championship.status}
                  </span>
                </div>
                <Medal className="text-green-600" size={24} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{championship.startDate} - {championship.endDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{championship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{championship.teams} equipes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Medal size={16} />
                  <span>{championship.category}</span>
                </div>
              </div>

              {championship.nextMatch && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Próximo Jogo</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-green-600">{championship.nextMatch.teams}</span>
                    <span className="text-sm text-green-600">
                      {championship.nextMatch.date} • {championship.nextMatch.time}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}