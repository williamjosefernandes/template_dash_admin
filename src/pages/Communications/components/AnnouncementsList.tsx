import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  priority: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'média':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Anúncios Recentes</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{announcement.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {announcement.content}
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>{announcement.category}</span>
                  <span>•</span>
                  <span>{announcement.date}</span>
                  <span>•</span>
                  <span>{announcement.author}</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={Edit2}
                onClick={() => navigate(`anuncios/editar/${announcement.id}`)}
              >
                Editar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}