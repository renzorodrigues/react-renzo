'use client';

import { usePathname } from 'next/navigation';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const isErrorPage = (pathname: string) => {
  return pathname.includes('/404') || 
         pathname.includes('/500') || 
         pathname.includes('/error') ||
         pathname.includes('/not-found') ||
         pathname === '/404' ||
         pathname.startsWith('/_error') ||
         pathname.includes('error') ||
         pathname.includes('_error');
};

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const pathname = usePathname();

  if (isErrorPage(pathname)) {
    return null;
  }

  return <>{children}</>;
} 