import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Layout/Header';
import { LoginModal } from './components/Auth/LoginModal';
import { HomePage } from './components/Home/HomePage';
import { Marketplace } from './components/Marketplace/Marketplace';
import { FarmerDashboard } from './components/Farmer/FarmerDashboard';
import { AdminPanel } from './components/Admin/AdminPanel';
import { CartModal } from './components/Cart/CartModal';
import { FarmersPage } from './components/Farmers/FarmersPage';
import { AboutPage } from './components/About/AboutPage';
import { ContactPage } from './components/Contact/ContactPage';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!user && currentPage !== 'home' && currentPage !== 'about' && currentPage !== 'contact') {
      setShowLogin(true);
      setCurrentPage('home');
      return <HomePage onNavigate={handleNavigate} onLoginClick={() => setShowLogin(true)} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onLoginClick={() => setShowLogin(true)} />;
      case 'marketplace':
        return <Marketplace />;
      case 'farmers':
        return <FarmersPage />;
      case 'dashboard':
        return user?.role === 'farmer' ? <FarmerDashboard /> : <Marketplace />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : <Marketplace />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onLoginClick={() => setShowLogin(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLoginClick={() => setShowLogin(true)} 
        onCartClick={() => setShowCart(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      
      {renderPage()}
      
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {user?.role === 'consumer' && (
        <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;