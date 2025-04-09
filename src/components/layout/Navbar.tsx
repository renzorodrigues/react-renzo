import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Text,
  useColorModeValue,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/useI18n';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box 
      as="nav" 
      position="sticky" 
      top={0} 
      zIndex={10} 
      bg={bgColor} 
      borderBottom="1px" 
      borderColor={borderColor}
      py={2}
    >
      <Flex 
        maxW="container.xl" 
        mx="auto" 
        px={4} 
        align="center" 
        justify="space-between"
      >
        <Link href="/dashboard">
          <Text fontSize="xl" fontWeight="bold" cursor="pointer">
            {t('app.title')}
          </Text>
        </Link>

        <HStack spacing={4}>
          {/* User Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="unstyled"
              size="sm"
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size="sm" name={user?.name || 'User'} />
                <Text display={{ base: "none", md: "inline" }}>{user?.name || 'User'}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="/profile">
                {t('nav.profile')}
              </MenuItem>
              <MenuItem as={Link} href="/settings">
                {t('nav.settings')}
              </MenuItem>
              <MenuItem onClick={logout}>
                {t('nav.logout')}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
} 