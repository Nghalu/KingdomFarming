import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, TrendingUp, Award, Truck } from 'lucide-react';
import { ProductCard } from '../Products/ProductCard';
import { ProductFilters } from '../Products/ProductFilters';
import { ProductModal } from '../Products/ProductModal';
import { useApp } from '../../contexts/AppContext';
import { Product } from '../../types';

export function Marketplace() {
  const { products, searchTerm, selectedCategory, selectedDistrict, organicOnly } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesDistrict = !selectedDistrict || product.farm.district === selectedDistrict;
      const matchesOrganic = !organicOnly || product.organic;

      return matchesSearch && matchesCategory && matchesDistrict && matchesOrganic;
    });
  }, [products, searchTerm, selectedCategory, selectedDistrict, organicOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Fresh Farm Produce</h1>
            <p className="text-xl text-green-100 mb-6">
              Connect directly with local farmers across Lesotho
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <nav className="text-sm text-gray-500 mb-2">
              <span>Home</span> <span className="mx-2">›</span> <span className="text-gray-900 font-medium">Marketplace</span>
            </nav>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProducts.length} Products Available
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-500'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-500'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 max-h-screen overflow-y-auto custom-scrollbar pr-2 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={setSelectedProduct}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}