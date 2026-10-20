export interface SiteConfig {
  canonicalUrl: string;
  metadata: {
    siteTitle: string;
    siteDescription: string;
    /** The author meta tag */
    author: string;
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
    /** The strapi event "universe", slug in the agenda url */
    universes: {
      slug: string;
      title: string;
      value: string;
    }[];
  };
}

export const siteConfig = {
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  mainNavLinks: [
    { title: "Accueil", href: "/", footerGroup: "menu" },
    {
      title: "Méditation",
      href: "/activities/meditation",
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
    siteDescription:
      "Méditation, yoga et dialogue conscient avec Sandrine Rauter : cours, programmes, stages et retraites, en personne et en ligne, en Belgique et en France.",
    siteTitle: "Sandrine Rauter",
    author: "Sandrine Rauter",
  },
  search: {
    eventTypes: [
      { slug: "cours-reguliers", title: "Cours réguliers" },
      { slug: "atelier-ponctuel", title: "Ateliers" },
      { slug: "stages-et-retraites", title: "Stages et retraites" },
      { slug: "programmes-et-cycles", title: "Programmes et cycles" },
    ],
    universes: [
      { slug: "meditation", title: "Méditation", value: "meditation" },
      { slug: "yoga", title: "Yoga", value: "yoga" },
      {
        slug: "dialogue-conscient",
        title: "Dialogue conscient",
        value: "dialogue",
      },
    ],
  },
} as const satisfies SiteConfig;

export type MainNavLinks = SiteConfig["mainNavLinks"];
