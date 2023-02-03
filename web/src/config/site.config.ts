export const siteConfig = {
  mainNavLinks: [
    { title: 'Accueil', href: '/' },
    { title: 'Mindfulness', href: '/p/mindfulness' },
    { title: 'Yoga', href: '/p/yoga' },
    { title: 'Dialogue Conscient', href: '/dialogue-conscient' },
    { title: 'Agenda', href: '/events' },
    { title: 'Contact', href: '/contact' },
  ],
} as const;

export type MainNavLinks = typeof siteConfig.mainNavLinks;
