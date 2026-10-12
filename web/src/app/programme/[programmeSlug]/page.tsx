import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProgrammePagesParams } from "@/api/pages.rest";
import { getProgrammeParams } from "@/api/programmes.rest";
import { ProgrammePage } from "@/components/Programme/ProgrammePage";
import { reactQueryConfig } from "@/config/react-query.config";
import { getStrapiMedia } from "@/lib/strapi";
import { getBlocksText, getTextExcerpt } from "@/lib/text/text.utils";
import { getGetPagesQueryOptions } from "@/openapi/page/page";
import {
  getGetProgrammesQueryOptions,
  getProgrammes,
} from "@/openapi/programme/programme";

interface Props {
  params: Promise<{
    programmeSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

/** Title, description and cover for the link previews when the page is shared */
export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { programmeSlug } = await props.params;
  const response = await getProgrammes(
    getProgrammeParams({ slug: programmeSlug })
  );
  const programme = response.data?.[0];
  if (!programme) {
    return { title: "Programme introuvable" };
  }
  const title = programme.title ?? "";
  const description = getTextExcerpt(
    programme.summary || getBlocksText(programme.description)
  );
  const cover = getStrapiMedia(programme.cover);
  return {
    alternates: { canonical: `/programme/${programmeSlug}` },
    description,
    openGraph: {
      description,
      images: cover === null ? [] : [{ url: cover }],
      title,
      type: "article",
      url: `/programme/${programmeSlug}`,
    },
    title,
  };
};

const ProgrammeRoute = async (props: Props) => {
  const { programmeSlug } = await props.params;

  // Fetched on the server (to answer a 404 for an unknown slug), the client
  // component reads it from the cache
  const programmeParams = getProgrammeParams({ slug: programmeSlug });
  const pagesParams = getProgrammePagesParams({ slug: programmeSlug });
  const queryClient = new QueryClient(reactQueryConfig);
  const [data] = await Promise.all([
    queryClient.fetchQuery(getGetProgrammesQueryOptions(programmeParams)),
    queryClient.prefetchQuery(getGetPagesQueryOptions(pagesParams)),
  ]);
  if (!data.data?.length) {
    notFound();
  }

  return (
    <div className="flex flex-1">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProgrammePage
          params={programmeParams}
          pagesParams={pagesParams}
          now={dayjs().toISOString()}
        />
      </HydrationBoundary>
    </div>
  );
};

export default ProgrammeRoute;
