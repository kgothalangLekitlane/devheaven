"use client";
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    // Check network connectivity
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Check backend connectivity
    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 3000);
        
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts`, {
          method: 'HEAD',
          signal: controller.signal
        });
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('disconnected');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (!isOnline) {
    return (
      <Badge variant="destructive" className="text-xs">
        Offline
      </Badge>
    );
  }

  if (backendStatus === 'disconnected') {
    return (
      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
        Demo Mode
      </Badge>
    );
  }

  if (backendStatus === 'connected') {
    return (
      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
        Online
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-xs">
      Checking...
    </Badge>
  );
}
