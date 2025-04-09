import { useTranslations } from 'next-intl';

export function useI18n() {
  const t = useTranslations();

  const changeLanguage = async (locale: string) => {
    try {
      // Salvar o idioma escolhido
      localStorage.setItem('userLanguage', locale);
      
      // Atualizar o atributo lang do HTML
      document.documentElement.lang = locale;
      
      // Recarregar a página para aplicar o novo idioma
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return {
    t,
    changeLanguage
  };
} 