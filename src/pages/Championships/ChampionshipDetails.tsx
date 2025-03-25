import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trophy, Users, Calendar, MapPin, Medal } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const mockChampionship = {
  id: 1,
  name: 'Copa Fut Academy Sub-13',
  status: 'Em Andamento',
  startDate: '15/03/2024',
  endDate: '30/03/2024',
  location: 'Campo Principal',
  teams: [
    { id: 1, name: 'Águias', points: 9, games: 4, wins: 3, draws: 0, losses: 1, goalsFor: 12, goalsAgainst: 5 },
    { id: 2, name: 'Leões', points: 7, games: 4, wins: 2, draws: 1, losses: 1, goalsFor: 8, goalsAgainst: 6 },
    { id: 3, name: 'Tigres', points: 6, games: 4, wins: 2, draws: 0, losses: 2, goalsFor: 7, goalsAgainst: 8 },
  ],
  matches: [
    {
      id: 1,
      date: '18/03/2024',
      time: '14:00',
      homeTeam: 'Águias',
      awayTeam: 'Leões',
      status: 'Agendado',
    },
    {
      id: 2,
      date: '15/03/2024',
      time: '15:30',
      homeTeam: 'Tigres',
      awayTeam: 'Águias',
      status: 'Finalizado',
      score: '1-3',
    },
  ],
};

export function ChampionshipDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate('/campeonatos')}
          >
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{mockChampionship.name}</h1>
        </div>
        <Button
          icon={Edit2}
          onClick={() => navigate(`/campeonatos/editar/${id}`)}
        >
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold">{mockChampionship.status}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Período</p>
              <p className="font-semibold">{mockChampionship.startDate} - {mockChampionship.endDate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Equipes</p>
              <p className="font-semibold">{mockChampionship.teams.length} equipes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MapPin className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Local</p>
              <p className="font-semibold">{mockChampionship.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Classificação</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">J</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">V</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GC</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockChampionship.teams.map((team, index) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="w-6 text-gray-500">{index + 1}º</span>
                        <span className="ml-2 font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{team.points}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{team.games}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{team.wins}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{team.draws}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{team.losses}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{team.goalsFor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{team.goalsAgainst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Jogos</h2>
          </div>
          <div className="p-4 space-y-4">
            {mockChampionship.matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">{match.date}</p>
                    <p className="text-xs text-gray-500">{match.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{match.homeTeam}</span>
                    {match.status === 'Finalizado' ? (
                      <span className="px-2 py-1 bg-gray-200 rounded text-sm font-medium">
                        {match.score}
                      </span>
                    ) : (
                      <span className="px-2 py-1">vs</span>
                    )}
                    <span className="font-medium">{match.awayTeam}</span>
                  </div>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  match.status === 'Agendado'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {match.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}