import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import type { ReactNode } from 'react';
import { MainLayout } from '@/components/Layout';
import { siteConfig } from '@/config/site.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.metadata.siteTitle,
  description: siteConfig.metadata.siteDescription,
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/favicon/favicon.ico',
      },
      {
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
    ],
    apple: {
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
