import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, Filter, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';

interface Student {
  id: number;
  name: string;
  age: number;
  category: string;
  parent: string;
  phone: string;
  status: string;
}

const mockStudents = [
  {
    id: 1,
    name: 'João Silva',
    age: 12,
    category: 'Sub-13',
    parent: 'Maria Silva',
    phone: '(11) 98765-4321',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Ana Santos',
    age: 10,
    category: 'Sub-11',
    parent: 'Carlos Santos',
    phone: '(11) 98765-4322',
    status: 'Ativo',
  },
];

export function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setShowDeleteModal(false);
      setSelectedStudent(null);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);
    
    const matchesCategory = !categoryFilter || student.category === categoryFilter;
    const matchesStatus = !statusFilter || student.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const columns = [
    { header: 'Nome', accessor: 'name' as const },
    { header: 'Idade', accessor: 'age' as const },
    { header: 'Categoria', accessor: 'category' as const },
    { header: 'Responsável', accessor: 'parent' as const },
    { header: 'Telefone', accessor: 'phone' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Ativo'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: 'Ações',
      accessor: 'id' as const,
      render: (_: any, student: Student) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`editar/${student.id}`);
            }}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(student);
            }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
        <Button
          icon={UserPlus}
          onClick={() => navigate('novo')}
        >
          Novo Aluno
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar alunos..."
            value={searchTerm}
            onChange={handleSearch}
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="input max-w-xs"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="Sub-11">Sub-11</option>
            <option value="Sub-13">Sub-13</option>
            <option value="Sub-15">Sub-15</option>
          </select>
          <select
            className="input max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          data={filteredStudents}
          onRowClick={(student) => navigate(`editar/${student.id}`)}
        />
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        studentName={selectedStudent?.name}
      />
    </div>
  );
}