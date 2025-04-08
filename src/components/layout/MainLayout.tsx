'use client';

import { Box, Container, Flex, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, HStack, Avatar } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, logout, loading } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  // Se ainda estiver carregando, podemos mostrar um loading state
  if (loading) {
    return (
      <Box minH="100vh">
        <Box as="header" py={4} borderBottom="1px" borderColor="gray.200">
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
              <Link href="/" passHref>
                <Text fontSize="xl" fontWeight="bold" _hover={{ cursor: 'pointer' }}>
                  Minha App
                </Text>
              </Link>
              <Text>Carregando...</Text>
            </Flex>
          </Container>
        </Box>
        <Container maxW="container.xl" py={8}>
          {children}
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
      <Box as="header" py={4} borderBottom="1px" borderColor="gray.200">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Link href="/" passHref>
              <Text fontSize="xl" fontWeight="bold" _hover={{ cursor: 'pointer' }}>
                Minha App
              </Text>
            </Link>
            <Flex gap={4} align="center">
              {user && (
                <Menu>
                  <MenuButton as={Button} variant="ghost" size="sm">
                    <HStack>
                      <Avatar size="sm" name={user.name} />
                      <Text display={{ base: "none", md: "inline" }}>{user.name}</Text>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<FaUser />} onClick={handleProfileClick}>Perfil</MenuItem>
                    <MenuItem icon={<FaCog />} onClick={handleSettingsClick}>Configurações</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
} 