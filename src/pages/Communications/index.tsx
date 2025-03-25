import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CommunicationsDashboard } from './CommunicationsDashboard';
import { AnnouncementForm } from './AnnouncementForm';
import { MessageCenter } from './MessageCenter';

export function Communications() {
  return (
    <Routes>
      <Route index element={<CommunicationsDashboard />} />
      <Route path="anuncios/novo" element={<AnnouncementForm />} />
      <Route path="anuncios/editar/:id" element={<AnnouncementForm />} />
      <Route path="mensagens" element={<MessageCenter />} />
    </Routes>
  );
}