'use client';
import React from 'react';
import AuthProvider from './authProvider';
import ReactQueryProvider from './queryProvider';
function Provider({ children }: any) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}

export default Provider;
