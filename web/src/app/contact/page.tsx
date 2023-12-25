import { AboutCardBox } from '@/components/About/AboutCardBox';
import { fetchContactPage } from '@/api/contact.api';
import { MarkdownText } from '@/components/MarkdownText';

export default async function About() {
  const data = await fetchContactPage();
  return (
    <div className="container mx-auto flex">
      <AboutCardBox className={'mb-5 font-family-brand'}>
        <div className="border-3 prose mx-auto bg-white/90 text-gray-700 lg:prose-xl">
          {data && (
            <MarkdownText
              text={data.contact?.data?.attributes?.description ?? ''}
            />
          )}
        </div>
      </AboutCardBox>
    </div>
  );
}
