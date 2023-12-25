import Link from 'next/link';
import type { FC } from 'react';
import type { MainNavLinks } from '../../config/site.config';
import { cn } from '../utils';

type MainSidebarProps = {
  hidden: boolean;
  mainNavLinks: MainNavLinks;
};
export const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { hidden, mainNavLinks } = props;
  return (
    <div
      className={cn(
        'bg-white absolute top-0 z-50 flex w-[90vw] border-8 p-5 justify-center flex-col gap-5 transition-all ease-in-out duration-300',
        hidden
          ? 'translate-x-[-500px] opacity-0'
          : 'translate-x-[0px] opacity-100'
      )}
    >
      {mainNavLinks.map((link) => {
        return (
          <div key={`mobile-menu-${link.href}`} className={'flex'}>
            <Link className={'text-xl'} key={link.href} href={link.href}>
              {link.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
