import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Leaf, Search, Bell, Home, Users, Store, Info, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  onLoginClick: () => void;
  onCartClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ onLoginClick, onCartClick, currentPage, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const { cart, searchTerm, setSearchTerm } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'farmers', label: 'Farmers', icon: Users },
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src="/pull the picture.png" 
                alt="KingdomFarming Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-600">KingdomFarming</h1>
              <p className="text-xs text-gray-500 -mt-1">Lesotho</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors font-medium ${
                    currentPage === item.id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {user?.role === 'farmer' && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors font-medium ${
                  currentPage === 'dashboard'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Store className="h-4 w-4" />
                <span>My Farm</span>
              </button>
            )}
            {user?.role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors font-medium ${
                  currentPage === 'admin'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Search Bar - Desktop */}
          {user && (currentPage === 'marketplace' || currentPage === 'farmers') && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={currentPage === 'farmers' ? 'Search farmers...' : 'Search products...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <button className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </button>
                {user.role === 'consumer' && (
                  <button
                    onClick={onCartClick}
                    className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                )}
              </div>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
               className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-6 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <User className="h-4 w-4" />
                <span>Signup/Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-gray-50">
            {/* Mobile Search */}
            {user && (currentPage === 'marketplace' || currentPage === 'farmers') && (
              <div className="px-4 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder={currentPage === 'farmers' ? 'Search farmers...' : 'Search products...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 font-medium ${
                      currentPage === item.id
                        ? 'text-green-600 bg-green-100'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {user?.role === 'farmer' && (
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 font-medium ${
                    currentPage === 'dashboard'
                      ? 'text-green-600 bg-green-100'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  <Store className="h-4 w-4" />
                  <span>My Farm</span>
                </button>
              )}
              {user?.role === 'admin' && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 font-medium ${
                    currentPage === 'admin'
                      ? 'text-green-600 bg-green-100'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Admin</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}