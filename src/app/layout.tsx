import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { I18nProvider } from '@/lib/i18n/provider';
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meu App com Chakra UI",
  description: "Um exemplo de aplicação Next.js com Chakra UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ChakraProvider>
          <I18nProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </I18nProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
