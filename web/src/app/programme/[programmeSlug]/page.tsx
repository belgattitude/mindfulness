import { z } from 'zod';
import { fetchProgramme } from '@/api/programmes';
import { ProgrammePage } from '@/components/Programme/ProgrammePage';

type Props = {
  params: Promise<{
    programmeSlug: string;
  }>;
};

const schema = z.object({
  programmeSlug: z.string().min(3).max(255),
});

export const dynamic = 'force-dynamic';

export default async function ProgrammeRoute(props: Props) {
  const params = await props.params;
  const data = await fetchProgramme({
    slug: params.programmeSlug,
  });
  return (
    <div className={'flex flex-1'}>
      {data?.attributes && <ProgrammePage programme={data.attributes} />}
    </div>
  );
}
