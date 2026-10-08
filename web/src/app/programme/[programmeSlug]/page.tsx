import { fetchProgramme } from "@/api/programmes";
import { ProgrammePage } from "@/components/Programme/ProgrammePage";

interface Props {
  params: Promise<{
    programmeSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

const ProgrammeRoute = async (props: Props) => {
  const params = await props.params;
  const data = await fetchProgramme({
    slug: params.programmeSlug,
  });
  return (
    <div className="flex flex-1">
      {data && <ProgrammePage programme={data} />}
    </div>
  );
};

export default ProgrammeRoute;
