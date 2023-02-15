import type { FC, PropsWithChildren } from 'react';
import { MainContent } from '@/components/layout/MainContent';
import { MainFooter } from '@/components/layout/MainFooter';
import { MainHeader } from '@/components/layout/MainHeader';
import { siteConfig } from '../../config/site.config';

type Props = PropsWithChildren;

const mainNavLinks = siteConfig.mainNavLinks;

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainHeader mainNavLinks={mainNavLinks} />
      <MainContent className={'max-w-[1300px]'}>{children}</MainContent>
      <MainFooter mainNavLinks={mainNavLinks} />
    </>
  );
};
