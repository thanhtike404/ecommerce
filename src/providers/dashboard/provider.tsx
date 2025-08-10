'use client';
import React from 'react';
import { StoreProvider } from './StoreProvider';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast';
import {SessionProvider} from "next-auth/react";

function Provider({ children }: any) {
  return (
      <SessionProvider>
    <StoreProvider>
      <ToastProvider>
        <Toaster />
        {children}
      </ToastProvider>
    </StoreProvider>
      </SessionProvider>
  );
}

export default Provider;
