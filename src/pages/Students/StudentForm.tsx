import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CreditCard,
  School,
  FileText,
  Link,
  Printer,
  DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ContractPreview } from './components/ContractPreview';
import { PaymentModal } from './components/PaymentModal';

const studentSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.string().min(5, 'Endereço deve ter no mínimo 5 caracteres'),
  classId: z.string().min(1, 'Selecione uma turma'),
  paymentMethod: z.enum(['credit', 'debit', 'pix', 'cash']),
  installments: z.number().min(1).max(12),
  // Novos campos
  parentName: z.string().min(3, 'Nome do responsável é obrigatório'),
  parentCPF: z.string().min(11, 'CPF do responsável é obrigatório'),
  parentRG: z.string().min(7, 'RG do responsável é obrigatório'),
  emergencyContact: z.string().min(10, 'Contato de emergência é obrigatório'),
  healthInfo: z.string(),
  acceptedTerms: z.boolean().refine(val => val === true, {
    message: 'Você precisa aceitar os termos do contrato'
  })
});

type StudentFormData = z.infer<typeof studentSchema>;

const mockClasses = [
  { 
    id: '1', 
    name: 'Sub-11 Avançado', 
    schedule: 'Seg/Qua/Sex 14:00', 
    spots: {
      total: 20,
      taken: 15,
      available: 5
    },
    field: 'Campo 1',
    teacher: 'Ricardo Silva',
    price: 250
  },
  { 
    id: '2', 
    name: 'Sub-13 Iniciante', 
    schedule: 'Ter/Qui 15:30', 
    spots: {
      total: 18,
      taken: 15,
      available: 3
    },
    field: 'Campo 2',
    teacher: 'Ana Paula',
    price: 250
  },
  { 
    id: '3', 
    name: 'Sub-15 Intermediário', 
    schedule: 'Seg/Qua/Sex 16:00', 
    spots: {
      total: 20,
      taken: 16,
      available: 4
    },
    field: 'Campo 1',
    teacher: 'Carlos Santos',
    price: 250
  }
];

const paymentMethods = [
  { id: 'credit', label: 'Cartão de Crédito', icon: CreditCard },
  { id: 'debit', label: 'Cartão de Débito', icon: CreditCard },
  { id: 'pix', label: 'PIX', icon: Link },
  { id: 'cash', label: 'Dinheiro', icon: DollarSign }
];

export function StudentForm() {
  const [showInstallments, setShowInstallments] = useState(false);
  const [showContractPreview, setShowContractPreview] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof mockClasses[0] | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    formState: { errors, isValid } 
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      installments: 1,
      acceptedTerms: false
    }
  });

  const onSubmit = (data: StudentFormData) => {
    if (!data.acceptedTerms) {
      alert('Você precisa aceitar os termos do contrato');
      return;
    }
    setShowPaymentModal(true);
  };

  const selectedPaymentMethod = watch('paymentMethod');
  const classId = watch('classId');
  const acceptedTerms = watch('acceptedTerms');

  const handleClassSelection = (classItem: typeof mockClasses[0]) => {
    setValue('classId', classItem.id);
    setSelectedClass(classItem);
  };

  const handlePrintContract = () => {
    window.print();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto p-6">
      {/* Informações do Aluno */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User className="h-5 w-5" />
          Informações do Aluno
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome Completo"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Data de Nascimento"
            type="date"
            max={format(new Date(), 'yyyy-MM-dd')}
            {...register('birthDate')}
            error={errors.birthDate?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informações de Saúde
            </label>
            <textarea
              className="input h-24"
              placeholder="Alergias, medicamentos, condições especiais..."
              {...register('healthInfo')}
            />
          </div>
        </div>
      </div>

      {/* Informações do Responsável */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User className="h-5 w-5" />
          Informações do Responsável
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome do Responsável"
            {...register('parentName')}
            error={errors.parentName?.message}
          />

          <Input
            label="CPF"
            {...register('parentCPF')}
            error={errors.parentCPF?.message}
          />

          <Input
            label="RG"
            {...register('parentRG')}
            error={errors.parentRG?.message}
          />

          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Telefone Principal"
            {...register('phone')}
            error={errors.phone?.message}
          />

          <Input
            label="Contato de Emergência"
            {...register('emergencyContact')}
            error={errors.emergencyContact?.message}
          />

          <Input
            label="Endereço Completo"
            className="md:col-span-2"
            {...register('address')}
            error={errors.address?.message}
          />
        </div>
      </div>

      {/* Seleção de Turma */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <School className="h-5 w-5" />
          Seleção de Turma
        </h2>

        <div className="space-y-3">
          {mockClasses.map((classItem) => (
            <label
              key={classItem.id}
              className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                watch('classId') === classItem.id
                  ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                  : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
              } ${
                classItem.spots.available === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={classItem.id}
                    {...register('classId')}
                    onChange={() => handleClassSelection(classItem)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    disabled={classItem.spots.available === 0}
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{classItem.name}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{classItem.schedule}</span>
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        <span>{classItem.field}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Professor: {classItem.teacher}</span>
                        <span>•</span>
                        <DollarSign className="h-4 w-4" />
                        <span>Mensalidade: R$ {classItem.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    classItem.spots.available === 0
                      ? 'bg-red-100 text-red-800'
                      : classItem.spots.available <= 3
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {classItem.spots.available === 0
                      ? 'Turma Cheia'
                      : `${classItem.spots.available} ${
                          classItem.spots.available === 1 ? 'vaga' : 'vagas'
                        }`}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {classItem.spots.taken}/{classItem.spots.total} alunos
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Contrato e Pagamento */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contrato e Pagamento
        </h2>

        <div className="space-y-6">
          {/* Visualização do Contrato */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Contrato de Matrícula</h3>
              <p className="text-sm text-gray-600 mt-1">
                Leia e aceite os termos do contrato para prosseguir
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                icon={FileText}
                onClick={() => setShowContractPreview(true)}
              >
                Visualizar
              </Button>
              <Button
                type="button"
                variant="secondary"
                icon={Printer}
                onClick={handlePrintContract}
              >
                Imprimir
              </Button>
            </div>
          </div>

          {/* Aceitação dos Termos */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('acceptedTerms')}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-600">
              Li e aceito os termos do contrato
            </span>
          </label>

          {/* Forma de Pagamento */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Forma de Pagamento da Matrícula
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      watch('paymentMethod') === method.id
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                        : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      {...register('paymentMethod')}
                      className="sr-only"
                      onChange={(e) => {
                        register('paymentMethod').onChange(e);
                        setShowInstallments(e.target.value === 'credit');
                      }}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {showInstallments && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Parcelas
              </label>
              <select
                {...register('installments', { valueAsNumber: true })}
                className="input max-w-xs"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}x {i === 0 ? ' à vista' : ' sem juros'}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Finalizar */}
      <div className="flex justify-end">
        <Button
          type="submit"
          icon={CreditCard}
          disabled={!isValid || !acceptedTerms}
        >
          Finalizar Matrícula
        </Button>
      </div>

      {/* Modal de Visualização do Contrato */}
      {showContractPreview && (
        <ContractPreview
          onClose={() => setShowContractPreview(false)}
          studentData={{
            name: watch('name'),
            parentName: watch('parentName'),
            className: selectedClass?.name || '',
            schedule: selectedClass?.schedule || '',
            price: selectedClass?.price || 0
          }}
        />
      )}

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          paymentMethod={selectedPaymentMethod}
          amount={selectedClass?.price || 0}
          installments={watch('installments')}
        />
      )}
    </form>
  );
}