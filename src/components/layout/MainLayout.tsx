'use client';

import { Box, Container } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n/useI18n';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, loading } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  console.log('MainLayout - Auth state:', { user, loading });

  useEffect(() => {
    // Se não estiver carregando e não houver usuário, redireciona para login
    // Exceto se já estiver na página de login
    if (!loading && !user && pathname !== '/login') {
      console.log('MainLayout - No user found, redirecting to login');
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  // Se ainda estiver carregando, podemos mostrar um loading state
  if (loading) {
    return (
      <Box minH="100vh">
        <Navbar />
        <Container maxW="container.xl" py={8}>
          <Box textAlign="center">{t('app.loading')}</Box>
        </Container>
      </Box>
    );
  }

  // Se não houver usuário e não estiver na página de login, não renderiza nada
  // O useEffect acima já cuidará do redirecionamento
  if (!user && pathname !== '/login') {
    return null;
  }

  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
} 