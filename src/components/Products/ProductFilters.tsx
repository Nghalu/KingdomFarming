import React from 'react';
import { Filter, Search, X, Sliders } from 'lucide-react';
import { ProductCategory } from '../../types';
import { useApp } from '../../contexts/AppContext';

const categories: { value: ProductCategory | ''; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'poultry', label: 'Poultry' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'seedlings', label: 'Seedlings' },
  { value: 'fertilizers', label: 'Fertilizers' },
  { value: 'grains', label: 'Grains' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'livestock', label: 'Livestock' },
  { value: 'meats', label: 'Meats' },
];

const districts = [
  '', 'Maseru', 'Leribe', 'Berea', 'Mafeteng', 'Mohales Hoek', 
  'Quthing', 'Qacha\'s Nek', 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'
];

export function ProductFilters() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDistrict,
    setSelectedDistrict,
    organicOnly,
    setOrganicOnly
  } = useApp();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-900">
          <Sliders className="h-5 w-5 text-green-600" />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600 text-sm">
          Clear all
        </button>
      </div>

      {/* Quick Filters */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Fresh Today
          </button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
            Organic Only
          </button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
            Delivery or Pickup
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Category
        </label>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={selectedCategory === category.value}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* District Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          District
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Districts</option>
          {districts.slice(1).map(district => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Price Range (M)
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="float"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="float"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Organic Filter */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={organicOnly}
            onChange={(e) => setOrganicOnly(e.target.checked)}
            className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-900">Organic products only</span>
        </label>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
        Apply Filters
      </button>
    </div>
  );
}