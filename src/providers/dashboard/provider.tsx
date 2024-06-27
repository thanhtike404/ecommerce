'use client';
import React from 'react';
import { StoreProvider } from './StoreProvider';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast';
function Provider({ children }: any) {
  return (
    <StoreProvider>
      <ToastProvider>
        <Toaster />
        {children}
      </ToastProvider>
    </StoreProvider>
  );
}

export default Provider;
