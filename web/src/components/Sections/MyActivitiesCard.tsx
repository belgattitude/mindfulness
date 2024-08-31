'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import IconLotus from '@/public/icons/lotus.svg';
import IconMeditation from '@/public/icons/meditation.svg';

type Props = {
  className?: string;
};

const activities = [
  {
    name: 'Programmes',
    icon: (props: { className: string }) => (
      <IconMeditation className={props.className} />
    ),
    items: [
      { title: 'Meditation', href: '/activities/mindfulness' },
      { title: 'Yoga', href: '/activities/yoga' },
      { title: 'Dialogue conscient', href: '/activities/dialogue-conscient' },
    ],
  },
  {
    name: 'Agenda',
    icon: (props: { className: string }) => (
      <IconLotus className={props.className} />
    ),
    items: [
      { title: 'Cours réguliers', href: '/agenda/cours-reguliers' },
      { title: 'Programmes & cycles', href: '/agenda/programmes-et-cycles' },
      { title: 'Stages & retraites', href: '/agenda/stages-et-retraites' },
    ],
  },
] as const;

export const MyActivitiesCard: FC<Props> = (props) => {
  const { className = '' } = props;
  return (
    <div
      className={twMerge(
        'radial-gradient font-family-primary flex flex-col p-5 text-neutral-700 gap-5 shadow-xl sm:rounded-lg sm:px-10 bg-brand-color/60 mx-auto border',
        className
      )}
    >
      <div
        className={'relative flex flex-col items-center justify-center gap-1'}
      >
        <h1 className={'text-3xl font-extralight'}>Mes Activités</h1>
        <p className={'p-3'}>En personne et en ligne</p>
        <p className={'p-1'}>France / Belgique - Particuliers / Organisation</p>
      </div>
      <div className={'flex flex-col justify-center md:flex-row'}>
        {activities.map((group, idxGroup) => (
          <div
            key={group.name}
            className={clsx('gap-5', { ['md:ml-[80px]']: idxGroup > 0 })}
          >
            <div className={'-ml-0 p-1 text-lg font-light underline md:hidden'}>
              {group.name}
            </div>
            <ul className={'p-1'}>
              {group.items.map(({ title, href }, _idx) => {
                return (
                  <li key={`${title}`} className={'flex items-center'}>
                    {group.icon({ className: 'h-6 w-6 flex-none' })}
                    <Link
                      className="p-3 text-lg decoration-white underline-offset-8 outline-green-500 hover:underline"
                      title={title}
                      prefetch={false}
                      href={href}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
