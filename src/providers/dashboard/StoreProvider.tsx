// src/providers/provider.tsx
import React, { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: ProviderProps) => {
  return <>{children}</>;
};
