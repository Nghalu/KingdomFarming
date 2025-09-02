import React, { useState } from 'react';
import { X, MapPin, Star, ShoppingCart, Phone, MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { ProductImageGallery } from './ProductImageGallery';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { user } = useAuth();
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (user && user.role === 'consumer') {
      addToCart(product, quantity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interactive Product Images */}
            <ProductImageGallery product={product} />

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">M{product.price}</span>
                    <span className="text-gray-600">per {product.unit}</span>
                  </div>
                  <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? `${product.quantity} available` : 'Out of stock'}
                  </div>
                </div>

                {user?.role === 'consumer' && product.inStock && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart (M{product.price * quantity})</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Farm Information */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Farm Information</h4>
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-800">{product.farm.name}</h5>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.farm.location}, {product.farm.district}
                  </div>
                  
                  {/* Google Maps Link */}
                  {product.farm.coordinates && (
                    <div className="mt-2">
                      <a
                        href={`https://www.google.com/maps?q=${product.farm.coordinates.lat},${product.farm.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        View on Google Maps
                      </a>
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm">{product.farm.description}</p>
                  
                  {/* Farming Practices */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.farm.practices.map((practice) => (
                      <span
                        key={practice}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {practice}
                      </span>
                    ))}
                  </div>

                  {/* Contact Options */}
                  <div className="flex space-x-2 mt-4">
                    <a
                      href={`tel:${product.farm.contactDetails.phone}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </a>
                    {product.farm.contactDetails.whatsapp && (
                      <a
                        href={`https://wa.me/${product.farm.contactDetails.whatsapp.replace('+', '')}?text=Hello%20${encodeURIComponent(product.farm.name)}!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviews Preview */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Reviews</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.0 • 12 reviews)</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Great quality produce, very fresh and delivered on time!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}