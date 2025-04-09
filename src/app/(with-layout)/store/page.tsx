'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Switch,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Text,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useI18n } from '@/lib/i18n/useI18n';

interface StoreFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
}

export default function StorePage() {
  const { t } = useI18n();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [formData, setFormData] = useState<StoreFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    isActive: true,
  });

  const handleChange = (field: keyof StoreFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aqui você implementaria a lógica para salvar os dados da loja
      console.log('Dados da loja:', formData);
      
      toast({
        title: t('store.form.success.title'),
        description: t('store.form.success.description'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: t('store.form.error.title'),
        description: t('store.form.error.description'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
        <CardHeader>
          <Heading size="md">{t('store.title')}</Heading>
          <Text color="gray.500" mt={2}>{t('store.subtitle')}</Text>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>{t('store.form.name')}</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={t('store.form.namePlaceholder')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('store.form.address')}</FormLabel>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder={t('store.form.addressPlaceholder')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('store.form.phone')}</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={t('store.form.phonePlaceholder')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('store.form.email')}</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder={t('store.form.emailPlaceholder')}
                />
              </FormControl>

              <FormControl>
                <HStack justify="space-between">
                  <FormLabel mb={0}>{t('store.form.isActive')}</FormLabel>
                  <Switch
                    isChecked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    colorScheme="green"
                  />
                </HStack>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
              >
                {t('store.form.submit')}
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
} 