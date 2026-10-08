import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";

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

// A soft serif for the calmer headings (font-display utility)
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  // Absolute urls for the canonical and link preview (open graph) metadata
  ...(siteConfig.canonicalUrl
    ? { metadataBase: new URL(siteConfig.canonicalUrl) }
    : {}),
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
  title: {
    default: siteConfig.metadata.siteTitle,
    template: `%s · ${siteConfig.metadata.siteTitle}`,
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="fr" className={`${fontSans.variable} ${fontDisplay.variable}`}>
    <body>
      <AppProviders>
        <MainLayout>{children}</MainLayout>
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
