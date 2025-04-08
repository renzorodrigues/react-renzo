'use client';

import { Box } from '@chakra-ui/react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minH="100vh" bg="gray.50">
      {children}
    </Box>
  );
} 