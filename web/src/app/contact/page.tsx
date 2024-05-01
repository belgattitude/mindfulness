import { AboutCardBox } from '@/components/About/AboutCardBox';
import { fetchContactPage } from '@/api/contact.api';
import { MarkdownText } from '@/components/MarkdownText';
import { ProseContent } from '@/components/ProseContent';

export const dynamic = 'force-dynamic';

export default async function About() {
  const data = await fetchContactPage();
  return (
    <AboutCardBox className={'mb-5 font-family-brand'}>
      <ProseContent>
        {data && (
          <MarkdownText
            text={data.contact?.data?.attributes?.description ?? ''}
          />
        )}
      </ProseContent>
    </AboutCardBox>
  );
}
