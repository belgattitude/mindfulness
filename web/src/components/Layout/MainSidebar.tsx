import Link from 'next/link';
import type { FC } from 'react';
import type { MainNavLinks } from '@/config/site.config';
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
        'bg-white h-full absolute top-0 flex w-[70vw] border-8 p-5 justify-center flex-col gap-5 transition-all ease-in-out duration-300',
        hidden
          ? 'translate-x-[-500px] opacity-0 -z-50 pointer-events-none'
          : 'translate-x-[0px] opacity-100 z-50 pointer-events-auto'
      )}
    >
      {mainNavLinks.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className={'border-1 flex text-3xl'}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};
