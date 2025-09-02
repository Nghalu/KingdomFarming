import React from 'react';
import { ArrowRight, Leaf, Users, ShoppingCart, TrendingUp, Star, MapPin, Phone } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onLoginClick: () => void;
}

export function HomePage({ onNavigate, onLoginClick }: HomePageProps) {
  const { products, farms, analytics } = useApp();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const topFarms = farms.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-bold inline-flex items-center space-x-2">
              <Leaf className="h-4 w-4" />
              <span>Farm to Table Marketplace</span>
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Buy Fresh,
            <span className="block text-green-600 mt-2">Buy Local</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Connect directly with verified local farmers across Lesotho for the freshest produce. 
            Support sustainable farming while getting premium quality food delivered to your door.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate('marketplace')}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={onLoginClick}
              className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-2xl text-lg font-bold border-2 border-gray-200 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Join as Farmer</span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.totalFarmers}+</div>
              <div className="text-sm text-gray-600 font-medium">Verified Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{products.length}+</div>
              <div className="text-sm text-gray-600 font-medium">Fresh Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">10</div>
              <div className="text-sm text-gray-600 font-medium">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24h</div>
              <div className="text-sm text-gray-600 font-medium">Fresh Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose KingdomFarming?</h2>
            <p className="text-xl text-gray-600">Supporting local farmers and providing fresh produce to communities across Lesotho</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Fresh & Organic',
                description: 'Direct from farm to your table with organic options available',
                color: 'green'
              },
              {
                icon: Users,
                title: 'Support Local',
                description: 'Help Lesotho farmers grow their business and support communities',
                color: 'blue'
              },
              {
                icon: ShoppingCart,
                title: 'Easy Ordering',
                description: 'Simple cart system with flexible pickup and delivery options',
                color: 'purple'
              },
              {
                icon: TrendingUp,
                title: 'Fair Prices',
                description: 'Competitive pricing that benefits both farmers and consumers',
                color: 'orange'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Fresh produce from verified local farmers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-96 overflow-y-auto custom-scrollbar pr-2">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.organic && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Leaf className="h-3 w-3" />
                      <span>ORGANIC</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{product.farm.name}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.totalReviews})</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-green-600">M{product.price}</span>
                    <span className="text-sm text-gray-500 font-medium">/{product.unit}</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('marketplace')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-medium transition-colors"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('marketplace')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Top Farmers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Top Farmers</h2>
            <p className="text-xl text-gray-600">Verified local farmers committed to quality and sustainability</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-h-96 overflow-y-auto custom-scrollbar pr-2">
            {topFarms.map((farm) => (
              <div key={farm.id} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{farm.name}</h3>
                <div className="flex items-center justify-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{farm.district}</span>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(farm.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({farm.totalReviews})</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{farm.description}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {farm.practices.slice(0, 2).map((practice) => (
                    <span
                      key={practice}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate('farmers')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  View Farm
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('farmers')}
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-gray-200 transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
            >
              <span>View All Farmers</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-10">
            Join satisfied customers and farmers on KingdomFarming Lesotho
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('marketplace')}
              className="bg-white hover:bg-gray-100 text-green-600 px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Shop Now</span>
            </button>
            <button
              onClick={onLoginClick}
              className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl text-lg font-bold border-2 border-green-500 transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Become a Farmer</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}