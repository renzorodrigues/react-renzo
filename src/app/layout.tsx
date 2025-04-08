import Providers from '@/components/providers/Providers';
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
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
