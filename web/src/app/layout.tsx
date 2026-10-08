import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import type { ReactNode } from "react";

import { MainLayout } from "@/components/Layout";
import { siteConfig } from "@/config/site.config";
import { AppProviders } from "@/providers/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: siteConfig.metadata.siteDescription,
  icons: {
    apple: {
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    icon: [
      {
        rel: "icon",
        url: "/favicon/favicon.ico",
      },
      {
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
    ],
  },
  title: siteConfig.metadata.siteTitle,
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className}`}>
      <AppProviders>
        <MainLayout>{children}</MainLayout>
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
