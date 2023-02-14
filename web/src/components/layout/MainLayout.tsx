import type { FC, ReactNode } from 'react';
import { MainFooter } from '@/components/layout/MainFooter';
import { MainHeader } from '@/components/layout/MainHeader';
import { siteConfig } from '../../config/site.config';

type Props = {
  children: ReactNode;
};

const style: React.CSSProperties = {
  // marginTop: 'calc(var(--main-nav-full-height) + 60px)',
};

const mainNavLinks = siteConfig.mainNavLinks;

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainHeader mainNavLinks={mainNavLinks} />
      <main style={style}>{children}</main>
      <MainFooter mainNavLinks={mainNavLinks} />
    </>
  );
};
