import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClassList } from './ClassList';
import { ClassForm } from './ClassForm';

export function Classes() {
  return (
    <Routes>
      <Route index element={<ClassList />} />
      <Route path="novo" element={<ClassForm />} />
      <Route path="editar/:id" element={<ClassForm />} />
    </Routes>
  );
}