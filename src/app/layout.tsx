import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { I18nProvider } from '@/lib/i18n/provider';
import type { Metadata } from "next"
import { Inter } from "next/font/google";
import "./globals.css";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu App com Chakra UI",
  description: "Um exemplo de aplicação Next.js com Chakra UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ChakraProvider>
          <I18nProvider>
            <LanguageSwitcher />
            <AuthProvider>
              {children}
            </AuthProvider>
          </I18nProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
