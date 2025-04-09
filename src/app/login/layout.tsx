'use client';

import { Box } from '@chakra-ui/react';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minH="100vh" bg="gray.50">
      <LanguageSwitcher />
      {children}
    </Box>
  );
} 