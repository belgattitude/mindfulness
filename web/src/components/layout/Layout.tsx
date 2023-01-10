import type { FC, ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { MainNav } from '@/components/layout/MainNav';

type Props = {
  children: ReactNode;
};

const style: React.CSSProperties = {
  marginTop: 'calc(var(--main-nav-full-height) + 60px)',
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainNav />
      <main className={'container mx-auto'} style={style}>
        {children}
      </main>
      <Footer />
    </>
  );
};
