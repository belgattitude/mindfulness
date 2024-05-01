import { AboutCardBox } from '@/components/About/AboutCardBox';
import { fetchAboutPage } from '@/api/about.api';
import { MarkdownText } from '@/components/MarkdownText';
import { ProseContent } from '@/components/ProseContent';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function About() {
  const data = await fetchAboutPage();
  return (
    <div className="flex">
      <AboutCardBox className={'mb-5 font-family-brand'}>
        <ProseContent>
          {data && (
            <MarkdownText
              text={data.about?.data?.attributes?.description ?? ''}
            />
          )}
        </ProseContent>
      </AboutCardBox>
    </div>
  );
}
