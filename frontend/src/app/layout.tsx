import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ClientProviders from '@/components/client-providers';
import Header from '@/components/shared/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Micro Marketplace',
  description: 'A modern e-commerce platform built with microservices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}