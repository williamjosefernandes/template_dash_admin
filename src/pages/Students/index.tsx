import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StudentList } from './StudentList';
import { StudentForm } from './StudentForm';

export function Students() {
  return (
    <Routes>
      <Route index element={<StudentList />} />
      <Route path="novo" element={<StudentForm />} />
      <Route path="editar/:id" element={<StudentForm />} />
    </Routes>
  );
}