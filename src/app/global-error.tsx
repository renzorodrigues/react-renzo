'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={20}>
        <VStack spacing={8} align="center" textAlign="center">
          <Heading as="h1" size="2xl">Oops!</Heading>
          <Heading as="h2" size="xl">Algo deu errado</Heading>
          <Text fontSize="lg">
            Desculpe, ocorreu um erro ao processar sua solicitação.
          </Text>
          <Button 
            colorScheme="blue" 
            size="lg" 
            onClick={() => reset()}
            mr={4}
          >
            Tentar novamente
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => router.push('/dashboard')}
          >
            Voltar para o Dashboard
          </Button>
        </VStack>
      </Container>
    </ChakraProvider>
  );
} 