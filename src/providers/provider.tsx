'use client';
import React from 'react';
import AuthProvider from './authProvider';
import ReactQueryProvider from './queryProvider';
import { StoreProvider } from './dashboard/StoreProvider';
function Provider({ children }: any) {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </StoreProvider>
  );
}

export default Provider;
