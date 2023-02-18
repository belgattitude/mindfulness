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
      <MainHeader mainNavLinks={mainNavLinks} showAlert={false} />
      <MainContent className={'m-5 mx-auto flex max-w-[1200px]'}>
        {children}
      </MainContent>
      <MainFooter mainNavLinks={mainNavLinks} />
    </>
  );
};
