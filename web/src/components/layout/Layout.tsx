import type { FC, ReactNode } from 'react';
import { MainNav } from '@/components/layout/MainNav';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
};
