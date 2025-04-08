import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth/AuthContext';
import Navbar from '@/components/layout/Navbar';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
} 