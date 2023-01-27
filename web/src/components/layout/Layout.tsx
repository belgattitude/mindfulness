import type { FC, ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { MainNav } from '@/components/layout/MainNav';
import { siteConfig } from '../../config/site.config';

type Props = {
  children: ReactNode;
};

const style: React.CSSProperties = {
  marginTop: 'calc(var(--main-nav-full-height) + 60px)',
};

const mainNavLinks = siteConfig.mainNavLinks;

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainNav mainNavLinks={mainNavLinks} />
      <main style={style}>{children}</main>
      <Footer mainNavLinks={mainNavLinks} />
    </>
  );
};
