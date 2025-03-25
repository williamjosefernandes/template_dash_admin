import React, { useState } from 'react';
import { Copy, Check, CreditCard, QrCode } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

interface PaymentModalProps {
  onClose: () => void;
  paymentMethod: string;
  amount: number;
  installments: number;
}

export function PaymentModal({ onClose, paymentMethod, amount, installments }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const mockPixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913Fut Academy6008Sao Paulo62070503***6304E2CA";

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(mockPixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentProcessing = () => {
    setPaymentProcessed(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Pagamento da Matrícula"
      size="md"
    >
      {paymentProcessed ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pagamento Processado!
          </h3>
          <p className="text-gray-600">
            Sua matrícula foi confirmada com sucesso.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <p className="text-gray-600">Valor da Matrícula</p>
            <p className="text-3xl font-bold text-gray-900">
              R$ {amount},00
            </p>
            {paymentMethod === 'credit' && installments > 1 && (
              <p className="text-sm text-gray-600 mt-1">
                {installments}x de R$ {(amount / installments).toFixed(2)}
              </p>
            )}
          </div>

          {paymentMethod === 'pix' ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-center mb-4">
                  <QrCode size={200} />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={mockPixCode}
                    readOnly
                    className="input flex-1 bg-white"
                  />
                  <Button
                    variant="secondary"
                    icon={copied ? Check : Copy}
                    onClick={handleCopyPixCode}
                  >
                    {copied ? 'Copiado!' : 'Copiar'}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Escaneie o QR Code ou copie o código PIX para pagar
              </p>
            </div>
          ) : paymentMethod === 'credit' || paymentMethod === 'debit' ? (
            <div className="space-y-4">
              <div className="space-y-4">
                <Input
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  icon={CreditCard}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Validade"
                    placeholder="MM/AA"
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    type="password"
                    maxLength={3}
                  />
                </div>
                <Input
                  label="Nome no Cartão"
                  placeholder="Como está impresso no cartão"
                />
              </div>
              <Button
                className="w-full mt-6"
                onClick={handlePaymentProcessing}
              >
                Pagar R$ {amount},00
              </Button>
            </div>
          ) : (
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                Por favor, dirija-se à recepção para efetuar o pagamento em dinheiro.
              </p>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

interface InputProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  [key: string]: any;
}

function Input({ label, icon: Icon, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`input ${Icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
}