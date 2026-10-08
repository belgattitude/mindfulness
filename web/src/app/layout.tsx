import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "../styles/globals.css";
import type { ReactNode } from "react";

import { MainLayout } from "@/components/Layout";
import { siteConfig } from "@/config/site.config";
import { AppProviders } from "@/providers/AppProviders";

// Exposed as --font-sans, the font of all texts (shadcn theme and font-family-* utilities)
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
  <html lang="en" className={fontSans.variable}>
    <body>
      <AppProviders>
        <MainLayout>{children}</MainLayout>
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
