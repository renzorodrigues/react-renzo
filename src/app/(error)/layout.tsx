'use client';

import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nProvider } from '@/lib/i18n/provider';

export default function ErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider>
      <I18nProvider>
        <Box minH="100vh" bg="gray.50">
          {children}
        </Box>
      </I18nProvider>
    </ChakraProvider>
  );
} 