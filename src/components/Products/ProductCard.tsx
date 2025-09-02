import React, { useState } from 'react';
import { ShoppingCart, MapPin, Star, Leaf, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user && user.role === 'consumer') {
      addToCart(product, 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group relative"
    >
      {/* Wishlist Button */}
      <button 
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
      >
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="relative h-56 bg-gray-200 overflow-hidden group">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.organic && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Leaf className="h-3 w-3" />
            <span>ORGANIC</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Image Navigation for Multiple Images */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Image Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Eye className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

        {/* Farm Info */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <MapPin className="h-3 w-3 mr-1 text-green-500" />
          <span className="font-medium">{product.farm.name}</span>
          <span className="mx-1">•</span>
          <span>{product.farm.district}</span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-green-600">M{product.price}</span>
            <span className="text-sm text-gray-500 ml-1 font-medium">/{product.unit}</span>
          </div>

          {user?.role === 'consumer' && product.inStock && (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-2 font-medium">(0)</span>
          </div>
          <span className="text-xs text-green-600 font-semibold capitalize bg-green-50 px-2 py-1 rounded-full">
            {product.category.replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
}