import React, { useState } from 'react';
import { X, MapPin, Phone, Mail } from 'lucide-react';

interface FarmProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const districts = [
  'Maseru', 'Leribe', 'Berea', 'Mafeteng', 'Mohales Hoek', 
  'Quthing', 'Qacha\'s Nek', 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'
];

const practices = [
  'Organic', 'Sustainable', 'Free-range', 'Permaculture', 
  'Crop rotation', 'Integrated pest management', 'Water conservation'
];

export function FarmProfileModal({ isOpen, onClose }: FarmProfileModalProps) {
  const [formData, setFormData] = useState({
    farmName: 'Green Valley Farm',
    location: 'Maseru Rural',
    district: 'Maseru',
    phone: '+26658653136',
    email: 'greenvalley@example.com',
    whatsapp: '+26658653136',
    description: 'Organic farming with sustainable practices for over 15 years.',
    selectedPractices: ['Organic', 'Sustainable', 'Free-range'],
    coordinates: { lat: -29.3167, lng: 27.4833 } // Maseru coordinates
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle farm profile update
    console.log('Updating farm profile:', formData);
    onClose();
  };

  const togglePractice = (practice: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPractices: prev.selectedPractices.includes(practice)
        ? prev.selectedPractices.filter(p => p !== practice)
        : [...prev.selectedPractices, practice]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Farm Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Name
              </label>
              <input
                type="text"
                required
                value={formData.farmName}
                onChange={(e) => setFormData(prev => ({ ...prev, farmName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Specific location within district"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              placeholder="Describe your farming practices and specialties..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Same as phone or different"
              />
            </div>
          </div>

          {/* Location Coordinates for Google Maps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farm Location (for Google Maps)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev.coordinates, lat: parseFloat(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Latitude"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev.coordinates, lng: parseFloat(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Longitude"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Get coordinates from Google Maps by right-clicking on your farm location
            </p>
          </div>

          {/* Farming Practices */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farming Practices
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {practices.map((practice) => (
                <label key={practice} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.selectedPractices.includes(practice)}
                    onChange={() => togglePractice(practice)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{practice}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}