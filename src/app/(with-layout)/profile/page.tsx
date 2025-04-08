"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Divider,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Badge,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { FaUser, FaEnvelope, FaKey, FaEdit, FaSave, FaTimes } from "react-icons/fa"
import { useAuth } from "@/lib/auth/AuthContext"

export default function ProfilePage() {
  const { user, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma atualização de perfil
      // Em uma aplicação real, você faria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Atualiza o usuário no contexto
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      }
      
      // Atualiza o localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Força uma atualização do contexto
      await login(formData.email, formData.currentPassword || "any-password")
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const cancelEdit = () => {
    setFormData(prev => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
    setIsEditing(false)
  }

  if (!user) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Carregando perfil...</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Perfil do Usuário</Heading>
        
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <CardHeader>
            <Flex align="center" justify="space-between">
              <HStack spacing={4}>
                <Avatar size="xl" name={user.name} />
                <VStack align="start" spacing={0}>
                  <Heading size="md">{user.name}</Heading>
                  <Text color="gray.500">{user.email}</Text>
                  <Badge colorScheme="green" mt={1}>Ativo</Badge>
                </VStack>
              </HStack>
              
              {!isEditing ? (
                <Button 
                  leftIcon={<FaEdit />} 
                  colorScheme="blue" 
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </Button>
              ) : (
                <HStack>
                  <Button 
                    leftIcon={<FaTimes />} 
                    variant="outline" 
                    onClick={cancelEdit}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    leftIcon={<FaSave />} 
                    colorScheme="green" 
                    onClick={handleSubmit}
                    isLoading={isLoading}
                  >
                    Salvar
                  </Button>
                </HStack>
              )}
            </Flex>
          </CardHeader>
          
          <CardBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Nome</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </InputGroup>
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    />
                  </InputGroup>
                </FormControl>
                
                {isEditing && (
                  <>
                    <Divider />
                    <Heading size="sm">Alterar Senha</Heading>
                    
                    <FormControl>
                      <FormLabel>Senha Atual</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FaKey} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Nova Senha</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FaKey} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Confirmar Nova Senha</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FaKey} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </FormControl>
                  </>
                )}
              </VStack>
            </form>
          </CardBody>
        </Card>
        
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <CardHeader>
            <Heading size="md">Informações da Conta</Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="medium">ID do Usuário</Text>
                <Text color="gray.500">{user.id}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Data de Criação</Text>
                <Text color="gray.500">01/01/2023</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Último Login</Text>
                <Text color="gray.500">Hoje</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Status da Conta</Text>
                <Badge colorScheme="green">Ativo</Badge>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
} 