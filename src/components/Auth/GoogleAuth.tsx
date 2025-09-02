import React from 'react';

// Extend the Window interface to include Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

export interface GoogleAuthProps {
  onSuccess: (response: any) => void;
  onError?: (error: any) => void;
}

export function GoogleAuth({ onSuccess, onError }: GoogleAuthProps) {
  React.useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
          callback: onSuccess,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Identity Services');
      onError?.('Failed to load Google authentication');
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [onSuccess, onError]);

  return null; // This component doesn't render anything visible
}