import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStrapiURL } from '@/config/strapi.config';
import { cn } from '@/components/utils';
import rehypeExternalLinks from 'rehype-external-links';

type Props = {
  text: string;
  className?: string;
};

export const MarkdownText: FC<Props> = (props) => {
  const { text, className } = props;
  return (
    <ReactMarkdown
      className={cn('list-inside list-disc', className)}
      urlTransform={(src, _alt, _title) => {
        return /^https?:\/\//.test(src) ? src : `${getStrapiURL()}${src}`;
      }}
      rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
    >
      {text ?? ''}
    </ReactMarkdown>
  );
};
