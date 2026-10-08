export interface SiteConfig {
  canonicalUrl: string;
  metadata: {
    siteTitle: string;
    siteDescription: string;
  };
  mainNavLinks: {
    title: string;
    href: string;
    activeMenu?: string[] | undefined;
    footerGroup?: ("activities" | "agenda" | "menu") | undefined;
  }[];
  search: {
    eventTypes: {
      slug: string;
      title: string;
    }[];
  };
}

export const siteConfig = {
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  mainNavLinks: [
    { title: "Accueil", href: "/", footerGroup: "menu" },
    {
      title: "Mindfulness",
      href: "/activities/mindfulness",
      footerGroup: "activities",
    },
    { title: "Yoga", href: "/activities/yoga", footerGroup: "activities" },
    {
      title: "Dialogue Conscient",
      href: "/activities/dialogue-conscient",
      footerGroup: "activities",
    },
    {
      title: "Agenda",
      href: "/agenda",
      activeMenu: ["/agenda", "/event", "/programme"],
      footerGroup: "agenda",
    },
    { title: "A propos", href: "/about", footerGroup: "menu" },
    { title: "Contact", href: "/contact", footerGroup: "menu" },
  ],
  metadata: {
    siteDescription: "",
    siteTitle: "Sandrine Rauter",
  },
  search: {
    eventTypes: [
      { slug: "stages-et-retraites", title: "Stages et retraites" },
      { slug: "programmes-et-cycles", title: "Programmes et cycles" },
      { slug: "cours-reguliers", title: "Cours réguliers" },
    ],
  },
} as const satisfies SiteConfig;

export type MainNavLinks = SiteConfig["mainNavLinks"];
