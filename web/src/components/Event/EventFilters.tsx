import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useState, type FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { findEventBySlug, type EventTypeSlugs } from '@/components/Event/utils';
import { siteConfig } from '@/config/site.config';

const types = [
  { slug: '', title: 'Tous les événements' },
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

  const { push } = useRouter();

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
    await push(url);
  };

  return (
    <div className={twMerge('flex flex-col gap-5 md:flex-row', className)}>
      <Listbox value={selected} onChange={updateFilters}>
        <div className="border-1 relative mt-1 min-w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-xl font-light shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{selected.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="size-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="max-h-120 absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {types.map((eventType) => (
              <Listbox.Option
                key={eventType.slug}
                className={({ active }) =>
                  `relative bg-white z-10 cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={eventType}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {eventType.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="size-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
