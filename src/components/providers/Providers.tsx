'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth/AuthContext';
import theme from '@/lib/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  );
} 