import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

const { siteDescription, siteTitle } = siteConfig.metadata;

/** The shared image of the pages without their own (app/opengraph-image.tsx) */
const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteTitle,
};

interface PageMetadata {
  /** The page title, the site title when not set (home) */
  title?: string | undefined;
  description?: string | undefined;
  /** The page url path, for the canonical and og:url */
  path: string;
  type?: "website" | "article";
  /**
   * The route segment has its own opengraph-image file: it overrides the
   * images set here, the default image is not added
   */
  hasOwnImage?: boolean;
  /** False for the layout defaults: pages set their own canonical */
  canonical?: boolean;
}

/**
 * The metadata of a page with its link previews (Facebook, LinkedIn, X…).
 * Metadata is merged shallowly: a page openGraph replaces the layout one
 * entirely, the shared fields are set here for every page.
 */
export const getPageMetadata = (page: PageMetadata): Metadata => {
  const {
    title,
    description = siteDescription,
    path,
    type = "website",
    hasOwnImage = false,
    canonical = true,
  } = page;
  const previewTitle = title ?? siteTitle;
  const images = hasOwnImage ? {} : { images: [defaultImage] };
  return {
    ...(title ? { title } : {}),
    description,
    ...(canonical ? { alternates: { canonical: path } } : {}),
    openGraph: {
      siteName: siteTitle,
      locale: "fr_BE",
      type,
      url: path,
      title: previewTitle,
      description,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: previewTitle,
      description,
      ...images,
    },
  };
};
