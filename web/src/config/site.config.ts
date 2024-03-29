export const siteConfig = {
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL,
  metadata: {
    siteTitle: 'Sandrine Rauter',
    siteDescription: '',
  },
  mainNavLinks: [
    { title: 'Accueil', href: '/' },
    { title: 'Mindfulness', href: '/p/mindfulness' },
    { title: 'Yoga', href: '/p/yoga' },
    { title: 'Dialogue Conscient', href: '/p/dialogue-conscient' },
    { title: 'Agenda', href: '/agenda' },
    { title: 'A propos', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ],
  search: {
    eventTypes: [
      { slug: 'stages-et-retraites', title: 'Stages et retraites' },
      { slug: 'programmes-et-cycles', title: 'Programmes et cycles' },
      { slug: 'cours-reguliers', title: 'Cours réguliers' },
    ],
  },
} as const;

export type MainNavLinks = typeof siteConfig.mainNavLinks;
