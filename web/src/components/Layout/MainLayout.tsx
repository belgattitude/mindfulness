import type { FC, PropsWithChildren } from 'react';
import { MainContent } from '@/components/Layout/MainContent';
import { MainFooter } from '@/components/Layout/MainFooter';
import { MainHeader } from '@/components/Layout/MainHeader';
import { siteConfig } from '../../config/site.config';

type Props = PropsWithChildren;

const mainNavLinks = siteConfig.mainNavLinks;

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainHeader mainNavLinks={mainNavLinks} showAlert={false} />
      <MainContent className={'mx-auto flex max-w-[1000px] p-5 md:p-0'}>
        {children}
      </MainContent>
      <MainFooter mainNavLinks={mainNavLinks} />
    </>
  );
};
