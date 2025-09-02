import React from 'react';
import { Leaf, Users, ShoppingCart, TrendingUp, Heart, Award, Globe, Truck } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About KingdomFarming</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're connecting local farmers in Lesotho with consumers, schools, and restaurants 
            to create a sustainable food ecosystem that benefits everyone in our community.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                KingdomFarming Lesotho was created to bridge the gap between local farmers and consumers, 
                ensuring fresh, quality produce reaches every table while supporting sustainable farming practices.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe in fair trade, where farmers receive 90% of every sale, and consumers get 
                access to the freshest produce directly from the source.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">90%</div>
                  <div className="text-sm text-gray-600">Goes to Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">10%</div>
                  <div className="text-sm text-gray-600">Platform Fee</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Supporting Local Communities</h3>
              <p className="text-gray-600">
                Every purchase on KingdomFarming directly supports local farmers and their families, 
                contributing to the economic growth of communities across Lesotho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'Promoting eco-friendly farming practices that protect our environment for future generations.',
                color: 'green'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building strong connections between farmers and consumers to strengthen local communities.',
                color: 'blue'
              },
              {
                icon: Award,
                title: 'Quality',
                description: 'Ensuring only the highest quality, fresh produce reaches our customers.',
                color: 'yellow'
              },
              {
                icon: TrendingUp,
                title: 'Growth',
                description: 'Supporting the economic growth of farmers and the agricultural sector in Lesotho.',
                color: 'purple'
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
                <div className={`bg-${value.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How KingdomFarming Works</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and fair for everyone</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: Users,
                title: 'Farmers List Products',
                description: 'Local farmers create profiles and list their fresh produce with photos, prices, and availability.'
              },
              {
                step: '2',
                icon: ShoppingCart,
                title: 'Customers Order',
                description: 'Consumers browse, select products, and place orders with flexible pickup or delivery options.'
              },
              {
                step: '3',
                icon: Truck,
                title: 'Fresh Delivery',
                description: 'Products are delivered fresh or available for pickup, with farmers receiving 90% of the sale price.'
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">0+</div>
              <div className="text-green-100">Farmers Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0+</div>
              <div className="text-green-100">Orders Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">M0+</div>
              <div className="text-green-100">Paid to Farmers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment</h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <Globe className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 leading-relaxed">
              KingdomFarming is more than just a marketplace – we're a movement towards sustainable agriculture, 
              food security, and economic empowerment in Lesotho. We're committed to transparency, fair pricing, 
              and building lasting relationships between farmers and consumers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}