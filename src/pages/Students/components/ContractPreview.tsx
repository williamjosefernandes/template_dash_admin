import React from 'react';
import { Printer } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

interface ContractPreviewProps {
  onClose: () => void;
  studentData: {
    name: string;
    parentName: string;
    className: string;
    schedule: string;
    price: number;
  };
}

export function ContractPreview({ onClose, studentData }: ContractPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Contrato de Matrícula"
      size="xl"
      actions={
        <Button
          variant="secondary"
          size="sm"
          icon={Printer}
          onClick={handlePrint}
        >
          Imprimir
        </Button>
      }
    >
      <div className="space-y-6 text-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS</h1>
          <p className="text-gray-600">Fut Academy - Escola de Futebol</p>
        </div>

        <p>Pelo presente instrumento particular de contrato de prestação de serviços educacionais, de um lado:</p>

        <div className="space-y-2">
          <p><strong>CONTRATADA:</strong> Fut Academy Escola de Futebol LTDA, inscrita no CNPJ sob nº XX.XXX.XXX/0001-XX, com sede na Rua do Futebol, 123, doravante denominada ESCOLA.</p>
          
          <p><strong>CONTRATANTE:</strong> {studentData.parentName}, doravante denominado(a) RESPONSÁVEL.</p>
          
          <p><strong>ALUNO(A):</strong> {studentData.name}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">CLÁUSULA PRIMEIRA - DO OBJETO</h3>
          <p>O presente contrato tem por objeto a prestação de serviços educacionais na modalidade de ensino de futebol, na turma {studentData.className}, com aulas nos seguintes horários: {studentData.schedule}.</p>

          <h3 className="text-lg font-semibold">CLÁUSULA SEGUNDA - DO VALOR E PAGAMENTO</h3>
          <p>O valor da mensalidade é de R$ {studentData.price},00 (extenso), a ser pago até o dia 5 de cada mês.</p>

          <h3 className="text-lg font-semibold">CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES DA ESCOLA</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer instalações adequadas para a prática esportiva</li>
            <li>Disponibilizar professores qualificados</li>
            <li>Fornecer material esportivo necessário para as aulas</li>
            <li>Realizar avaliações periódicas do desenvolvimento do aluno</li>
          </ul>

          <h3 className="text-lg font-semibold">CLÁUSULA QUARTA - DAS OBRIGAÇÕES DO RESPONSÁVEL</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Efetuar os pagamentos nas datas estabelecidas</li>
            <li>Fornecer uniforme e equipamentos de uso pessoal do aluno</li>
            <li>Comunicar ausências com antecedência</li>
            <li>Manter atualizados os dados cadastrais e de saúde do aluno</li>
          </ul>

          <h3 className="text-lg font-semibold">CLÁUSULA QUINTA - DA VIGÊNCIA</h3>
          <p>O presente contrato tem vigência de 12 (doze) meses a partir da data de sua assinatura.</p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center mb-4">Local e data: São Paulo, {new Date().toLocaleDateString()}</p>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p>Fut Academy Escola de Futebol</p>
                <p className="text-sm text-gray-600">CONTRATADA</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p>{studentData.parentName}</p>
                <p className="text-sm text-gray-600">CONTRATANTE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}