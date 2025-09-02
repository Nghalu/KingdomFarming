import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CheckoutModal } from './CheckoutModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateCartQuantity, clearCart, calculateOrderTotals } = useApp();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const { subtotal, commission, total } = calculateOrderTotals(cart);

  if (showCheckout) {
    return (
      <CheckoutModal
        isOpen={true}
        onClose={() => {
          setShowCheckout(false);
          onClose();
        }}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              <p className="text-sm text-gray-600">{cart.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Cart Items Section */}
          <div className="flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Items in Cart</h3>
            </div>
            <div className="flex-1 overflow-y-auto cart-scrollbar p-6" style={{ maxHeight: '400px' }}>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some fresh products to get started</p>
              <button
                onClick={onClose}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{item.product.farm.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-green-600">
                        M{item.product.price}
                      </span>
                      <span className="text-sm text-gray-500">/ {item.product.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="bg-white hover:bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center border border-gray-300 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="bg-white hover:bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center border border-gray-300 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900">M{item.product.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-700 mt-1 p-1 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
            </div>
          </div>

          {/* Checkout Summary Section */}
          <div className="flex flex-col border-l border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Order Summary</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6" style={{ maxHeight: '400px' }}>
              {cart.length > 0 && (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.product.name} x{item.quantity}
                          </span>
                          <span className="font-medium">M{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Commission Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Commission Information</p>
                        <p className="text-sm text-blue-700">
                          A 10% platform fee (M{commission}) supports local farmers and maintains the marketplace.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">M{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Platform Fee (10%)</span>
                        <span className="font-medium text-blue-600">M{commission}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-bold text-gray-900">Total</span>
                          <span className="text-lg font-bold text-green-600">M{total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors font-medium"
                    >
                      Proceed to Checkout
                    </button>
                    
                    <button
                      onClick={clearCart}
                      className="w-full text-red-600 hover:text-red-700 py-2 px-4 rounded-xl transition-colors font-medium border border-red-200 hover:bg-red-50"
                    >
                      Clear Cart
                    </button>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Delivery Options</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <p>• Farm Pickup: Free</p>
                      <p>• Pickup Point: M10</p>
                      <p>• Home Delivery: M25</p>
                    </div>
                  </div>

                  {/* Farmer Support Info */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Supporting Local Farmers</h4>
                    <p className="text-sm text-yellow-700">
                      90% of your payment goes directly to farmers, helping support local agriculture in Lesotho.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-center text-sm text-gray-500">
            Secure checkout • 90% goes to farmers • 10% platform fee
          </p>
        </div>
      </div>
    </div>
  );
}