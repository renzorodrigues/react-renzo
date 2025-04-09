'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useI18n } from '@/lib/i18n/useI18n';

export default function LanguageSwitcher() {
  const { t, changeLanguage } = useI18n();
  const { isOpen, onToggle } = useDisclosure();
  
  // Obter o idioma atual
  const currentLanguage = typeof window !== 'undefined' ? localStorage.getItem('userLanguage') || 'pt-BR' : 'pt-BR';

  // Função para obter a bandeira do idioma atual
  const getCurrentLanguageFlag = () => {
    switch (currentLanguage) {
      case 'pt-BR':
        return 'https://flagcdn.com/w40/br.png';
      case 'de':
        return 'https://flagcdn.com/w40/de.png';
      case 'en':
        return 'https://flagcdn.com/w40/gb.png';
      default:
        return 'https://flagcdn.com/w40/br.png';
    }
  };

  // Valores responsivos para o posicionamento
  const topPosition = useBreakpointValue({ base: "30px", md: "40px", lg: "50px" });

  return (
    <Box
      position="fixed"
      right="-10px"
      top={topPosition}
      zIndex={1000}
    >
      <Box position="relative">
        <Button
          onClick={onToggle}
          variant="ghost"
          bg="white"
          size="md"
          height="40px"
          width="50px"
          p={0}
          borderRadius="md"
          boxShadow="sm"
          _hover={{ bg: 'gray.50' }}
          _active={{ bg: 'gray.100' }}
        >
          <Image 
            src={getCurrentLanguageFlag()} 
            alt={currentLanguage} 
            width="30px" 
            objectFit="contain"
          />
        </Button>

        {isOpen && (
          <Box
            position="absolute"
            top="0"
            right="100%"
            mr={1}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={2}
            width="150px"
          >
            <VStack align="stretch" spacing={1}>
              <Button
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                onClick={() => {
                  changeLanguage('pt-BR');
                  onToggle();
                }}
              >
                <HStack spacing={2}>
                  <Image src="https://flagcdn.com/w20/br.png" alt="Brasil" width="16px" />
                  <Text fontSize="sm">{t('settings.language.options.pt-BR')}</Text>
                </HStack>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                onClick={() => {
                  changeLanguage('de');
                  onToggle();
                }}
              >
                <HStack spacing={2}>
                  <Image src="https://flagcdn.com/w20/de.png" alt="Deutschland" width="16px" />
                  <Text fontSize="sm">{t('settings.language.options.de')}</Text>
                </HStack>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                onClick={() => {
                  changeLanguage('en');
                  onToggle();
                }}
              >
                <HStack spacing={2}>
                  <Image src="https://flagcdn.com/w20/gb.png" alt="United Kingdom" width="16px" />
                  <Text fontSize="sm">{t('settings.language.options.en')}</Text>
                </HStack>
              </Button>
            </VStack>
          </Box>
        )}
      </Box>
    </Box>
  );
} 