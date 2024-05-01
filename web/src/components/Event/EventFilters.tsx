'use client';
import { useRouter } from 'next/navigation';
import { useState, type FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { findEventBySlug, type EventTypeSlugs } from '@/components/Event/utils';
import { siteConfig } from '@/config/site.config';
import { clsx } from 'clsx';

const types = [
  { slug: '', title: 'Tous' },
  ...siteConfig.search.eventTypes,
] as const;

type Types = (typeof types)[number];

type Props = {
  onChange?: (selected: Types) => void;
  selected: EventTypeSlugs | null;
  className?: string;
};

export const EventFilters: FC<Props> = (props) => {
  const { className = '', onChange } = props;

  const router = useRouter();

  const [selected, setSelected] = useState<Types>(
    findEventBySlug(props.selected) ?? types[0]
  );

  const updateFilters = async (selected: Types) => {
    if (onChange) {
      // onChange(selected);
    }
    const { slug } = selected;
    setSelected(selected);
    const url = ['/agenda', slug].filter((s) => s.length > 0).join('/');
    router.push(url);
  };

  return (
    <div className={twMerge('py-5 flex flex-col gap-5 md:flex-row', className)}>
      {types.map((eventType) => {
        return (
          <div
            key={eventType.slug}
            className={clsx(
              'flex-1 rounded bg-gray-200 p-5 drop-shadow hover:cursor-pointer hover:bg-gray-100',
              {
                'bg-gray-300 underline': eventType.slug === selected.slug,
              }
            )}
            onClick={async (_e) => {
              await updateFilters(eventType);
            }}
          >
            {eventType.title}
          </div>
        );
      })}
    </div>
  );
};
