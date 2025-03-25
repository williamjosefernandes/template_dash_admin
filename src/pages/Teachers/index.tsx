import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TeacherList } from './TeacherList';
import { TeacherForm } from './TeacherForm';

export function Teachers() {
  return (
    <Routes>
      <Route index element={<TeacherList />} />
      <Route path="novo" element={<TeacherForm />} />
      <Route path="editar/:id" element={<TeacherForm />} />
    </Routes>
  );
}