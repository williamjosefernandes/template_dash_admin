import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EvaluationList } from './EvaluationList';
import { EvaluationForm } from './EvaluationForm';

export function Evaluations() {
  return (
    <Routes>
      <Route index element={<EvaluationList />} />
      <Route path="novo" element={<EvaluationForm />} />
      <Route path="editar/:id" element={<EvaluationForm />} />
    </Routes>
  );
}