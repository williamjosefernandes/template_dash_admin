import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChampionshipList } from './ChampionshipList';
import { ChampionshipForm } from './ChampionshipForm';
import { ChampionshipDetails } from './ChampionshipDetails';

export function Championships() {
  return (
    <Routes>
      <Route index element={<ChampionshipList />} />
      <Route path="novo" element={<ChampionshipForm />} />
      <Route path="editar/:id" element={<ChampionshipForm />} />
      <Route path=":id" element={<ChampionshipDetails />} />
    </Routes>
  );
}