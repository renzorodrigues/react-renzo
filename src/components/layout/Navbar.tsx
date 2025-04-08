import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box as="nav" py={4} borderBottom="1px" borderColor="gray.200">
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto" px={4}>
        <Link href="/">
          <Box fontSize="xl" fontWeight="bold">
            Minha App
          </Box>
        </Link>

        <Flex gap={4} align="center">
          {user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Opções do usuário"
                icon={<Box>👤</Box>}
                variant="ghost"
              />
              <MenuList>
                <MenuItem onClick={logout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="/login">
              <Box
                as="button"
                px={4}
                py={2}
                bg="blue.500"
                color="white"
                borderRadius="md"
                _hover={{ bg: 'blue.600' }}
              >
                Entrar
              </Box>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
} 