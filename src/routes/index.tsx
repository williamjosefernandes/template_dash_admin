import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Students } from '../pages/Students';
import { Teachers } from '../pages/Teachers';
import { Schedule } from '../pages/Schedule';
import { Classes } from '../pages/Classes';
import { Championships } from '../pages/Championships';
import { Evaluations } from '../pages/Evaluations';
import { Performance } from '../pages/Performance';
import { Financial } from '../pages/Financial';
import { Communications } from '../pages/Communications';
import { Settings } from '../pages/Settings';
import { AI } from '../pages/AI';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/alunos/*" element={<Students />} />
      <Route path="/professores/*" element={<Teachers />} />
      <Route path="/agenda" element={<Schedule />} />
      <Route path="/turmas/*" element={<Classes />} />
      <Route path="/campeonatos/*" element={<Championships />} />
      <Route path="/avaliacoes/*" element={<Evaluations />} />
      <Route path="/desempenho" element={<Performance />} />
      <Route path="/financeiro/*" element={<Financial />} />
      <Route path="/comunicacoes/*" element={<Communications />} />
      <Route path="/ia" element={<AI />} />
      <Route path="/configuracoes" element={<Settings />} />
    </Routes>
  );
}