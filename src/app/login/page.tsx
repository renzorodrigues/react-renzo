"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
  Flex,
  Image,
  VStack,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react"
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaEnvelope, FaLock } from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const toast = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const validateForm = () => {
    let isValid = true
    
    if (!email) {
      setEmailError("Email é obrigatório")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email inválido")
      isValid = false
    } else {
      setEmailError("")
    }
    
    if (!password) {
      setPasswordError("Senha é obrigatória")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("Senha deve ter pelo menos 6 caracteres")
      isValid = false
    } else {
      setPasswordError("")
    }
    
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Credenciais inválidas",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Flex 
        direction={{ base: "column", md: "row" }} 
        align="center" 
        justify="center" 
        minH="80vh"
        gap={10}
      >
        {/* Lado esquerdo - Imagem/Ilustração */}
        <Box 
          flex="1" 
          display={{ base: "none", md: "block" }}
          textAlign="center"
        >
          <Image 
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Login illustration" 
            borderRadius="xl"
            boxShadow="xl"
            maxH="500px"
            objectFit="cover"
          />
        </Box>
        
        {/* Lado direito - Formulário */}
        <Box 
          flex="1" 
          maxW="md" 
          w="full"
          p={8}
          bg="white"
          borderRadius="2xl"
          boxShadow="xl"
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={2} align="center">
              <Heading size="lg" fontWeight="bold">Bem-vindo de volta</Heading>
              <Text color="gray.500" fontSize="sm" textAlign="center">
                Entre com suas credenciais para acessar sua conta
              </Text>
            </VStack>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isInvalid={!!emailError}>
                  <FormLabel fontSize="sm" fontWeight="medium">Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaEnvelope color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{emailError}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!passwordError}>
                  <FormLabel fontSize="sm" fontWeight="medium">Senha</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      size="lg"
                      borderRadius="lg"
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{passwordError}</FormErrorMessage>
                </FormControl>
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  borderRadius="lg"
                  isLoading={isLoading}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  Entrar
                </Button>
              </VStack>
            </form>
            
            <HStack justify="space-between" fontSize="sm">
              <Link href="/forgot-password" style={{ color: "blue", textDecoration: "none" }}>
                Esqueceu a senha?
              </Link>
              <Link href="/register" style={{ color: "blue", textDecoration: "none" }}>
                Criar conta
              </Link>
            </HStack>
            
            <HStack>
              <Divider />
              <Text fontSize="xs" whiteSpace="nowrap" color="gray.500">
                ou continue com
              </Text>
              <Divider />
            </HStack>
            
            <HStack spacing={4} justify="center">
              <Button 
                variant="outline" 
                leftIcon={<FaGoogle />}
                size="md"
                width="full"
                borderRadius="lg"
                _hover={{
                  bg: "gray.50",
                }}
              >
                Google
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<FaGithub />}
                size="md"
                width="full"
                borderRadius="lg"
                _hover={{
                  bg: "gray.50",
                }}
              >
                GitHub
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
} 