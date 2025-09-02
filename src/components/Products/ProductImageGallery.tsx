import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Leaf, X } from 'lucide-react';
import { Product } from '../../types';

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative h-64 lg:h-80 bg-gray-100 rounded-lg overflow-hidden group">
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-pointer ${
              isZoomed ? 'scale-150' : 'hover:scale-105'
            }`}
            onClick={() => setShowFullscreen(true)}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          />
          
          {/* Organic Badge */}
          {product.organic && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
              <Leaf className="h-3 w-3" />
              <span>ORGANIC</span>
            </div>
          )}

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <ZoomIn className="h-4 w-4" />
          </div>

          {/* Navigation Arrows (only show if multiple images) */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {product.images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {product.images.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 horizontal-scroll">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-green-500 ring-2 ring-green-200'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Indicators (dots) */}
        {product.images.length > 1 && (
          <div className="flex justify-center space-x-2 mt-3">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-green-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Fullscreen`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Fullscreen Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Fullscreen Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                  {currentImageIndex + 1} of {product.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}