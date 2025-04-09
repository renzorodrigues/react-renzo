import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  HStack,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/useI18n';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, changeLanguage } = useI18n();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Obter o idioma atual
  const currentLanguage = typeof window !== 'undefined' ? localStorage.getItem('userLanguage') || 'pt-BR' : 'pt-BR';

  // Função para obter o nome do idioma atual
  const getCurrentLanguageName = () => {
    switch (currentLanguage) {
      case 'pt-BR':
        return t('settings.language.options.pt-BR');
      case 'de':
        return t('settings.language.options.de');
      case 'en':
        return t('settings.language.options.en');
      default:
        return t('settings.language.options.pt-BR');
    }
  };

  // Função para obter a bandeira do idioma atual
  const getCurrentLanguageFlag = () => {
    switch (currentLanguage) {
      case 'pt-BR':
        return 'https://flagcdn.com/w20/br.png';
      case 'de':
        return 'https://flagcdn.com/w20/de.png';
      case 'en':
        return 'https://flagcdn.com/w20/gb.png';
      default:
        return 'https://flagcdn.com/w20/br.png';
    }
  };

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
          {/* Language Switcher */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label={t('nav.changeLanguage')}
              icon={
                <HStack spacing={1}>
                  <Image 
                    src={getCurrentLanguageFlag()} 
                    alt={currentLanguage} 
                    width="20px" 
                  />
                </HStack>
              }
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem 
                onClick={() => changeLanguage('pt-BR')}
                icon={<Image src="https://flagcdn.com/w20/br.png" alt="Brasil" width="20px" />}
              >
                {t('settings.language.options.pt-BR')}
              </MenuItem>
              <MenuItem 
                onClick={() => changeLanguage('de')}
                icon={<Image src="https://flagcdn.com/w20/de.png" alt="Deutschland" width="20px" />}
              >
                {t('settings.language.options.de')}
              </MenuItem>
              <MenuItem 
                onClick={() => changeLanguage('en')}
                icon={<Image src="https://flagcdn.com/w20/gb.png" alt="United Kingdom" width="20px" />}
              >
                {t('settings.language.options.en')}
              </MenuItem>
            </MenuList>
          </Menu>

          {/* User Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label={t('nav.userOptions')}
              icon={<Box>👤</Box>}
              variant="ghost"
            />
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