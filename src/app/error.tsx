'use client';

import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/useI18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} align="center" textAlign="center">
        <Heading as="h1" size="2xl">Oops!</Heading>
        <Heading as="h2" size="xl">{t('error.title')}</Heading>
        <Text fontSize="lg">
          {t('error.message')}
        </Text>
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={() => reset()}
          mr={4}
        >
          {t('error.tryAgain')}
        </Button>
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={() => router.push('/dashboard')}
        >
          {t('error.backToDashboard')}
        </Button>
      </VStack>
    </Container>
  );
} 