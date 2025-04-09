'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Icon,
  Text,
  Button,
  useColorModeValue,
  Collapse,
  IconButton,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiCalendar, 
  FiSettings, 
  FiFileText, 
  FiMessageSquare, 
  FiChevronLeft, 
  FiChevronRight,
  FiAlertCircle,
  FiShield
} from 'react-icons/fi';
import { useI18n } from '@/lib/i18n/useI18n';

interface NavItemProps {
  icon: any;
  label: string;
  href: string;
  isCollapsed: boolean;
}

const NavItem = ({ icon, label, href, isCollapsed }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const activeBgColor = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.200');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Link href={href} passHref style={{ width: '100%' }}>
      <Button
        variant="ghost"
        justifyContent={isCollapsed ? 'center' : 'flex-start'}
        width="100%"
        height="40px"
        px={isCollapsed ? 0 : 4}
        bg={isActive ? activeBgColor : 'transparent'}
        color={isActive ? activeColor : 'inherit'}
        _hover={{ bg: isActive ? activeBgColor : hoverBgColor }}
        _active={{ bg: isActive ? activeBgColor : hoverBgColor }}
        position="relative"
      >
        <HStack spacing={3} width="100%" justifyContent={isCollapsed ? 'center' : 'flex-start'}>
          <Icon as={icon} boxSize={5} />
          {!isCollapsed && <Text fontSize="sm">{label}</Text>}
        </HStack>
        {isActive && !isCollapsed && (
          <Box
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            width="4px"
            bg={activeColor}
            borderRadius="0 4px 4px 0"
          />
        )}
      </Button>
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useI18n();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const navItems = [
    { icon: FiHome, label: t('nav.sidebar.dashboard'), href: '/dashboard' },
    { icon: FiUsers, label: t('nav.sidebar.residents'), href: '/residents' },
    { icon: FiDollarSign, label: t('nav.sidebar.finances'), href: '/finances' },
    { icon: FiCalendar, label: t('nav.sidebar.events'), href: '/events' },
    { icon: FiFileText, label: t('nav.sidebar.documents'), href: '/documents' },
    { icon: FiMessageSquare, label: t('nav.sidebar.communications'), href: '/communications' },
    { icon: FiAlertCircle, label: t('nav.sidebar.incidents'), href: '/incidents' },
    { icon: FiShield, label: t('nav.sidebar.security'), href: '/security' },
    { icon: FiSettings, label: t('nav.sidebar.settings'), href: '/settings' },
  ];
  
  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      width={isCollapsed ? '60px' : '240px'}
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      transition="width 0.3s ease"
      zIndex={900}
      pt="60px"
    >
      <VStack spacing={1} align="stretch" width="100%" px={isCollapsed ? 0 : 2}>
        {navItems.map((item, index) => (
          <Tooltip 
            key={index} 
            label={isCollapsed ? item.label : ''} 
            placement="right" 
            isDisabled={!isCollapsed}
          >
            <Box>
              <NavItem 
                icon={item.icon} 
                label={item.label} 
                href={item.href} 
                isCollapsed={isCollapsed} 
              />
            </Box>
          </Tooltip>
        ))}
      </VStack>
      
      <Box position="absolute" bottom="20px" width="100%" px={2}>
        <Divider mb={4} />
        <Button
          variant="ghost"
          width="100%"
          justifyContent={isCollapsed ? 'center' : 'flex-start'}
          onClick={toggleCollapse}
          leftIcon={isCollapsed ? <Icon as={FiChevronRight} /> : <Icon as={FiChevronLeft} />}
          px={isCollapsed ? 0 : 4}
        >
          {!isCollapsed && <Text fontSize="sm">{t('nav.sidebar.collapse')}</Text>}
        </Button>
      </Box>
    </Box>
  );
} 