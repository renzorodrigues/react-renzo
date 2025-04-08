"use client"

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Button,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react"
import { FaUser } from "react-icons/fa"

export default function Home() {
  return (
    <Box bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg">Bem-vindo ao seu Dashboard</Heading>
          
          {/* Stats */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Vendas</StatLabel>
                  <StatNumber>R$ 45.670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Usuários</StatLabel>
                  <StatNumber>2,350</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Pedidos</StatLabel>
                  <StatNumber>1,250</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    2.5%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Receita</StatLabel>
                  <StatNumber>R$ 78,900</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12.8%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <Heading size="md">Atividades Recentes</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box key={item} p={4} bg="gray.50" borderRadius="md">
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Icon as={FaUser} color="blue.500" />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">Novo usuário registrado</Text>
                          <Text fontSize="sm" color="gray.500">Há {item} hora{item > 1 ? 's' : ''}</Text>
                        </VStack>
                      </HStack>
                      <Button size="sm" variant="ghost">Ver</Button>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </CardBody>
            <CardFooter>
              <Button variant="link" colorScheme="blue">Ver todas as atividades</Button>
            </CardFooter>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
} 