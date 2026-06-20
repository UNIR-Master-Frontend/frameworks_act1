// src/app/providers.jsx
'use client';
import { UserProvider } from '@/context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';

export function Providers({ children }) {
  return (
    <UserProvider>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </UserProvider>
  );
}
