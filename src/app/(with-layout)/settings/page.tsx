"use client"

import { useState } from "react"
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Select,
  HStack,
  Divider,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  Stack,
  Badge,
} from "@chakra-ui/react"
import { FaBell, FaPalette, FaGlobe, FaShieldAlt, FaSave } from "react-icons/fa"
import { useAuth } from "@/lib/auth/AuthContext"

export default function SettingsPage() {
  const { user } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  
  // Estado para as configurações
  const [settings, setSettings] = useState({
    // Aparência
    theme: colorMode,
    fontSize: "medium",
    
    // Notificações
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    
    // Privacidade
    profileVisibility: "public",
    showEmail: false,
    
    // Idioma
    language: "pt-BR",
  })
  
  const handleChange = (name: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleSave = async () => {
    setIsLoading(true)
    
    try {
      // Simulando uma atualização de configurações
      // Em uma aplicação real, você faria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salva as configurações no localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings))
      
      // Aplica o tema se foi alterado
      if (settings.theme !== colorMode) {
        toggleColorMode()
      }
      
      toast({
        title: "Configurações salvas",
        description: "Suas preferências foram atualizadas com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar configurações",
        description: "Ocorreu um erro ao atualizar suas preferências.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  if (!user) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Carregando configurações...</Text>
      </Container>
    )
  }
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg">Configurações</Heading>
          <Button 
            leftIcon={<FaSave />} 
            colorScheme="blue" 
            onClick={handleSave}
            isLoading={isLoading}
          >
            Salvar Alterações
          </Button>
        </Flex>
        
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab><Icon as={FaPalette} mr={2} />Aparência</Tab>
            <Tab><Icon as={FaBell} mr={2} />Notificações</Tab>
            <Tab><Icon as={FaShieldAlt} mr={2} />Privacidade</Tab>
            <Tab><Icon as={FaGlobe} mr={2} />Idioma</Tab>
          </TabList>
          
          <TabPanels>
            {/* Painel de Aparência */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">Preferências de Aparência</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="theme" mb="0">
                        Modo Escuro
                      </FormLabel>
                      <Switch 
                        id="theme" 
                        isChecked={settings.theme === "dark"} 
                        onChange={() => handleChange("theme", settings.theme === "dark" ? "light" : "dark")}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Tamanho da Fonte</FormLabel>
                      <Select 
                        value={settings.fontSize} 
                        onChange={(e) => handleChange("fontSize", e.target.value)}
                      >
                        <option value="small">Pequeno</option>
                        <option value="medium">Médio</option>
                        <option value="large">Grande</option>
                      </Select>
                    </FormControl>
                    
                    <Divider />
                    
                    <Text fontWeight="medium">Visualização</Text>
                    <RadioGroup 
                      value={settings.theme} 
                      onChange={(value) => handleChange("theme", value)}
                    >
                      <Stack direction="row" spacing={5}>
                        <Radio value="light">Claro</Radio>
                        <Radio value="dark">Escuro</Radio>
                        <Radio value="system">Sistema</Radio>
                      </Stack>
                    </RadioGroup>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
            
            {/* Painel de Notificações */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">Preferências de Notificação</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="emailNotifications" mb="0">
                        Notificações por Email
                      </FormLabel>
                      <Switch 
                        id="emailNotifications" 
                        isChecked={settings.emailNotifications} 
                        onChange={(e) => handleChange("emailNotifications", e.target.checked)}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="pushNotifications" mb="0">
                        Notificações Push
                      </FormLabel>
                      <Switch 
                        id="pushNotifications" 
                        isChecked={settings.pushNotifications} 
                        onChange={(e) => handleChange("pushNotifications", e.target.checked)}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="marketingEmails" mb="0">
                        Emails de Marketing
                      </FormLabel>
                      <Switch 
                        id="marketingEmails" 
                        isChecked={settings.marketingEmails} 
                        onChange={(e) => handleChange("marketingEmails", e.target.checked)}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <Divider />
                    
                    <Text fontWeight="medium">Frequência de Notificações</Text>
                    <Select defaultValue="daily">
                      <option value="realtime">Tempo Real</option>
                      <option value="daily">Diário</option>
                      <option value="weekly">Semanal</option>
                    </Select>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
            
            {/* Painel de Privacidade */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">Configurações de Privacidade</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>Visibilidade do Perfil</FormLabel>
                      <Select 
                        value={settings.profileVisibility} 
                        onChange={(e) => handleChange("profileVisibility", e.target.value)}
                      >
                        <option value="public">Público</option>
                        <option value="friends">Apenas Amigos</option>
                        <option value="private">Privado</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="showEmail" mb="0">
                        Mostrar Email no Perfil
                      </FormLabel>
                      <Switch 
                        id="showEmail" 
                        isChecked={settings.showEmail} 
                        onChange={(e) => handleChange("showEmail", e.target.checked)}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <Divider />
                    
                    <Text fontWeight="medium">Dados da Conta</Text>
                    <HStack justify="space-between">
                      <Text>Exportar Dados</Text>
                      <Button size="sm" variant="outline">Exportar</Button>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Excluir Conta</Text>
                      <Button size="sm" colorScheme="red" variant="outline">Excluir</Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
            
            {/* Painel de Idioma */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">Preferências de Idioma</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>Idioma da Interface</FormLabel>
                      <Select 
                        value={settings.language} 
                        onChange={(e) => handleChange("language", e.target.value)}
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                        <option value="fr-FR">Français</option>
                        <option value="de-DE">Deutsch</option>
                      </Select>
                    </FormControl>
                    
                    <Divider />
                    
                    <Text fontWeight="medium">Formato de Data e Hora</Text>
                    <Select defaultValue="dd/mm/yyyy">
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </Select>
                    
                    <FormControl>
                      <FormLabel>Fuso Horário</FormLabel>
                      <Select defaultValue="America/Sao_Paulo">
                        <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                        <option value="America/New_York">Nova York (GMT-4)</option>
                        <option value="Europe/London">Londres (GMT+1)</option>
                        <option value="Asia/Tokyo">Tóquio (GMT+9)</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <CardHeader>
            <Heading size="md">Informações do Sistema</Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="medium">Versão da Aplicação</Text>
                <Badge colorScheme="blue">1.0.0</Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Navegador</Text>
                <Text color="gray.500">{typeof window !== 'undefined' ? window.navigator.userAgent : 'Desconhecido'}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Resolução da Tela</Text>
                <Text color="gray.500">
                  {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Desconhecido'}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
} 