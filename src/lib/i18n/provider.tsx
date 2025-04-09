'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [messages, setMessages] = useState<any>(null);
  const [locale, setLocale] = useState<string>('pt-BR');

  useEffect(() => {
    // Carregar as mensagens do idioma atual
    const loadMessages = async () => {
      try {
        // Verificar se há um idioma salvo
        const savedLocale = localStorage.getItem('userLanguage') || 'pt-BR';
        setLocale(savedLocale);
        
        // Carregar as mensagens do idioma
        const messages = await import(`../../../messages/${savedLocale}.json`);
        setMessages(messages.default);
        
        // Atualizar o atributo lang do HTML
        document.documentElement.lang = savedLocale;
      } catch (error) {
        console.error('Error loading messages:', error);
        // Fallback para português em caso de erro
        const defaultMessages = await import('../../../messages/pt-BR.json');
        setMessages(defaultMessages.default);
        setLocale('pt-BR');
        document.documentElement.lang = 'pt-BR';
      }
    };

    loadMessages();
    
    // Adicionar listener para mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userLanguage' && e.newValue) {
        loadMessages();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Não renderizar nada até que as mensagens sejam carregadas
  if (!messages) {
    return null;
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
} 