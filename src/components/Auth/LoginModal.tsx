import React, { useState } from 'react';
import { X, Eye, EyeOff, Leaf, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleAuth } from './GoogleAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const districts = [
  'Maseru', 'Leribe', 'Berea', 'Mafeteng', 'Mohales Hoek', 
  'Quthing', 'Qacha\'s Nek', 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'
];

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'consumer' as 'farmer' | 'consumer',
    district: ''
  });

  if (!isOpen) return null;

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Mock forgot password functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      setForgotPasswordSent(true);
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordSent(false);
        setForgotPasswordEmail('');
      }, 3000);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // Initialize Google OAuth
      if (typeof window !== 'undefined' && window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
          callback: async (response: any) => {
            try {
              // Decode the JWT token to get user info
              const payload = JSON.parse(atob(response.credential.split('.')[1]));
              
              // Create user object from Google response
              const googleUser = {
                name: payload.name,
                email: payload.email,
                password: '', // Google users don't need password
                phone: '', // Will be requested later if needed
                role: 'consumer' as const,
                district: ''
              };
              
              await register(googleUser);
              onClose();
            } catch (error) {
              console.error('Google login error:', error);
            } finally {
              setIsGoogleLoading(false);
            }
          }
        });
        
        window.google.accounts.id.prompt();
      } else {
        // Fallback: Load Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
            callback: async (response: any) => {
              try {
                const payload = JSON.parse(atob(response.credential.split('.')[1]));
                const googleUser = {
                  name: payload.name,
                  email: payload.email,
                  password: '',
                  phone: '',
                  role: 'consumer' as const,
                  district: ''
                };
                
                await register(googleUser);
                onClose();
              } catch (error) {
                console.error('Google login error:', error);
              } finally {
                setIsGoogleLoading(false);
              }
            }
          });
          
          window.google.accounts.id.prompt();
        };
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Google login initialization error:', error);
      setIsGoogleLoading(false);
    }
  };

  // Forgot Password Modal Content
  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            {forgotPasswordSent ? (
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-gray-600">
                  We've sent password reset instructions to {forgotPasswordEmail}
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email or Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address or Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                  placeholder="Enter Email Address OR Phone Number"
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    <span className="sr-only">{showPassword ? 'Hide' : 'Show'} password</span>
                  </button>
                  {!showPassword && (
                    <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      Show
                    </span>
                  )}
                </div>
              </div>

              {/* Additional fields for signup */}
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
                      placeholder="+266 5812 3456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      I want to:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.role === 'consumer' 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}>
                        <input
                          type="radio"
                          value="consumer"
                          checked={formData.role === 'consumer'}
                          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'consumer' }))}
                          className="sr-only"
                        />
                        <span className="font-medium text-sm">Buy Products</span>
                      </label>
                      <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.role === 'farmer' 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}>
                        <input
                          type="radio"
                          value="farmer"
                          checked={formData.role === 'farmer'}
                          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'farmer' }))}
                          className="sr-only"
                        />
                        <span className="font-medium text-sm">Sell Products</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      District
                    </label>
                    <select
                      required
                      value={formData.district}
                      onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    >
                      <option value="">Select your district</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Login' : 'Create Account'}</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login - Only for Login */}
            {isLogin && (
              <div className="space-y-3 sm:space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm sm:text-base"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  <span className="truncate">
                    {isGoogleLoading ? 'Connecting...' : 'Login with Google'}
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm sm:text-base"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="truncate">Login with Apple</span>
                </button>
              </div>
            )}

            {/* Switch between Login/Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Farmer Account Notice */}
            {!isLogin && formData.role === 'farmer' && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>Note:</strong> Farmer accounts require admin approval before you can start listing products. 
                  You'll receive a notification once your account is verified.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}