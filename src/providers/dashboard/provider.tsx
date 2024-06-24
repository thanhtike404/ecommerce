'use client';
import React from 'react';
import { StoreProvider } from './StoreProvider';

function Provider({ children }: any) {
  return <StoreProvider>{children}</StoreProvider>;
}

export default Provider;
