import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStrapiURL } from '../config/strapi.config';

type Props = {
  text: string;
};

export const MarkdownText: FC<Props> = (props) => {
  const { text } = props;
  return (
    <ReactMarkdown
      className={'list-disc list-inside'}
      transformImageUri={(src, alt, title) => {
        return getStrapiURL() + src;
      }}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
    >
      {text ?? ''}
    </ReactMarkdown>
  );
};
