import { z } from 'zod';
import { fetchProgramme } from '@/api/programmes';
import { ProgrammePage } from '@/components/Programme/ProgrammePage';
import { PageContent } from '@/components/PageContent';
import { ProseContent } from '@/components/ProseContent';

type Props = {
  params: {
    programmeSlug: string;
  };
};

const schema = z.object({
  programmeSlug: z.string().min(3).max(255),
});

export const dynamic = 'force-dynamic';

export default async function ProgrammeRoute(props: Props) {
  const data = await fetchProgramme({ slug: props.params.programmeSlug });
  return (
    <PageContent title={'Programme & cycle'}>
      <ProseContent>
        <div className={'container mx-auto flex flex-col'}>
          {data?.attributes && <ProgrammePage programme={data.attributes} />}
        </div>
      </ProseContent>
    </PageContent>
  );
}
