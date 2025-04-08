'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider - Initializing...');
    // Verificar se há um usuário logado no localStorage
    const storedUser = localStorage.getItem('user');
    console.log('AuthProvider - Stored user from localStorage:', storedUser);
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('AuthProvider - Parsed user:', parsedUser);
      setUser(parsedUser);
    } else {
      console.log('AuthProvider - No user found in localStorage');
    }
    
    setLoading(false);
    console.log('AuthProvider - Initialization complete. Loading:', false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('AuthProvider - Login started...');
      
      // Verifica se o email é válido (formato básico)
      if (!email || !email.includes('@')) {
        throw new Error('Email inválido');
      }
      
      // Cria um usuário mock sem realmente autenticar
      const mockUser = {
        id: '1',
        name: email.split('@')[0], // Usa a parte antes do @ como nome
        email: email,
      };
      
      console.log('AuthProvider - Setting user:', mockUser);
      setUser(mockUser);
      
      console.log('AuthProvider - Saving to localStorage...');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      console.log('AuthProvider - Login complete');
    } catch (error) {
      console.error('AuthProvider - Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('AuthProvider - Logout started');
    setLoading(true);
    setUser(null);
    localStorage.removeItem('user');
    console.log('AuthProvider - Logout complete');
    setLoading(false);
  };

  console.log('AuthProvider - Current state:', { user, loading });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 