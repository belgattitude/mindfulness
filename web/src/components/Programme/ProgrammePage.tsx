import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { fullProgrammeFragment, type FetchProgramme } from '@/api/programmes';
import { Button } from '@/components/Button';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';

type Props = {
  programme: FetchProgramme;
  className?: string;
};

export const ProgrammePage: FC<Props> = (props) => {
  const { className = '', programme } = props;
  const data = useFragment(fullProgrammeFragment, programme);

  if (!data) {
    return <p>NotFound</p>;
  }

  // const cover = page.cover ? getStrapiMedia(page.cover) : '';
  return (
    <div
      className={twMerge(
        clsx('border-5 prose-lg my-5 flex flex-col gap-5 py-5'),
        className
      )}
    >
      <h1 className={'mb-5 text-2xl text-title-color-600'}>{data.title}</h1>
      <div className={'w-full flex-none'}>
        <Image
          alt={`Photo ${
            data.cover.data?.attributes?.alternativeText ??
            `programme ${data.title}`
          }`}
          width={1200}
          height={400}
          priority={true}
          className="relative mt-2 h-[200px] object-cover"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={getStrapiMedia(data.cover) ?? ''}
        />
      </div>

      <div>
        <MarkdownText
          className=""
          text={data.description ?? data.summary ?? ''}
        />

        <div className={'flex w-full flex-row justify-start gap-2'}>
          <div>
            <Link href={'/events'} legacyBehavior={true}>
              <Button>Consultez l'agenda</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
