import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, Users, Megaphone, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { DashboardCard } from '../../components/DashboardCard';
import { AnnouncementsList } from './components/AnnouncementsList';
import { RecentMessages } from './components/RecentMessages';

const mockAnnouncements = [
  {
    id: 1,
    title: 'Festival de Futebol - Próximo Mês',
    content: 'Prepare-se para o nosso festival anual de futebol...',
    category: 'Evento',
    date: '15/03/2024',
    author: 'Ricardo Silva',
    priority: 'Alta',
  },
  {
    id: 2,
    title: 'Alteração no Horário dos Treinos',
    content: 'Informamos que a partir da próxima semana...',
    category: 'Aviso',
    date: '14/03/2024',
    author: 'Ana Paula',
    priority: 'Média',
  },
];

const mockMessages = [
  {
    id: 1,
    sender: 'Maria Silva',
    subject: 'Dúvida sobre horário',
    preview: 'Olá, gostaria de confirmar...',
    date: '15/03/2024',
    unread: true,
  },
  {
    id: 2,
    sender: 'João Santos',
    subject: 'Ausência no treino',
    preview: 'Bom dia, meu filho não poderá...',
    date: '14/03/2024',
    unread: false,
  },
];

export function CommunicationsDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Comunicações</h1>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            icon={MessageCircle}
            onClick={() => navigate('mensagens')}
          >
            Nova Mensagem
          </Button>
          <Button
            icon={Plus}
            onClick={() => navigate('anuncios/novo')}
          >
            Novo Anúncio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Anúncios Ativos"
          value="8"
          icon={Megaphone}
        />
        <DashboardCard
          title="Mensagens Não Lidas"
          value="12"
          icon={Bell}
          trend={{ value: 3, isPositive: false }}
        />
        <DashboardCard
          title="Total de Conversas"
          value="45"
          icon={MessageCircle}
        />
        <DashboardCard
          title="Alcance"
          value="156"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnnouncementsList announcements={mockAnnouncements} />
        <RecentMessages messages={mockMessages} />
      </div>
    </div>
  );
}