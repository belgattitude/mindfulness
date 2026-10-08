import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { getProgrammeParams } from "@/api/programmes.rest";
import { ProgrammePage } from "@/components/Programme/ProgrammePage";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetProgrammesQueryOptions } from "@/openapi/programme/programme";

interface Props {
  params: Promise<{
    programmeSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

const ProgrammeRoute = async (props: Props) => {
  const { programmeSlug } = await props.params;

  // Fetched on the server (to answer a 404 for an unknown slug), the client
  // component reads it from the cache
  const programmeParams = getProgrammeParams({ slug: programmeSlug });
  const queryClient = new QueryClient(reactQueryConfig);
  const data = await queryClient.fetchQuery(
    getGetProgrammesQueryOptions(programmeParams)
  );
  if (!data.data?.length) {
    notFound();
  }

  return (
    <div className="flex flex-1">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProgrammePage params={programmeParams} />
      </HydrationBoundary>
    </div>
  );
};

export default ProgrammeRoute;
