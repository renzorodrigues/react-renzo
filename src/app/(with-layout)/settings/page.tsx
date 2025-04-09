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
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react"
import { FaBell, FaPalette, FaGlobe, FaShieldAlt, FaSave, FaChevronDown } from "react-icons/fa"
import { useAuth } from "@/lib/auth/AuthContext"
import { useI18n } from "@/lib/i18n/useI18n"

export default function SettingsPage() {
  const { user } = useAuth()
  const { t, changeLanguage } = useI18n()
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
    language: typeof window !== 'undefined' ? localStorage.getItem('userLanguage') || 'pt-BR' : 'pt-BR',
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salva as configurações
      if (typeof window !== 'undefined') {
        localStorage.setItem('userSettings', JSON.stringify(settings))
      }
      
      // Aplica o tema se foi alterado
      if (settings.theme !== colorMode) {
        toggleColorMode()
      }

      // Aplica o idioma se foi alterado
      const currentLanguage = localStorage.getItem('userLanguage') || 'pt-BR'
      if (settings.language !== currentLanguage) {
        await changeLanguage(settings.language)
      }
      
      toast({
        title: t('toasts.settings.success.title'),
        description: t('toasts.settings.success.description'),
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: t('toasts.settings.error.title'),
        description: t('toasts.settings.error.description'),
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
        <Text>{t('app.loading')}</Text>
      </Container>
    )
  }
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg">{t('settings.title')}</Heading>
          <Button 
            leftIcon={<FaSave />} 
            colorScheme="blue" 
            onClick={handleSave}
            isLoading={isLoading}
          >
            {t('settings.saveButton')}
          </Button>
        </Flex>
        
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab><Icon as={FaPalette} mr={2} />{t('settings.tabs.appearance')}</Tab>
            <Tab><Icon as={FaBell} mr={2} />{t('settings.tabs.notifications')}</Tab>
            <Tab><Icon as={FaShieldAlt} mr={2} />{t('settings.tabs.privacy')}</Tab>
            <Tab><Icon as={FaGlobe} mr={2} />{t('settings.tabs.language')}</Tab>
          </TabList>
          
          <TabPanels>
            {/* Painel de Aparência */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">{t('settings.appearance.title')}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="theme" mb="0">
                        {t('settings.appearance.darkMode')}
                      </FormLabel>
                      <Switch 
                        id="theme" 
                        isChecked={settings.theme === "dark"} 
                        onChange={() => handleChange("theme", settings.theme === "dark" ? "light" : "dark")}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>{t('settings.appearance.fontSize.label')}</FormLabel>
                      <Select 
                        value={settings.fontSize} 
                        onChange={(e) => handleChange("fontSize", e.target.value)}
                      >
                        <option value="small">{t('settings.appearance.fontSize.small')}</option>
                        <option value="medium">{t('settings.appearance.fontSize.medium')}</option>
                        <option value="large">{t('settings.appearance.fontSize.large')}</option>
                      </Select>
                    </FormControl>
                    
                    <Divider />
                    
                    <Text fontWeight="medium">{t('settings.appearance.theme.label')}</Text>
                    <RadioGroup 
                      value={settings.theme} 
                      onChange={(value) => handleChange("theme", value)}
                    >
                      <Stack direction="row" spacing={5}>
                        <Radio value="light">{t('settings.appearance.theme.light')}</Radio>
                        <Radio value="dark">{t('settings.appearance.theme.dark')}</Radio>
                        <Radio value="system">{t('settings.appearance.theme.system')}</Radio>
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
                  <Heading size="md">{t('settings.notifications.title')}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="emailNotifications" mb="0">
                        {t('settings.notifications.email')}
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
                        {t('settings.notifications.push')}
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
                        {t('settings.notifications.marketing')}
                      </FormLabel>
                      <Switch 
                        id="marketingEmails" 
                        isChecked={settings.marketingEmails} 
                        onChange={(e) => handleChange("marketingEmails", e.target.checked)}
                        colorScheme="blue"
                      />
                    </FormControl>
                    
                    <Divider />
                    
                    <Text fontWeight="medium">{t('settings.notifications.frequency.label')}</Text>
                    <Select defaultValue="daily">
                      <option value="realtime">{t('settings.notifications.frequency.realtime')}</option>
                      <option value="daily">{t('settings.notifications.frequency.daily')}</option>
                      <option value="weekly">{t('settings.notifications.frequency.weekly')}</option>
                    </Select>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
            
            {/* Painel de Privacidade */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">{t('settings.privacy.title')}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>{t('settings.privacy.profileVisibility.label')}</FormLabel>
                      <Select 
                        value={settings.profileVisibility} 
                        onChange={(e) => handleChange("profileVisibility", e.target.value)}
                      >
                        <option value="public">{t('settings.privacy.profileVisibility.public')}</option>
                        <option value="private">{t('settings.privacy.profileVisibility.private')}</option>
                        <option value="friends">{t('settings.privacy.profileVisibility.friends')}</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="showEmail" mb="0">
                        {t('settings.privacy.showEmail')}
                      </FormLabel>
                      <Switch 
                        id="showEmail" 
                        isChecked={settings.showEmail} 
                        onChange={(e) => handleChange("showEmail", e.target.checked)}
                        colorScheme="blue"
                      />
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
            
            {/* Painel de Idioma */}
            <TabPanel>
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
                <CardHeader>
                  <Heading size="md">{t('settings.language.title')}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>{t('settings.language.select')}</FormLabel>
                      <Menu>
                        <MenuButton 
                          as={Button} 
                          rightIcon={<FaChevronDown />}
                          width="full"
                          textAlign="left"
                        >
                          <HStack>
                            {settings.language === "pt-BR" && (
                              <Image 
                                src="https://flagcdn.com/w20/br.png" 
                                alt="Brasil" 
                                width="20px" 
                              />
                            )}
                            {settings.language === "de" && (
                              <Image 
                                src="https://flagcdn.com/w20/de.png" 
                                alt="Deutschland" 
                                width="20px" 
                              />
                            )}
                            {settings.language === "en" && (
                              <Image 
                                src="https://flagcdn.com/w20/gb.png" 
                                alt="United Kingdom" 
                                width="20px" 
                              />
                            )}
                            <Text ml={2}>
                              {settings.language === "pt-BR" && t('settings.language.options.pt-BR')}
                              {settings.language === "de" && t('settings.language.options.de')}
                              {settings.language === "en" && t('settings.language.options.en')}
                            </Text>
                          </HStack>
                        </MenuButton>
                        <MenuList>
                          <MenuItem 
                            onClick={() => handleChange("language", "pt-BR")}
                            icon={<Image src="https://flagcdn.com/w20/br.png" alt="Brasil" width="20px" />}
                          >
                            {t('settings.language.options.pt-BR')}
                          </MenuItem>
                          <MenuItem 
                            onClick={() => handleChange("language", "de")}
                            icon={<Image src="https://flagcdn.com/w20/de.png" alt="Deutschland" width="20px" />}
                          >
                            {t('settings.language.options.de')}
                          </MenuItem>
                          <MenuItem 
                            onClick={() => handleChange("language", "en")}
                            icon={<Image src="https://flagcdn.com/w20/gb.png" alt="United Kingdom" width="20px" />}
                          >
                            {t('settings.language.options.en')}
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <CardHeader>
            <Heading size="md">{t('settings.accountInfo.title')}</Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="medium">{t('settings.accountInfo.version')}</Text>
                <Badge colorScheme="blue">1.0.0</Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">{t('settings.accountInfo.browser')}</Text>
                <Text color="gray.500">{typeof window !== 'undefined' ? window.navigator.userAgent : t('settings.accountInfo.unknown')}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">{t('settings.accountInfo.screenResolution')}</Text>
                <Text color="gray.500">
                  {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : t('settings.accountInfo.unknown')}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
} 