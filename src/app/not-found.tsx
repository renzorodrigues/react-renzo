import { ChakraProvider } from '@chakra-ui/react';
import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <ChakraProvider>
      <Container maxW="container.md" py={20}>
        <VStack spacing={8} align="center" textAlign="center">
          <Heading as="h1" size="2xl">404</Heading>
          <Heading as="h2" size="xl">Página não encontrada</Heading>
          <Text fontSize="lg">
            A página que você está procurando não existe ou foi movida.
          </Text>
          <Link href="/dashboard" passHref>
            <Button 
              as="a"
              colorScheme="blue" 
              size="lg"
            >
              Voltar para o Dashboard
            </Button>
          </Link>
        </VStack>
      </Container>
    </ChakraProvider>
  );
} 