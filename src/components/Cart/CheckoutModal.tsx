import React, { useState } from 'react';
import { X, ArrowLeft, CreditCard, Smartphone, Truck, MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { FlutterwavePayment } from '../Payment/FlutterwavePayment';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const paymentMethods = [
  { id: 'mobilemoney', label: 'Mobile Money', icon: Smartphone, description: 'Pay with EcoCash, M-Pesa, or other mobile money' },
  { id: 'card', label: 'Card Payment', icon: CreditCard, description: 'Pay with Visa, Mastercard, or other cards' }
];

const deliveryOptions = [
  { 
    id: 'pickup-farm', 
    label: 'Pickup at Farm', 
    description: 'Collect directly from the farm', 
    price: 0,
    icon: MapPin
  },
  { 
    id: 'pickup-point', 
    label: 'Pickup Point', 
    description: 'Collect at designated pickup points in your district', 
    price: 35,
    icon: MapPin
  },
  { 
    id: 'delivery', 
    label: 'Home Delivery', 
    description: 'Delivered to your address (within 20km)', 
    price: 50,
    icon: Truck
  }
];

export function CheckoutModal({ isOpen, onClose, onBack }: CheckoutModalProps) {
  const { cart, clearCart, calculateOrderTotals } = useApp();
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState('mobilemoney');
  const [selectedDelivery, setSelectedDelivery] = useState('pickup-farm');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showFlutterwavePayment, setShowFlutterwavePayment] = useState(false);

  if (!isOpen) return null;

  const { subtotal, commission, total } = calculateOrderTotals(cart);
  const deliveryFee = deliveryOptions.find(opt => opt.id === selectedDelivery)?.price || 0;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = () => {
    // Validate required fields
    if (selectedDelivery === 'delivery' && !deliveryAddress) {
      alert('Please enter your delivery address');
      return;
    }
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }

    // Show Flutterwave payment modal
    setShowFlutterwavePayment(true);
  };

  const handlePaymentSuccess = (response: any) => {
    setIsProcessing(true);
    setShowFlutterwavePayment(false);

    console.log('Payment successful:', response);

    // Process the order after successful payment
    setTimeout(() => {
      setOrderPlaced(true);
      setIsProcessing(false);

      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
        onClose();
        setOrderPlaced(false);
      }, 3000);
    }, 1000);
  };

  const handlePaymentClose = () => {
    setShowFlutterwavePayment(false);
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed and order confirmed. You will receive a WhatsApp message with order details and pickup/delivery information.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Order Total:</strong> M{finalTotal}<br/>
              <strong>Farmer Earnings:</strong> M{subtotal - commission}<br/>
              <strong>Platform Fee:</strong> M{commission}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            This window will close automatically...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
              <p className="text-sm text-gray-600">Complete your order</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Order Summary
            </h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium">M{item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">M{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee (10%)</span>
                  <span className="font-medium text-blue-600">M{commission}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">M{deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-green-600">M{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Commission Breakdown */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">How Your Payment is Distributed</p>
                <div className="text-sm text-blue-700 mt-1 space-y-1">
                  <p>• Farmers receive: M{subtotal - commission} (90%)</p>
                  <p>• Platform fee: M{commission} (10%)</p>
                  <p>• Delivery fee: M{deliveryFee}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Delivery Option
            </h3>
            <div className="space-y-3">
              {deliveryOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <label key={option.id} className={`flex items-start space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedDelivery === option.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedDelivery === option.id}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="mt-1 text-green-600 focus:ring-green-500"
                    />
                    <IconComponent className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{option.label}</span>
                        <span className="text-green-600 font-bold">
                          {option.price === 0 ? 'Free' : `M${option.price}`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {selectedDelivery === 'delivery' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full address including landmarks..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <label key={method.id} className={`flex items-start space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === method.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="mt-1 text-green-600 focus:ring-green-500"
                    />
                    <IconComponent className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">{method.label}</span>
                      <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {(selectedPayment === 'mobilemoney' || selectedPayment === 'card') && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+266 58 123 456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            )}
          </div>

          {/* Payment Section */}
          {showFlutterwavePayment ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800 font-medium">
                  Complete your payment of M{finalTotal} using Flutterwave secure payment gateway
                </p>
              </div>
              <FlutterwavePayment
                amount={finalTotal}
                customerEmail={user?.email || ''}
                customerPhone={phoneNumber}
                customerName={user?.name || ''}
                orderId={`ORDER-${Date.now()}`}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                paymentMethod={selectedPayment as 'card' | 'mobilemoney'}
              />
              <button
                onClick={() => setShowFlutterwavePayment(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors hover:bg-gray-50"
              >
                Cancel Payment
              </button>
            </div>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || (selectedDelivery === 'delivery' && !deliveryAddress) || !phoneNumber}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl transition-colors font-bold text-lg flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Proceed to Payment - M{finalTotal}</span>
              )}
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}