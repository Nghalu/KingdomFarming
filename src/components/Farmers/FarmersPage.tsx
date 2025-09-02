import React, { useMemo } from 'react';
import { MapPin, Star, Phone, MessageCircle, Leaf, Award, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function FarmersPage() {
  const { farms, searchTerm, selectedDistrict } = useApp();

  const filteredFarms = useMemo(() => {
    return farms.filter(farm => {
      const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          farm.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistrict = !selectedDistrict || farm.district === selectedDistrict;
      return matchesSearch && matchesDistrict && farm.verified;
    });
  }, [farms, searchTerm, selectedDistrict]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Meet Our Farmers</h1>
            <p className="text-xl text-green-100 mb-6">
              Verified local farmers committed to quality and sustainability
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Verified Farms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-5 w-5" />
                <span>Sustainable Practices</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Community Focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredFarms.length} Verified Farmers
          </h2>
          <p className="text-gray-600 mt-1">
            Connect directly with local farmers across Lesotho
          </p>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-screen overflow-y-auto custom-scrollbar pr-2">
          {filteredFarms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Farm Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600">
                {farm.images.length > 0 ? (
                  <img
                    src={farm.images[0]}
                    alt={farm.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="h-16 w-16 text-white opacity-50" />
                  </div>
                )}
                {farm.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Award className="h-3 w-3" />
                    <span>VERIFIED</span>
                  </div>
                )}
              </div>

              {/* Farm Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{farm.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">{farm.location}, {farm.district}</span>
                </div>

                {/* Google Maps Link */}
                {farm.coordinates && (
                  <div className="mb-3">
                    <a
                      href={`https://www.google.com/maps?q=${farm.coordinates.lat},${farm.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      View Location on Maps
                    </a>
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(farm.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {farm.rating.toFixed(1)} ({farm.totalReviews} reviews)
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {farm.description}
                </p>

                {/* Farming Practices */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {farm.practices.slice(0, 3).map((practice) => (
                    <span
                      key={practice}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {practice}
                    </span>
                  ))}
                  {farm.practices.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{farm.practices.length - 3} more
                    </span>
                  )}
                </div>

                {/* Contact Actions */}
                <div className="flex space-x-2">
                  <a
                    href={`tel:${farm.contactDetails.phone}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </a>
                  {farm.contactDetails.whatsapp && (
                    <a
                      href={`https://wa.me/${farm.contactDetails.whatsapp.replace('+', '')}?text=Hello%20${encodeURIComponent(farm.name)}!%20I'm%20interested%20in%20your%20products`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFarms.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No farmers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}