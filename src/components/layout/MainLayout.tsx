'use client';

import { Box, Container } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n/useI18n';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, loading } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <Box minH="100vh">
        <Navbar />
        <Sidebar />
        <LanguageSwitcher />
        <Container maxW="container.xl" py={8} ml="240px" transition="margin-left 0.3s ease">
          <Box textAlign="center">{t('app.loading')}</Box>
        </Container>
      </Box>
    );
  }

  if (!user && pathname !== '/login') {
    return null;
  }

  if (pathname === '/login') {
    return (
      <Box minH="100vh">
        <Container maxW="container.xl" py={8}>
          {children}
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Navbar />
      <Sidebar />
      <LanguageSwitcher />
      <Container maxW="container.xl" py={8} ml="240px" transition="margin-left 0.3s ease">
        {children}
      </Container>
    </Box>
  );
} 