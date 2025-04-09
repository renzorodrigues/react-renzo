'use client';

import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/useI18n';

export default function NotFound() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} align="center" textAlign="center">
        <Heading as="h1" size="2xl">404</Heading>
        <Heading as="h2" size="xl">Página não encontrada</Heading>
        <Text fontSize="lg">
          A página que você está procurando não existe ou foi movida.
        </Text>
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={() => router.push('/dashboard')}
        >
          Voltar para o Dashboard
        </Button>
      </VStack>
    </Container>
  );
} 