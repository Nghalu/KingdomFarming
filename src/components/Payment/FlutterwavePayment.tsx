import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { CreditCard, Smartphone } from 'lucide-react';

interface FlutterwavePaymentProps {
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  orderId: string;
  onSuccess: (response: any) => void;
  onClose: () => void;
  paymentMethod: 'card' | 'mobilemoney';
}

export function FlutterwavePayment({
  amount,
  customerEmail,
  customerPhone,
  customerName,
  orderId,
  onSuccess,
  onClose,
  paymentMethod
}: FlutterwavePaymentProps) {
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || '2f1896ce-0cf2-483d-ac96-546ded674382',
    tx_ref: `KF-${orderId}-${Date.now()}`,
    amount: amount,
    currency: 'LSL', // Lesotho Loti
    payment_options: paymentMethod === 'card' ? 'card' : 'mobilemoneylesotho',
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: 'KingdomFarming Payment',
      description: 'Payment for fresh farm produce',
      logo: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    meta: {
      order_id: orderId,
      platform: 'kingdomfarming',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const initiatePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log('Flutterwave response:', response);
        if (response.status === 'successful') {
          onSuccess(response);
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log('Payment modal closed');
        onClose();
      },
    });
  };

  return (
    <button
      onClick={initiatePayment}
      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
    >
      {paymentMethod === 'card' ? (
        <CreditCard className="h-5 w-5" />
      ) : (
        <Smartphone className="h-5 w-5" />
      )}
      <span>
        Pay M{amount} with {paymentMethod === 'card' ? 'Card' : 'Mobile Money'}
      </span>
    </button>
  );
}