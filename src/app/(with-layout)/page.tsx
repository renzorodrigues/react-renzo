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
import { useI18n } from "@/lib/i18n/useI18n"

export default function Home() {
  const { t } = useI18n();
  
  return (
    <Box bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg">{t('dashboard.welcome')}</Heading>
          
          {/* Stats */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>{t('dashboard.stats.sales.label')}</StatLabel>
                  <StatNumber>{t('dashboard.stats.sales.currency')} 45.670</StatNumber>
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
                  <StatLabel>{t('dashboard.stats.users.label')}</StatLabel>
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
                  <StatLabel>{t('dashboard.stats.orders.label')}</StatLabel>
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
                  <StatLabel>{t('dashboard.stats.revenue.label')}</StatLabel>
                  <StatNumber>{t('dashboard.stats.revenue.currency')} 78,900</StatNumber>
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
              <Heading size="md">{t('dashboard.recentActivity.title')}</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box key={item} p={4} bg="gray.50" borderRadius="md">
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Icon as={FaUser} color="blue.500" />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{t('dashboard.recentActivity.newUser')}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {item === 1 
                              ? t('dashboard.recentActivity.timeAgo.hour', { count: item }) 
                              : t('dashboard.recentActivity.timeAgo.hours', { count: item })}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button size="sm" variant="ghost">{t('dashboard.recentActivity.viewButton')}</Button>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </CardBody>
            <CardFooter>
              <Button variant="link" colorScheme="blue">{t('dashboard.recentActivity.viewAll')}</Button>
            </CardFooter>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
} 