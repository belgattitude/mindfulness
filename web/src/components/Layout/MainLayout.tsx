import type { FC, PropsWithChildren } from 'react';
import { MainContent } from '@/components/Layout/MainContent';
import { MainFooter } from '@/components/Layout/MainFooter';
import { MainHeader } from '@/components/Layout/MainHeader';
import { siteConfig } from '@/config/site.config';

type Props = PropsWithChildren;

const mainNavLinks = siteConfig.mainNavLinks;

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={'bg-brand-color-400'}>
      <MainHeader mainNavLinks={mainNavLinks} />
      <MainContent className={'mx-auto flex max-w-[1200px]'}>
        {children}
      </MainContent>
      <MainFooter mainNavLinks={mainNavLinks} />
    </div>
  );
};
