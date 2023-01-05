import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { eventsApi } from '@/features/events/events.api';
import type { FragmentType } from '@/gql/fragment-masking';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import { getStrapiURL } from '../config/strapi.config';
import Image from 'next/image';
export const RetraiteCard: FC<{
  retraite: FragmentType<typeof eventsApi.retraiteFragment>;
}> = (props) => {
  const retraite = useFragment(eventsApi.retraiteFragment, props.retraite);
  return (
    <div className={'prose-xl'}>
      <h1>{retraite.summary}</h1>
      {retraite.cover && <Image alt="Photo retraite" width={1000} height={800} src={getStrapiMedia(retraite.cover) ?? ''} />}
      <ReactMarkdown
        transformImageUri={(src, alt, title) => {
          return getStrapiURL() + src;
        }}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {retraite.description ?? ''}
      </ReactMarkdown>
    </div>
  );
};
