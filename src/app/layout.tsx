import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { I18nProvider } from '@/lib/i18n/provider';
import type { Metadata } from "next"
import { Quicksand } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

const quicksand = Quicksand({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

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
      <body className={quicksand.className}>
        <ChakraProvider>
          <I18nProvider>
            <ErrorBoundary>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ErrorBoundary>
          </I18nProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
